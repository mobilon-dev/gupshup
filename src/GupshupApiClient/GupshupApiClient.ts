import axios, {AxiosInstance} from 'axios';
import { requestLogger, responseLogger } from 'axios-logger';
import {stringify} from 'qs';
import * as FormData from 'form-data';

const check = (val: string) => {
  if (!val || val === '') {
    throw new Error('EMPTY_VALUE');
  }
}

import type {
  GupshupAPIClientConfig, 
  ContactCard,
  ListMessage,
  QuickReplyMessage,
  SubscriptionDataAdd,
  SubscriptionDataUpdate,
  BusinessProfileDetails,
} from './types';


const SEND_TEXT_MESSAGE_URL = '/wa/api/v1/msg';
const SENT_TEMPLATE_MESSAGE_URL = '/wa/api/v1/template/msg';

export class GupshupAPIClient {
  API_KEY: string;
  APP_NAME: string;
  SOURCE_MOBILE_NUMBER: string;
  APP_ID: string;
  axios: AxiosInstance;
  debug: boolean;

  constructor ({API_KEY, APP_NAME, SOURCE_MOBILE_NUMBER, APP_ID, debug}: GupshupAPIClientConfig) {
    this.API_KEY = API_KEY;
    this.APP_NAME = APP_NAME;
    this.SOURCE_MOBILE_NUMBER = SOURCE_MOBILE_NUMBER;
    this.APP_ID = APP_ID;
    this.debug = debug;

    check(this.API_KEY);
    check(this.APP_NAME);
    check(this.APP_ID);

    this.axios = axios.create({
      baseURL: 'https://api.gupshup.io',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        apiKey: this.API_KEY,
      },
    });

    if (this.debug) {
      const config = {
        prefixText: 'GupshupApiClient',
        status: true,
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
   * 
   * @param {*} data 
   * @returns 
   */
  getUrlEncodedData = (data: {[key: string]: any}) => {
    const resultantData = new URLSearchParams();
    Object.keys(data).forEach((key: string) => {
      return resultantData.append(key, typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]);
    });
    return resultantData;
  };

  /**
  * @group Template
  */
  getTemplatesList = async () => {
    const url = `/wa/app/${this.APP_ID}/template`;
    return await this.axios.get(url);
  };
  
  /**
  * @group Template
  */
  getTemplateById = async (templateId: string) => {
    const url = `/wa/app/${this.APP_ID}/template/${templateId}`;
    return await this.axios.get(url);
  };

  /**
  * @group Subscription
  */
  getSubscription = async (subscriptionId: string) => {
    const url = `/wa/app/${this.APP_ID}/subscription/${subscriptionId}`;
    return await this.axios.get(url);
  };
  
  /**
  * @group Subscription
  */
  addSubscription = async (data: SubscriptionDataAdd) => {
    const url = `/wa/app/${this.APP_ID}/subscription`;
    return await this.axios.post(url, stringify(data));
  };

  /**
  * @group Subscription
  */
  updateSubscription = async (subscriptionId: string, data: SubscriptionDataUpdate) => {
    const url = `/wa/app/${this.APP_ID}/subscription/${subscriptionId}`;
    return await this.axios.put(url, stringify(data));
  };

  /**
  * @group Subscription
  */
  deleteSubscription = async (subscriptionId: string) => {
    const url = `/wa/app/${this.APP_ID}/subscription/${subscriptionId}`;
    return await this.axios.delete(url);
  };

  /**
  * @group Subscription
  */
  deleteAllSubscriptions = async () => {
    const url = `/wa/app/${this.APP_ID}/subscription`;
    return await this.axios.delete(url);
  };

  /**
  * @group Opt In
  * @deprecated
  */
  markUserOptIn = async (userMobileNumber: string) => {
    const params = this.getUrlEncodedData({
      user: userMobileNumber
    });
    const url = `/sm/api/v1/app/opt/in/${this.APP_NAME}`;
    if (this.debug) console.log('params', params);
    return await this.axios.post(url, params);
  };

  /**
  * @group Opt In
  * @deprecated
  */
  getOptInUsersList = async () => {
    const url = `/sm/api/v1/users/${this.APP_NAME}`;
    return await this.axios.get(url);
  }

  /**
  * @group Bussiness Profile
  */
  getBusinessDetails = async () => {
    const url = `/wa/app/${this.APP_ID}/business`;
    return await this.axios.get(url);
  }  

  /**
  * @group Bussiness Profile
  */
  getBusinessProfileAbout = async () => {
    const url = `/wa/app/${this.APP_ID}/business/profile/about`;
    return await this.axios.get(url);
  }

  /**
  * @group Bussiness Profile
  */
  updateBusinessProfileAbout = async (about: string) => {
    const url = `/wa/app/${this.APP_ID}/business/profile/about`;
    const data = this.getUrlEncodedData({about});
    return await this.axios.put(url, data);
  }

  /**
  * @group Bussiness Profile
  */
  getBusinessProfileDetails = async () => {
    const url = `/wa/app/${this.APP_ID}/business/profile`;
    return await this.axios.get(url);
  }

  /**
  * @group Bussiness Profile
  */
  updateBusinessProfileDetails = async (data: BusinessProfileDetails) => {
    const url = `/wa/app/${this.APP_ID}/business/profile`;
    return await this.axios.put(url, data);
  }

  /**
  * @group Bussiness Profile
  */
  getBusinessProfilePhoto = async () => {
    const url = `/wa/app/${this.APP_ID}/business/profile/photo`;
    return await this.axios.get(url);
  }

  /**
  * @group Bussiness Profile
  */
  updateBusinessProfilePhoto = async (file: any) => {
    const url = `/wa/app/${this.APP_ID}/business/profile/photo`;
    const form = new FormData();
    form.append('image', file);
    const request_config = {
      headers: {
        'accept': 'application/json',
        ...form.getHeaders(),
      },
    };

    return await this.axios.put(url, form, request_config);
  }

  /**
  * @group Message Read Status
  */
  markRead = async (msgid: string) => {
    const url = `/wa/app/${this.APP_ID}/msg/${msgid}/read`;
    // вернет пустую data
    return await this.axios.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
  * @group Message Read Status
  * 
  * alias {@link markRead}
  */
  setReadStatus = async(msgid: string) => {
    return await this.markRead(msgid);
  }

  /**
  * @group Message Read Status
  */
  getReadStatus = async (msgid: string) => {
    const url = `/wa/app/${this.APP_ID}/msg/${msgid}`;    
    return await this.axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
  * @group Session Message
  */
  sendMediaImageMessage = async (userMobileNumber: string, imageUrl: string, caption: string) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      'src.name': this.APP_NAME,
      message: {
        type: 'image',
        originalUrl: imageUrl,
        previewUrl: imageUrl,
        caption,
      },
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendMediaVideoMessage = async (userMobileNumber: string, videoUrl: string, caption: string) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'video',
        url: videoUrl,
        caption,
      },
      'src.name': this.APP_NAME
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendMediaAudioMessage = async (userMobileNumber: string, audioUrl: string, caption: string) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'audio',
        url: audioUrl,
        caption,
      },
      'src.name': this.APP_NAME
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendMediaFileMessage = async (userMobileNumber: string, fileUrl: string, filename: string, caption: string | null) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'file',
        url: fileUrl,
        filename,
        caption,
      },
      'src.name': this.APP_NAME
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };
  
  /**
  * @group Session Message
  */
  sendMediaStickerMessage = async (userMobileNumber: string, stickerUrl: string) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'sticker',
        url: stickerUrl,
      },
      'src.name': this.APP_NAME
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendTextMessage = async (userMobileNumber: string, message: string) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'text',
        text: message
      },
      'src.name': this.APP_NAME,
      disablePreview: false
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendLocation = async (
    userMobileNumber: string,
    longitude: string,
    latitude: string,
    name: string,
    address: string
  ) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'location',
        longitude,
        latitude,
        name,
        address,
      },
      'src.name': this.APP_NAME,
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendContactCard = async (userMobileNumber: string, contact: ContactCard) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'contact',
        contact,
      },
      'src.name': this.APP_NAME,
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendListMessage = async (userMobileNumber: string, message: ListMessage) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'list',
        title: message.title,
        body: message.body,
        msgid: message.msgid,
        globalButtons: message.globalButtons,
        items: message.items,
      },
      'src.name': this.APP_NAME,
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendQuickReply = async (userMobileNumber: string, message: QuickReplyMessage) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'quick_reply',
        msgid: message.msgid,
        content: message.content,
        options: message.options,
      },
      'src.name': this.APP_NAME,
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Template Message
  */
  sendTemplateTextMessage = async (
    userMobileNumber: string, templateId: string, templateParams: string[],
    ) => {
    const params = this.getUrlEncodedData({
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      template: {
        id: templateId,
        params: templateParams,
      },
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };

  /**
  * @group Template Message
  */
  sendTemplateImageMessage = async (
    userMobileNumber: string,
    templateId: string,
    templateParams: string[],
    imageUrl: string,
    ) => {
    const params = this.getUrlEncodedData({
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      template: {
        id: templateId,
        params: templateParams,
      },
      message: {
        type: 'image',
        image: {
          link: imageUrl,
        },
      },
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };

  /**
  * @group Template Message
  */
  sendTemplateVideoMessage = async (
    userMobileNumber: string,
    templateId: string,
    templateParams: string[],
    videoUrl: string,
    ) => {
    const params = this.getUrlEncodedData({
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      template: {
        id: templateId,
        params: templateParams,
      },
      message: {
        type: 'video',
        video: {
          link: videoUrl,
        },
      },
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };

  /**
  * @group Template Message
  */
  sendTemplateDocumentMessage = async (
    userMobileNumber: string,
    templateId: string,
    templateParams: string[],
    documentUrl: string,
    filename: string,
    ) => {
    const params = this.getUrlEncodedData({
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      template: {
        id: templateId,
        params: templateParams,
      },
      message: {
        type: 'document',
        document: {
          link: documentUrl,
          filename,
        },
      },
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };

  /**
  * @group Template Message
  */
  sendTemplateLocationMessage = async (
    userMobileNumber: string,
    templateId: string,
    templateParams: string[],
    longitude: string,
    latitude: string,
    ) => {
    const params = this.getUrlEncodedData({
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      template: {
        id: templateId,
        params: templateParams,
      },
      message: {
        type: 'location',
        location: {
          longitude,
          latitude,
        },
      },
    });
    if (this.debug) console.log('params', params);
    return await this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };


  checkContentType = (type: string, contentType: string) => {
    const types: {[key: string]: string[]} = {
      audio: ['audio/aac', 'audio/mp4', 'audio/amr', 'audio/mpeg', 'audio/ogg;codecs=opus'],
      image: ['image/jpeg', 'image/png'],
      video: ['video/mp4', 'video/3gpp'],
    };
    return types[type].includes(contentType.replace(/ /g,''));
  }


  checkSize = (type: string, size: number) => {
    const types: {[key: string]: number} = {
      image: 5 * 1024 * 1024,  // 5mb
      audio: 16 * 1024 * 1024, // 16mb      
      video: 16 * 1024 * 1024, // 16mb
      file: 100 * 1024 * 1024, // 100mb
      sticker: 100 * 1024,     // 100kb
    }
    return size > 0 && size < types[type];
  }
}
