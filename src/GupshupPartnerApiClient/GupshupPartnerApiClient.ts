import axios, {AxiosInstance} from 'axios';
import { requestLogger, responseLogger } from 'axios-logger';
import {stringify} from 'qs';

import {
  Template,
  TemplateCreateData,
  GupshupPartnerApiClientConfig,
} from './types';

class GupshupPartnerApiClient {
  axios: AxiosInstance;

  constructor({appId, appToken, debug}:GupshupPartnerApiClientConfig) {
    this.axios = axios.create({
      baseURL: `https://partner.gupshup.io/partner/app/${appId}/`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: appToken,
      },
    });

    if (debug) {
      const config = {
        prefixText: 'GupshupPartnerApiClient',
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

  async getTemplates():Promise<Template[]> {
    const response = await this.axios.get('/templates');
    return response.data;
  }

  async postTemplate(templateData:TemplateCreateData) {
    const response = await this.axios.post('/templates', stringify(templateData));
    return response.data;
  }

  async delTemplate(elementName: string) {
    const response = await this.axios.delete('/template/' + elementName);
    return response.data;
  }

  async putCallBackUrl(callbackUrl: string){
    const response = await this.axios.put('/callbackUrl', stringify({callbackUrl}));
    return response.data;
  }

  async addOptIn(phone: string) {
    const response = await this.axios.put('/optin', stringify({phone}));
    return response.data;
  }

  async getUserStatus(phone: string) {
    const response = await this.axios.get('/userStatus',{
      params: {
        phone,
      },
    });
    return response.data.userStatus;
  }

  async isPhoneOpted(phone: string) {
    try{
      const result = await this.getUserStatus(phone);
      return result.status === 'OPT_IN';
    }catch(err){
      return false;
    }
  }
  
  async getMessageLimit() {
    const response = await this.axios.get('/ratings');
    return response.data;
  }

  async updateEvents(events: string[]) {
    try {
      const modes = events && events.length > 0 ? events.join(',') : '';
      await this.axios.put('/callback/mode', stringify({modes}));
      return true;
    } catch (err) {
      return false;
    }
  }

  async getUsage(from: string, to: string){
    const response = await this.axios.get('/usage',{
      params:{
        from,
        to,
      }
    });
    return response.data;
  }

  async getDiscount(year: string, month: string){
    const response = await this.axios.get('/discount',{
      params: {
        year,
        month,
      }
    });
    return response.data;
  }
}

export {
  GupshupPartnerApiClient,
};
