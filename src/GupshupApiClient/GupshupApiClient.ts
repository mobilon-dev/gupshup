import axios, {AxiosInstance} from 'axios';
import { requestLogger, responseLogger } from 'axios-logger';

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
} from './types';

const SEND_TEXT_MESSAGE_URL = '/sm/api/v1/msg';
const SENT_TEMPLATE_MESSAGE_URL = '/sm/api/v1/template/msg';

export class GupshupAPIClient {
  API_KEY: string;
  APP_NAME: string;
  SOURCE_MOBILE_NUMBER: string;
  APP_ID?: string;
  axios: AxiosInstance;

  constructor ({API_KEY, APP_NAME, SOURCE_MOBILE_NUMBER, APP_ID, debug}: GupshupAPIClientConfig) {
    this.API_KEY = API_KEY;
    this.APP_NAME = APP_NAME;
    this.SOURCE_MOBILE_NUMBER = SOURCE_MOBILE_NUMBER;
    this.APP_ID = APP_ID;

    check(this.API_KEY);
    check(this.APP_NAME);

    this.axios = axios.create({
      baseURL: 'https://api.gupshup.io',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        apiKey: this.API_KEY,
      },
    });

    if (debug) {
      const config = {
        prefixText: 'GupshupApiClient',
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
   * 
   * @returns 
   */
  getTemplatesList = async () => {
    const url = `/sm/api/v1/template/list/${this.APP_NAME}`;
    return await this.axios.get(url);
  };

  getWalletBalance = async () => {
    const url = '/sm/api/v2/wallet/balance';
    return await this.axios.get(url);
  }

  getOptInUsersList = async () => {
    const url = `/sm/api/v1/users/${this.APP_NAME}`;
    return await this.axios.get(url);
  }

  markRead = async (msgid: string) => {
    if (!this.APP_ID) {
      throw new Error('ERROR_NOT_SET_APP_ID');
    }

    //const apiUrl = 'https://api.gupshup.io';
    const url = `/wa/app/${this.APP_ID}/msg/${msgid}/read`;
    // вернет пустую data
    return await this.axios.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  markUserOptIn = async (userMobileNumber: string) => {
    const params = this.getUrlEncodedData({
      user: userMobileNumber
    });
    const url = `/sm/api/v1/app/opt/in/${this.APP_NAME}`;
    return await this.axios.post(url, params);
  };

  markBulkOptIn = async (userMobileNumbers: string[]) => {
    const params = this.getUrlEncodedData({
      users: userMobileNumbers
    });
    const url = `/sm/api/v1/app/opt/in/${this.APP_NAME}`;
    return await this.axios.post(url, params);
  };

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
        caption
      }
    });
    
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

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

    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  sendMediaAudioMessage = async (userMobileNumber: string, audioUrl: string) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'audio',
        url: audioUrl,
      },
      'src.name': this.APP_NAME
    });

    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  sendMediaFileMessage = async (userMobileNumber: string, fileUrl: string, filename: string) => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message: {
        type: 'file',
        url: fileUrl,
        filename,
      },
      'src.name': this.APP_NAME
    });

    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };
  
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

    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

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
    console.log('text', params);
    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

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

    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

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

    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

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

    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

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

    return await this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

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

    return await this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };

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

    return await this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };

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

    return await this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };

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

    return await this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };

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
