import axios, { AxiosInstance } from "axios";
import { requestLogger, responseLogger } from 'axios-logger';


export class GupshupPartnerServiceClient {
  portalUrl: string;
  partnerToken: string;
  axios: AxiosInstance;

  constructor({debug}: any) {
    this.portalUrl = 'https://partner.gupshup.io';

    this.axios = axios.create({
      baseURL: this.portalUrl,
    });

    if (debug) {
      const config = {
        prefixText: 'GupshupPartnerServiceClient',
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

  async getPartnerToken(email: string, password: string) {
    const url = '/partner/account/login';
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    };

    const response = await this.axios.post(url, {email, password}, {headers});
    return response.data;
  }

}
