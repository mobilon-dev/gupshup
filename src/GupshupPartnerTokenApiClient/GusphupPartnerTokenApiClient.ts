import axios, { AxiosInstance, AxiosResponse } from "axios";
import { requestLogger, responseLogger } from 'axios-logger';

import {
  GupshupPartnerTokenApiClientConfig,
  GetAuthLinkParams,
  AppAccessTokenResponse,
  PartnerAppsResponse,
  AppCreationResponse,
  AuthLinkResponse,
} from './types';

/**
 * Gupshup Partner Token API Client
 * 
 * Provides methods to interact with the Gupshup Partner Token API for managing
 * app access tokens, partner apps, app creation, and authentication links.
 * 
 * @example
 * ```typescript
 * const client = new GupshupPartnerTokenApiClient({
 *   partnerToken: 'your-partner-token',
 *   debug: true
 * });
 * 
 * const accessToken = await client.getAccessTokenForApp('app-id');
 * ```
 */
export class GupshupPartnerTokenApiClient {
  private readonly portalUrl: string = 'https://partner.gupshup.io';
  private readonly partnerToken: string;
  private readonly axios: AxiosInstance;

  /**
   * Creates a new GupshupPartnerTokenApiClient instance
   * @param config - Configuration object containing partner token and options
   * @throws {Error} When partnerToken is empty
   */
  constructor(config: GupshupPartnerTokenApiClientConfig) {
    this.partnerToken = config.partnerToken;

    if (!this.partnerToken || this.partnerToken.trim() === '') {
      throw new Error('partnerToken cannot be empty');
    }

    this.axios = axios.create({
      baseURL: this.portalUrl,
      headers: {
        'Authorization': this.partnerToken,
      },
    });

    if (config.debug) {
      const loggerConfig = {
        prefixText: 'GupshupPartnerTokenApiClient',
        headers: false,
        params: true,
      };
      
      this.axios.interceptors.request.use((request) => 
        requestLogger(request, loggerConfig)
      );
      
      this.axios.interceptors.response.use((response) => 
        responseLogger(response, loggerConfig)
      );
    }
  }

  /**
   * Gets an access token for a specific app
   * @param appId - The unique identifier of the app
   * @returns Promise resolving to app access token data
   * @throws {Error} When the request fails or appId is invalid
   */
  async getAccessTokenForApp(appId: string): Promise<AppAccessTokenResponse> {
    const url = `/partner/app/${appId}/token`;
    const headers = {
      'Accept': 'application/json',
    };
    
    const response: AxiosResponse<AppAccessTokenResponse> = await this.axios.get(url, { headers });
    return response.data;
  }

  /**
   * Retrieves all partner apps for the authenticated partner
   * @returns Promise resolving to partner apps data
   * @throws {Error} When the request fails
   */
  async getPartnerApps(): Promise<PartnerAppsResponse> {
    const url = '/partner/account/api/partnerApps';
    const response: AxiosResponse<PartnerAppsResponse> = await this.axios.get(url);
    return response.data;
  }

  /**
   * Creates a new app for the partner
   * @param appName - The name of the app to create
   * @returns Promise resolving to created app data
   * @throws {Error} When the request fails or appName is invalid
   */
  async createApp(appName: string): Promise<AppCreationResponse> {
    const url = `/partner/app`;
    const data = {
      name: appName,
      templateMessaging: true,
      disableOptinPrefUrl: false,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    
    const response: AxiosResponse<AppCreationResponse> = await this.axios.post(url, data, { headers });
    return response.data;
  }

  /**
   * Gets an authentication link for app onboarding
   * @param appUUID - The UUID of the app
   * @param params - Parameters for generating the auth link
   * @returns Promise resolving to authentication link data
   * @throws {Error} When the request fails or parameters are invalid
   */
  async getAuthLink(appUUID: string, params: GetAuthLinkParams): Promise<AuthLinkResponse> {
    const url = `/partner/app/${appUUID}/onboarding/embed/link`;
    const response: AxiosResponse<AuthLinkResponse> = await this.axios.get(url, { params });
    return response.data;
  }
}
