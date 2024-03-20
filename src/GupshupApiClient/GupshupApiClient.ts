import axios from 'axios';
import { requestLogger, responseLogger } from 'axios-logger';

import type {
  GupshupAPIClientConfig, 
  ContactCard,
  ListMessage,
  QuickReplyMessage,
} from './types';

export class GupshupAPIClient {
  API_KEY: string;
  APP_NAME: string;
  SOURCE_MOBILE_NUMBER: string;
  APP_ID?: string;

  url: { 
    getTemplatesList: string;
    optInUser: string;
    bulkOptIn: string;
    sendTextMessage: string;
    sendTemplateMessage: string;
    getWalletBalance: string;
    optInUsersList: string;
  };

  config: { 
    headers: { 
      'Cache-Control': string; 
      'Content-Type': string; 
      apiKey: string; 
    };
  };

  constructor ({API_KEY, APP_NAME, SOURCE_MOBILE_NUMBER, APP_ID, debug}: GupshupAPIClientConfig) {
    this.API_KEY = API_KEY;
    this.APP_NAME = APP_NAME;
    this.SOURCE_MOBILE_NUMBER = SOURCE_MOBILE_NUMBER;
    this.APP_ID = APP_ID;

    this.url = {
      getTemplatesList: `https://api.gupshup.io/sm/api/v1/template/list/${APP_NAME}`,
      optInUser: `https://api.gupshup.io/sm/api/v1/app/opt/in/${APP_NAME}`,
      bulkOptIn: `https://api.gupshup.io/sm/api/v1/app/opt/in/${APP_NAME}`,
      optInUsersList: `https://api.gupshup.io/sm/api/v1/users/${APP_NAME}`,
      sendTextMessage: 'https://api.gupshup.io/sm/api/v1/msg',
      sendTemplateMessage: 'http://api.gupshup.io/sm/api/v1/template/msg',
      getWalletBalance: 'https://api.gupshup.io/sm/api/v2/wallet/balance',
      // markRead: `https://api.gupshup.io/wa/app/${APP_ID}/msg/{msgId}/read`,
    };

    this.config = {
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        apiKey: this.API_KEY
      }
    };

    if (debug) {
      const config = {
        prefixText: 'AmoApiClient',
        // status: true,
        headers: false,
        params: true,
      };
      axios.interceptors.request.use((request) => {
        return requestLogger(request, config);
      });
      axios.interceptors.response.use((response) => {
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
  getTemplatesList = async () => await axios.get(this.url.getTemplatesList, this.config);

  getWalletBalance = async () => await axios.get(this.url.getWalletBalance, this.config);

  getOptInUsersList = async () => await axios.get(this.url.optInUsersList, this.config);

  markRead = async (msgid: string) => {
    if (!this.APP_ID) {
      throw new Error('ERROR_NOT_SET_APP_ID');
    }

    const apiUrl = 'https://api.gupshup.io';
    const url = `${apiUrl}/wa/app/${this.APP_ID}/msg/${msgid}/read`;
    // вернет пустую data
    return await axios.put(url, null, {headers: {
      apikey: this.API_KEY,
      'Content-Type': 'application/json',
    }});
  }

  markUserOptIn = async (userMobileNumber: string) => {
    const params = this.getUrlEncodedData({
      user: userMobileNumber
    });

    return await axios.post(this.url.optInUser, params, this.config);
  };

  markBulkOptIn = async (userMobileNumbers: string[]) => {
    const params = this.getUrlEncodedData({
      users: userMobileNumbers
    });

    return await axios.post(this.url.bulkOptIn, params, this.config);
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

    return await axios.post(this.url.sendTextMessage, params, this.config);
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

    return await axios.post(this.url.sendTextMessage, params, this.config);
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

    return await axios.post(this.url.sendTextMessage, params, this.config);
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

    return await axios.post(this.url.sendTextMessage, params, this.config);
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

    return await axios.post(this.url.sendTextMessage, params, this.config);
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

    return await axios.post(this.url.sendTextMessage, params, this.config);
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

    return await axios.post(this.url.sendTextMessage, params, this.config);
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

    return await axios.post(this.url.sendTextMessage, params, this.config);
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

    return await axios.post(this.url.sendTextMessage, params, this.config);
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

    return await axios.post(this.url.sendTextMessage, params, this.config);
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

    return await axios.post(this.url.sendTemplateMessage, params, this.config);
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

    return await axios.post(this.url.sendTemplateMessage, params, this.config);
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

    return await axios.post(this.url.sendTemplateMessage, params, this.config);
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

    return await axios.post(this.url.sendTemplateMessage, params, this.config);
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

    return await axios.post(this.url.sendTemplateMessage, params, this.config);
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
