import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { requestLogger, responseLogger } from 'axios-logger';
import { stringify } from 'qs';
import * as FormData from 'form-data';

import {
  Template,
  TemplateCreateData,
  GupshupPartnerApiClientConfig,
  TemplateEditData,
  PartnerSubscriptionDataAdd,
  PartnerSubscriptionDataUpdate,
} from './types';

/**
 * Validates that a string value is not empty
 * @param val - The string value to validate
 * @param fieldName - Name of the field being validated (for error message)
 * @throws {Error} When the value is empty or null
 */
const validateNonEmpty = (val: string, fieldName: string): void => {
  if (!val || val.trim() === '') {
    throw new Error(`${fieldName} cannot be empty`);
  }
};

/**
 * Gupshup Partner API Client
 * 
 * Provides methods to interact with the Gupshup Partner API for managing
 * subscriptions, templates, business profiles, media, and other partner-related operations.
 * 
 * @example
 * ```typescript
 * const client = new GupshupPartnerApiClient({
 *   appId: 'your-app-id',
 *   appToken: 'your-app-token',
 *   debug: true
 * });
 * 
 * const templates = await client.getTemplates();
 * ```
 */
export class GupshupPartnerApiClient {
  private readonly portalUrl: string = 'https://partner.gupshup.io';
  private readonly appId: string;
  private readonly appToken: string;
  private readonly axios: AxiosInstance;

  /**
   * Creates a new GupshupPartnerApiClient instance
   * @param config - Configuration object containing app credentials and options
   * @throws {Error} When appId or appToken are empty
   */
  constructor(config: GupshupPartnerApiClientConfig) {
    this.appId = config.appId;
    this.appToken = config.appToken;

    validateNonEmpty(this.appId, 'appId');
    validateNonEmpty(this.appToken, 'appToken');

    this.axios = axios.create({
      baseURL: `${this.portalUrl}/partner/app/${this.appId}/`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: this.appToken,
      },
    });

    if (config.debug) {
      const loggerConfig = {
        prefixText: 'GupshupPartnerApiClient',
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

  // ==================== SUBSCRIPTION METHODS ====================

  /**
   * Retrieves all subscriptions for the partner app
   * @returns Promise resolving to subscription data
   */
  async getAllSubscriptions(): Promise<AxiosResponse> {
    return this.axios.get('/subscription');
  }

  /**
   * Retrieves a specific subscription by ID
   * @param subscriptionId - The unique identifier of the subscription
   * @returns Promise resolving to subscription data
   */
  async getSubscription(subscriptionId: string): Promise<AxiosResponse> {
    return this.axios.get(`/subscription/${subscriptionId}`);
  }

  /**
   * Creates a new subscription
   * @param data - Subscription data to create
   * @returns Promise resolving to created subscription data
   */
  async addSubscription(data: PartnerSubscriptionDataAdd): Promise<AxiosResponse> {
    return this.axios.post('/subscription', stringify(data));
  }

  /**
   * Updates an existing subscription
   * @param subscriptionId - The unique identifier of the subscription to update
   * @param data - Updated subscription data
   * @returns Promise resolving to updated subscription data
   */
  async updateSubscription(subscriptionId: string, data: PartnerSubscriptionDataUpdate): Promise<AxiosResponse> {
    return this.axios.put(`/subscription/${subscriptionId}`, stringify(data));
  }

  /**
   * Deletes a specific subscription
   * @param subscriptionId - The unique identifier of the subscription to delete
   * @returns Promise resolving to deletion result
   */
  async deleteSubscription(subscriptionId: string): Promise<AxiosResponse> {
    return this.axios.delete(`/subscription/${subscriptionId}`);
  }

  /**
   * Deletes all subscriptions for the partner app
   * @returns Promise resolving to deletion result
   */
  async deleteAllSubscriptions(): Promise<AxiosResponse> {
    return this.axios.delete('/subscription');
  }

  // ==================== TEMPLATE METHODS ====================

  /**
   * Retrieves all templates for the partner app
   * @returns Promise resolving to array of templates
   */
  async getTemplates(): Promise<Template[]> {
    const response = await this.axios.get('/templates');
    return response.data;
  }

  /**
   * Creates a new template
   * @param templateData - Template creation data
   * @returns Promise resolving to created template data
   */
  async postTemplate(templateData: TemplateCreateData): Promise<any> {
    const response = await this.axios.post('/templates', stringify(templateData));
    return response.data;
  }

  /**
   * Updates an existing template
   * @param templateId - The unique identifier of the template to update
   * @param templateData - Updated template data
   * @returns Promise resolving to updated template data
   */
  async editTemplate(templateId: string, templateData: TemplateEditData): Promise<any> {
    const response = await this.axios.put(`/templates/${templateId}`, stringify(templateData));
    return response.data;
  }

  /**
   * Deletes a template by element name
   * @param elementName - The element name of the template to delete
   * @returns Promise resolving to deletion result
   */
  async delTemplate(elementName: string): Promise<any> {
    const response = await this.axios.delete(`/template/${elementName}`);
    return response.data;
  }

  // ==================== CALLBACK & OPT-IN METHODS ====================

  /**
   * Sets the callback URL for webhook notifications
   * @param callbackUrl - The URL to receive webhook notifications
   * @returns Promise resolving to callback URL setting result
   */
  async putCallBackUrl(callbackUrl: string): Promise<any> {
    const response = await this.axios.put('/callbackUrl', stringify({ callbackUrl }));
    return response.data;
  }

  /**
   * Adds a phone number to the opt-in list
   * @param phone - The phone number to opt-in
   * @returns Promise resolving to opt-in result
   */
  async addOptIn(phone: string): Promise<any> {
    const response = await this.axios.put('/optin', stringify({ phone }));
    return response.data;
  }

  /**
   * Gets the status of a user by phone number
   * @param phone - The phone number to check
   * @returns Promise resolving to user status
   */
  async getUserStatus(phone: string): Promise<any> {
    const response = await this.axios.get('/userStatus', {
      params: { phone },
    });
    return response.data.userStatus;
  }

  /**
   * Checks if a phone number is opted in
   * @param phone - The phone number to check
   * @returns Promise resolving to boolean indicating if phone is opted in
   */
  async isPhoneOpted(phone: string): Promise<boolean> {
    try {
      const result = await this.getUserStatus(phone);
      return result.status === 'OPT_IN';
    } catch (err) {
      return false;
    }
  }

  // ==================== WABA MANAGEMENT METHODS ====================

  /**
   * Gets the wallet balance
   * @returns Promise resolving to wallet balance data
   */
  async getWalletBalance(): Promise<any> {
    const response = await this.axios.get('/wallet/balance');
    return response.data;
  }

  /**
   * Checks the health status of the API
   * @returns Promise resolving to health status data
   */
  async checkHealth(): Promise<any> {
    const response = await this.axios.get('/health');
    return response.data;
  }

  /**
   * Gets message limits and ratings
   * @returns Promise resolving to message limits and ratings data
   */
  async getMessageLimit(): Promise<any> {
    const response = await this.axios.get('/ratings');
    return response.data;
  }

  /**
   * Gets quality rating information
   * @returns Promise resolving to quality rating data
   */
  async getQualityRating(): Promise<any> {
    const response = await this.axios.get('/ratings');
    return response.data;
  }

  /**
   * Gets WABA (WhatsApp Business Account) information
   * @returns Promise resolving to WABA information
   */
  async getWABAInfo(): Promise<any> {
    const response = await this.axios.get('/waba/info');
    return response.data;
  }

  // ==================== USAGE & ANALYTICS METHODS ====================

  /**
   * Gets usage statistics for a date range
   * @param from - Start date in YYYY-MM-DD format
   * @param to - End date in YYYY-MM-DD format
   * @returns Promise resolving to usage statistics
   */
  async getUsage(from: string, to: string): Promise<any> {
    const response = await this.axios.get('/usage', {
      params: { from, to },
    });
    return response.data;
  }

  /**
   * Disables button click analytics for a template
   * @param templateId - The template ID to disable analytics for
   * @returns Promise resolving to analytics disable result
   */
  async disableButtonClickAnalytics(templateId: string): Promise<any> {
    const response = await this.axios.post('/template/analytics/buttonclick', 
      stringify({ templateId, disable: true })
    );
    return response.data;
  }

  // ==================== MEDIA METHODS ====================

  /**
   * Uploads a file and generates a media ID
   * @param file - The file to upload
   * @param fileType - The type of the file
   * @returns Promise resolving to media ID and upload result
   */
  async generateMediaIdUsingUpload(file: any, fileType: string): Promise<any> {
    const form = new FormData();
    form.append('file', file);
    form.append('file_type', fileType);
    
    const requestConfig = {
      headers: {
        ...form.getHeaders(),
      },
    };

    const response = await this.axios.post('/media', form, requestConfig);
    return response.data;
  }

  /**
   * Downloads media by media ID
   * @param mediaId - The media ID to download
   * @returns Promise resolving to media data
   */
  async downloadMedia(mediaId: string): Promise<any> {
    const response = await this.axios.get(`/media/${mediaId}`);
    return response.data;
  }

  // ==================== DISCOUNT METHODS ====================

  /**
   * Gets discount information for a specific year and month
   * @param year - The year (YYYY format)
   * @param month - The month (MM format)
   * @returns Promise resolving to discount data
   */
  async getDiscount(year: string, month: string): Promise<any> {
    const response = await this.axios.get('/discount', {
      params: { year, month },
    });
    return response.data;
  }

  // ==================== BUSINESS PROFILE METHODS ====================

  /**
   * Gets business profile details
   * @returns Promise resolving to business profile data
   */
  async getBusinessProfileDetails(): Promise<any> {
    const response = await this.axios.get('/business/profile');
    return response.data;
  }

  /**
   * Gets business profile about information
   * @returns Promise resolving to business profile about data
   */
  async getBusinessProfileAbout(): Promise<any> {
    const response = await this.axios.get('/business/profile/about');
    return response.data;
  }

  /**
   * Gets business profile photo
   * @returns Promise resolving to business profile photo data
   */
  async getBusinessProfilePhoto(): Promise<any> {
    const response = await this.axios.get('/business/profile/photo');
    return response.data;
  }

  // ==================== DEPRECATED METHODS ====================

  /**
   * Updates event modes for callbacks
   * @deprecated This method is deprecated and may be removed in future versions
   * @param events - Array of event types to enable
   * @returns Promise resolving to boolean indicating success
   */
  async updateEvents(events: string[]): Promise<boolean> {
    try {
      const modes = events && events.length > 0 ? events.join(',') : '';
      await this.axios.put('/callback/mode', stringify({ modes }));
      return true;
    } catch (err) {
      return false;
    }
  }
}
