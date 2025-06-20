import axios, {AxiosInstance} from 'axios';
import { requestLogger, responseLogger } from 'axios-logger';
import {stringify} from 'qs';

import {
  Template,
  TemplateCreateData,
  GupshupPartnerApiClientConfig,
  TemplateEditData,
  PartnerSubscriptionDataAdd,
  PartnerSubscriptionDataUpdate,
} from './types';

const check = (val: string) => {
  if (!val || val === '') {
    throw new Error('EMPTY_VALUE');
  }
}

class GupshupPartnerApiClient {
  portalUrl: string;
  appId: string;
  appToken: string;
  axios: AxiosInstance;

  constructor({appId, appToken, debug}: GupshupPartnerApiClientConfig) {
    this.portalUrl = 'https://partner.gupshup.io';
    this.appId = appId;
    this.appToken = appToken;

    check(this.appId);
    check(this.appToken);

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

  /**
  * @group Subscription
  */
  getAllSubscriptions = async () => {
    const url = `/subscription`;
    return await this.axios.get(url);
  };

  /**
  * @group Subscription
  */
  getSubscription = async (subscriptionId: string) => {
    const url = `/subscription/${subscriptionId}`;
    return await this.axios.get(url);
  };

  /**
  * @group Subscription
  */
  addSubscription = async (data: PartnerSubscriptionDataAdd) => {
    const url = `/subscription`;
    return await this.axios.post(url, stringify(data));
  };

  /**
  * @group Subscription
  */
  updateSubscription = async (subscriptionId: string, data: PartnerSubscriptionDataUpdate) => {
    const url = `/subscription/${subscriptionId}`;
    return await this.axios.put(url, stringify(data));
  };

  /**
  * @group Subscription
  */
  deleteSubscription = async (subscriptionId: string) => {
    const url = `/subscription/${subscriptionId}`;
    return await this.axios.delete(url);
  };

  /**
  * @group Subscription
  */
  deleteAllSubscriptions = async () => {
    const url = `/subscription`;
    return await this.axios.delete(url);
  };

  /**
  * @group Template
  */
  async getTemplates(): Promise<Template[]> {
    const response = await this.axios.get('/templates');
    return response.data;
  }

  /**
  * @group Template
  */
  async postTemplate(templateData: TemplateCreateData) {
    const response = await this.axios.post('/templates', stringify(templateData));
    return response.data;
  }

  /**
  * @group Template
  */
  async editTemplate(templateId: string, templateData: TemplateEditData) {
    const response = await this.axios.put(`/templates/${templateId}`, stringify(templateData));
    return response.data;
  }

  /**
  * @group Template
  */
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
  
  /**
  * @group Wallet
  */
  async getWalletBalance() {
    const response = await this.axios.get('/wallet/balance');
    return response.data;
  }

  async checkHealth() {
    const response = await this.axios.get('/health');
    return response.data;
  }

  async getMessageLimit() {
    const response = await this.axios.get('/ratings');
    return response.data;
  }

  async getQualityRating() {
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
    const params = {
      year,
      month,
    };
    const response = await this.axios.get('/discount', {params});
    return response.data;
  }

  /*
  async getAppLink(year: string, month: string){
    const response = await this.axios.get('/discount', {params});
    return response.data;
  }
  */

  /**
  * @group Business Profile
  */
  async getBusinessProfileDetails() {
    const response = await this.axios.get('/business/profile');
    return response.data;
  }

  /**
  * @group Business Profile
  */
  async getBusinessProfileAbout() {
    const response = await this.axios.get('/business/profile/about');
    return response.data;
  }

  /**
  * @group Business Profile
  */
  async getBusinessProfilePhoto() {
    const response = await this.axios.get('/business/profile/photo');
    return response.data;
  }

  async disableButtonClickAnalytics(templateId: string) {
    const response = await this.axios.post(`/template/analytics/buttonclick`, stringify({templateId, disable:true}));
    return response.data;
  }
}

export {
  GupshupPartnerApiClient,
};
