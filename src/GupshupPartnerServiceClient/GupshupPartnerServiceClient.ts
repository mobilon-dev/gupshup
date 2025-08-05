import axios, { AxiosInstance, AxiosResponse } from "axios";
import { requestLogger, responseLogger } from 'axios-logger';
import { GupshupPartnerServiceClientConfig, PartnerTokenResponse } from './types';

/**
 * Gupshup Partner Service Client
 * 
 * Provides authentication services for the Gupshup Partner Portal.
 * This client handles login operations to obtain partner tokens.
 * 
 * @example
 * ```typescript
 * const client = new GupshupPartnerServiceClient({ debug: true });
 * const authData = await client.getPartnerToken('user@example.com', 'password');
 * ```
 */
export class GupshupPartnerServiceClient {
  private readonly portalUrl: string = 'https://partner.gupshup.io';
  private readonly axios: AxiosInstance;

  /**
   * Creates a new GupshupPartnerServiceClient instance
   * @param config - Configuration options for the client
   */
  constructor(config: GupshupPartnerServiceClientConfig = {}) {
    this.axios = axios.create({
      baseURL: this.portalUrl,
    });

    if (config.debug) {
      const loggerConfig = {
        prefixText: 'GupshupPartnerServiceClient',
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
   * Authenticates with the partner portal and retrieves a partner token
   * @param email - Partner account email address
   * @param password - Partner account password
   * @returns Promise resolving to authentication response containing the token
   * @throws {Error} When authentication fails or credentials are invalid
   */
  async getPartnerToken(email: string, password: string): Promise<PartnerTokenResponse> {
    const url = '/partner/account/login';
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    };

    const response: AxiosResponse<PartnerTokenResponse> = await this.axios.post(
      url, 
      { email, password }, 
      { headers }
    );
    
    return response.data;
  }
}
