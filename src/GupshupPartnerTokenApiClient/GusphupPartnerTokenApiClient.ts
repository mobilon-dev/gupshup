import axios, { AxiosInstance } from "axios";
import { requestLogger, responseLogger } from 'axios-logger';

import {GupshupPartnerTokenApiClientConfig} from './types'

export class GupshupPartnerTokenApiClient {
  portalUrl: string;
  partnerToken: string;
  axios: AxiosInstance;

  constructor({partnerToken, debug}: GupshupPartnerTokenApiClientConfig) {
    this.portalUrl = 'https://partner.gupshup.io';
    this.partnerToken = partnerToken;

    this.axios = axios.create({
      baseURL: this.portalUrl,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.partnerToken,
      },
    });

    if (debug) {
      const config = {
        prefixText: 'GupshupPartnerTokenApiClient',
        // status: true,
        headers: false,
        params: true,
      };
      this.axios.interceptors.request.use((request) => {
        return requestLogger(request, config);
      });
      this.axios.interceptors.response.use((response) => {
        return responseLogger(response, config);
      });
    }
  }

  async getAccessTokenForApp(appId: string) {
    const url = `/partner/app/${appId}/token`;
    const headers = {
      'Accept': 'application/json',
    };
    const response = await this.axios.get(url, {headers});
    return response.data;
  }

  async getPartnerApps() {
    const url = '/partner/account/api/partnerApps';
    const response = await this.axios.get(url);
    return response.data;
  }

}
