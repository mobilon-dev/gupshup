import axios, {AxiosInstance} from 'axios';
import { requestLogger, responseLogger } from 'axios-logger';
import {stringify} from 'qs';
import * as FormData from 'form-data';

/**
 * Проверяет, что строка не пуста
 * @param {string} val - Проверяемое значение
 * @throws {Error} Если значение пустое
 */
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
  AnyObject,
  UploadableFile,
  TextMessage,
  VideoMessage,
  AudioMessage,
  FileMessage,
  ImageMessage,
  CreateVideoMessageParams,
  CreateAudioMessageParams,
  CreateFileMessageParams,
  CreateImageMessageParams,
  Message,
  TemplateImageMessage,
  TemplateDocumentMessage,
  TemplateAudioMessage,
  TemplateVideoMessage,
  TemplateMessage,
  TemplateImageMessageParams,
  TemplateDocumentMessageParams,
  TemplateAudioMessageParams,
  TemplateVideoMessageParams,
  // Response types
  GetTemplatesListResponse,
  GetTemplateByIdResponse,
  GetSubscriptionResponse,
  AddSubscriptionResponse,
  UpdateSubscriptionResponse,
  DeleteSubscriptionResponse,
  DeleteAllSubscriptionsResponse,
  MarkUserOptInResponse,
  GetOptInUsersListResponse,
  GetBusinessDetailsResponse,
  GetBusinessProfileAboutResponse,
  UpdateBusinessProfileAboutResponse,
  GetBusinessProfileDetailsResponse,
  UpdateBusinessProfileDetailsResponse,
  GetBusinessProfilePhotoResponse,
  UpdateBusinessProfilePhotoResponse,
  MarkReadResponse,
  SetReadStatusResponse,
  GetReadStatusResponse,
  SendMediaImageMessageResponse,
  SendMediaVideoMessageResponse,
  SendMediaAudioMessageResponse,
  SendMediaFileMessageResponse,
  SendMediaStickerMessageResponse,
  SendTextMessageResponse,
  SendLocationResponse,
  SendContactCardResponse,
  SendListMessageResponse,
  SendQuickReplyResponse,
  SendTemplateTextMessageResponse,
  SendTemplateImageMessageResponse,
  SendTemplateVideoMessageResponse,
  SendTemplateDocumentMessageResponse,
  SendTemplateLocationMessageResponse,
  SendTemplateMessageResponse,
  GetListBlockedUsersResponse,
  BlockUserResponse,
} from './types';


const SEND_TEXT_MESSAGE_URL = '/wa/api/v1/msg';
const SENT_TEMPLATE_MESSAGE_URL = '/wa/api/v1/template/msg';

/**
 * Класс для работы с Gupshup API
 */
export class GupshupAPIClient {
  API_KEY: string;
  APP_NAME: string;
  SOURCE_MOBILE_NUMBER: string;
  APP_ID: string;
  axios: AxiosInstance;
  debug: boolean;

  /**
   * Создает экземпляр GupshupAPIClient
   * @param {GupshupAPIClientConfig} param0 - Конфиг клиента
   */
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
   * Преобразует объект в URLSearchParams, сериализуя объекты в JSON
   * @param {AnyObject} data - Данные для кодирования
   * @returns {URLSearchParams}
   */
  getUrlEncodedData = (data: AnyObject) => {
    const resultantData = new URLSearchParams();
    Object.keys(data).forEach((key: string) => {
      const value = data[key];
      resultantData.append(
        key,
        typeof value === 'object' ? JSON.stringify(value) : String(value)
      );
    });
    return resultantData;
  };

  /**
   * Получает имя файла из UploadableFile
   * @param {UploadableFile} file - Файл для получения имени
   * @returns {string} Имя файла или описание типа
   */
  private getFileName = (file: UploadableFile): string => {
    if (Buffer.isBuffer(file)) {
      return `Buffer(${file.length} bytes)`;
    }
    
    if (file instanceof Blob) {
      return `Blob(${file.size} bytes, ${file.type})`;
    }
    
    // NodeJS.ReadableStream
    if (typeof file === 'object' && file !== null && 'path' in file) {
      const stream = file as any;
      if (stream.path) {
        return stream.path.split('/').pop() || 'Unknown file';
      }
    }
    
    return 'Unknown file type';
  };

  /**
  * Получить список шаблонов
  * @group Template
  * @returns {Promise<GetTemplatesListResponse>} Ответ axios
  */
  getTemplatesList = async (): Promise<GetTemplatesListResponse> => {
    const url = `/wa/app/${this.APP_ID}/template`;
    return this.axios.get(url);
  };
  
  /**
  * Получить шаблон по ID
  * @group Template
  * @param {string} templateId - ID шаблона
  * @returns {Promise<GetTemplateByIdResponse>} Ответ axios
  */
  getTemplateById = async (templateId: string): Promise<GetTemplateByIdResponse> => {
    const url = `/wa/app/${this.APP_ID}/template/${templateId}`;
    return this.axios.get(url);
  };

  /**
  * Получить подписку по ID
  * @group Subscription
  * @param {string} subscriptionId - ID подписки
  * @returns {Promise<GetSubscriptionResponse>} Ответ axios
  */
  getSubscription = async (subscriptionId: string): Promise<GetSubscriptionResponse> => {
    const url = `/wa/app/${this.APP_ID}/subscription/${subscriptionId}`;
    return this.axios.get(url);
  };
  
  /**
  * Добавить подписку
  * @group Subscription
  * @param {SubscriptionDataAdd} data - Данные подписки
  * @returns {Promise<AddSubscriptionResponse>} Ответ axios
  */
  addSubscription = async (data: SubscriptionDataAdd): Promise<AddSubscriptionResponse> => {
    const url = `/wa/app/${this.APP_ID}/subscription`;
    return this.axios.post(url, stringify(data));
  };

  /**
  * Обновить подписку
  * @group Subscription
  * @param {string} subscriptionId - ID подписки
  * @param {SubscriptionDataUpdate} data - Новые данные
  * @returns {Promise<UpdateSubscriptionResponse>} Ответ axios
  */
  updateSubscription = async (subscriptionId: string, data: SubscriptionDataUpdate): Promise<UpdateSubscriptionResponse> => {
    const url = `/wa/app/${this.APP_ID}/subscription/${subscriptionId}`;
    return this.axios.put(url, stringify(data));
  };

  /**
  * Удалить подписку
  * @group Subscription
  * @param {string} subscriptionId - ID подписки
  * @returns {Promise<DeleteSubscriptionResponse>} Ответ axios
  */
  deleteSubscription = async (subscriptionId: string): Promise<DeleteSubscriptionResponse> => {
    const url = `/wa/app/${this.APP_ID}/subscription/${subscriptionId}`;
    return this.axios.delete(url);
  };

  /**
  * Удалить все подписки
  * @group Subscription
  * @returns {Promise<DeleteAllSubscriptionsResponse>} Ответ axios
  */
  deleteAllSubscriptions = async (): Promise<DeleteAllSubscriptionsResponse> => {
    const url = `/wa/app/${this.APP_ID}/subscription`;
    return this.axios.delete(url);
  };

  /**
  * Пометить пользователя как opt-in (устарело)
  * @group Opt In
  * @deprecated
  * @param {string} userMobileNumber - Номер пользователя
  * @returns {Promise<MarkUserOptInResponse>} Ответ axios
  */
  markUserOptIn = async (userMobileNumber: string): Promise<MarkUserOptInResponse> => {
    const params = this.getUrlEncodedData({
      user: userMobileNumber
    });
    const url = `/sm/api/v1/app/opt/in/${this.APP_NAME}`;
    if (this.debug) console.log('params', params);
    return this.axios.post(url, params);
  };

  /**
  * Получить список opt-in пользователей (устарело)
  * @group Opt In
  * @deprecated
  * @returns {Promise<GetOptInUsersListResponse>} Ответ axios
  */
  getOptInUsersList = async (): Promise<GetOptInUsersListResponse> => {
    const url = `/sm/api/v1/users/${this.APP_NAME}`;
    return this.axios.get(url);
  }

  /**
  * Получить бизнес-детали
  * @group Bussiness Profile
  * @returns {Promise<GetBusinessDetailsResponse>} Ответ axios
  */
  getBusinessDetails = async (): Promise<GetBusinessDetailsResponse> => {
    const url = `/wa/app/${this.APP_ID}/business`;
    return this.axios.get(url);
  }  

  /**
  * Получить about бизнес-профиля
  * @group Bussiness Profile
  * @returns {Promise<GetBusinessProfileAboutResponse>} Ответ axios
  */
  getBusinessProfileAbout = async (): Promise<GetBusinessProfileAboutResponse> => {
    const url = `/wa/app/${this.APP_ID}/business/profile/about`;
    return this.axios.get(url);
  }

  /**
  * Обновить about бизнес-профиля
  * @group Bussiness Profile
  * @param {string} about - Новый about
  * @returns {Promise<UpdateBusinessProfileAboutResponse>} Ответ axios
  */
  updateBusinessProfileAbout = async (about: string): Promise<UpdateBusinessProfileAboutResponse> => {
    const url = `/wa/app/${this.APP_ID}/business/profile/about`;
    const data = this.getUrlEncodedData({about});
    return this.axios.put(url, data);
  }

  /**
  * Получить детали бизнес-профиля
  * @group Bussiness Profile
  * @returns {Promise<GetBusinessProfileDetailsResponse>} Ответ axios
  */
  getBusinessProfileDetails = async (): Promise<GetBusinessProfileDetailsResponse> => {
    const url = `/wa/app/${this.APP_ID}/business/profile`;
    return this.axios.get(url);
  }

  /**
  * Обновить детали бизнес-профиля
  * @group Bussiness Profile
  * @param {BusinessProfileDetails} data - Новые детали
  * @returns {Promise<UpdateBusinessProfileDetailsResponse>} Ответ axios
  */
  updateBusinessProfileDetails = async (data: BusinessProfileDetails): Promise<UpdateBusinessProfileDetailsResponse> => {
    const url = `/wa/app/${this.APP_ID}/business/profile`;
    return this.axios.put(url, data);
  }

  /**
  * Получить фото бизнес-профиля
  * @group Bussiness Profile
  * @returns {Promise<GetBusinessProfilePhotoResponse>} Ответ axios
  */
  getBusinessProfilePhoto = async (): Promise<GetBusinessProfilePhotoResponse> => {
    const url = `/wa/app/${this.APP_ID}/business/profile/photo`;
    return this.axios.get(url);
  }

  /**
  * Обновить фото бизнес-профиля
  * @group Bussiness Profile
  * @param {UploadableFile} file - Файл изображения
  * @returns {Promise<UpdateBusinessProfilePhotoResponse>} Ответ axios
  */
  updateBusinessProfilePhoto = async (file: UploadableFile): Promise<UpdateBusinessProfilePhotoResponse> => {
    const url = `/wa/app/${this.APP_ID}/business/profile/photo`;
    const form = new FormData();
    form.append('image', file);
    const request_config = {
      headers: {
        'accept': 'application/json',
        ...form.getHeaders(),
      },
    };

    return this.axios.put(url, form, request_config);
  }

  /**
   * Загрузить медиа файл
   * @group Media
   * @param {UploadableFile} file - Файл для загрузки
   * @param {string} mimeType - Тип файла (audio, image, video, file, sticker)
   * @returns {Promise<any>} Ответ axios с информацией о загруженном файле
   */
  uploadMedia = async (file: UploadableFile, mimeType: string) => {
    const url = `/wa/${this.APP_ID}/wa/media/`;
    const form = new FormData();
    form.append('file', file);
    form.append('file_type', mimeType);

    // Создаем отдельный axios instance без логирования для uploadMedia
    const uploadAxios = axios.create({
      baseURL: 'https://api.gupshup.io',
      headers: {
        'Cache-Control': 'no-cache',
        'accept': 'application/json',
        apiKey: this.API_KEY,
        ...form.getHeaders(), // Добавляем заголовки FormData (включая правильный Content-Type)
      },
    });

    // Добавляем кастомное логирование только для uploadMedia
    if (this.debug) {
      uploadAxios.interceptors.request.use((request) => {
        console.log(`[GupshupApiClient][Request] ${request.method?.toUpperCase()} ${request.url} | File type: ${mimeType} | File: ${this.getFileName(file)}`);
        return request;
      });
      uploadAxios.interceptors.response.use((response) => {
        console.log(`[GupshupApiClient][Response] ${response.config.method?.toUpperCase()} ${response.config.url} ${response.status}`, response.data);
        return response;
      });
    }

    return uploadAxios.post(url, form);
  }

  /**
  * Пометить сообщение как прочитанное
  * @group Message Read Status
  * @param {string} msgid - ID сообщения
  * @returns {Promise<MarkReadResponse>} Ответ axios
  */
  markRead = async (msgid: string): Promise<MarkReadResponse> => {
    const url = `/wa/app/${this.APP_ID}/msg/${msgid}/read`;
    // вернет пустую data
    return this.axios.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
  * Альяс для markRead
  * @group Message Read Status
  * @param {string} msgid - ID сообщения
  * @returns {Promise<SetReadStatusResponse>} Ответ axios
  */
  setReadStatus = async(msgid: string): Promise<SetReadStatusResponse> => {
    return this.markRead(msgid);
  }

  /**
  * Получить статус прочтения сообщения
  * @group Message Read Status
  * @param {string} msgid - ID сообщения
  * @returns {Promise<GetReadStatusResponse>} Ответ axios
  */
  getReadStatus = async (msgid: string): Promise<GetReadStatusResponse> => {
    const url = `/wa/app/${this.APP_ID}/msg/${msgid}`;    
    return this.axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
  * @group MM Lite
  */
 /*
  sendMMLiteMessage = async (to: string, template: any) => {

    const data = {
      recipient_type: "individual",
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        language: {
          policy: "deterministic",
          code: "en"
        },
        "namespace": "5ff5f84e_789b_44df_80dd_6844d48a6a4a",
        "name": "cc_temp_prod",
        "components": [
            {
                "type": "body",
                "parameters": []
            },
            {
                "type": "button",
                "sub_type": "copy_code",
                "index": "0",
                "parameters": [
                    {
                        "type": "coupon_code",
                        "coupon_code": "250FF"
                    }
                ]
            },
            {
                "type": "button",
                "sub_type": "url",
                "index": "1",
                "parameters": [
                    {
                        "type": "text",
                        "text": "summer2023"
                    }
                ]
            },
            {
                "type": "button",
                "sub_type": "url",
                "index": "2",
                "parameters": [
                    {
                        "type": "text",
                        "text": "summer2023"
                    }
                ]
            }
        ]
    }
}'
  }
*/


  /**
  * @group Session Message
  */
  sendMediaImageMessage = async (userMobileNumber: string, imageUrl: string, caption: string): Promise<SendMediaImageMessageResponse> => {
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
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
   * Создает объект текстового сообщения для сессионной отправки
   * @group Message Creation
   * @param {string} message - Текст сообщения
   * @returns {TextMessage} Объект текстового сообщения
   * @example
   * ```typescript
   * const textMessage = client.createTextMessage('Привет! Как дела?');
   * await client.sendSessionMessage('1234567890', textMessage);
   * ```
   */
  createTextMessage = (message: string): TextMessage => {
    return {
      type: 'text',
      text: message,
    };
  }

  /**
   * Создает объект видео сообщения для сессионной отправки
   * @group Message Creation
   * @param {CreateVideoMessageParams} params - Параметры для создания видео сообщения
   * @param {string} params.url - URL видео файла
   * @param {string} [params.caption] - Подпись к видео
   * @param {string} [params.mediaId] - ID медиа файла в Gupshup
   * @returns {VideoMessage} Объект видео сообщения
   * @example
   * ```typescript
   * const videoMessage = client.createVideoMessage({
   *   url: 'https://example.com/video.mp4',
   *   caption: 'Посмотри это видео!',
   *   mediaId: 'video_123'
   * });
   * await client.sendSessionMessage('1234567890', videoMessage);
   * ```
   */
  createVideoMessage = (params: CreateVideoMessageParams): VideoMessage => {
    return {
      type: 'video',
      url: params.url,
      caption: params.caption,
      id: params.mediaId,
    };
  }

  /**
   * Создает объект аудио сообщения для сессионной отправки
   * @group Message Creation
   * @param {CreateAudioMessageParams} params - Параметры для создания аудио сообщения
   * @param {string} params.url - URL аудио файла
   * @param {string} [params.mediaId] - ID медиа файла в Gupshup
   * @returns {AudioMessage} Объект аудио сообщения
   * @example
   * ```typescript
   * const audioMessage = client.createAudioMessage({
   *   url: 'https://example.com/audio.mp3',
   *   mediaId: 'audio_123'
   * });
   * await client.sendSessionMessage('1234567890', audioMessage);
   * ```
   */
  createAudioMessage = (params: CreateAudioMessageParams): AudioMessage => {
    return {
      type: 'audio',
      url: params.url,
      id: params.mediaId,
    };
  }

  /**
   * Создает объект файлового сообщения для сессионной отправки
   * @group Message Creation
   * @param {CreateFileMessageParams} params - Параметры для создания файлового сообщения
   * @param {string} params.url - URL файла
   * @param {string} params.filename - Имя файла
   * @param {string} [params.caption] - Подпись к файлу
   * @param {string} [params.mediaId] - ID медиа файла в Gupshup
   * @returns {FileMessage} Объект файлового сообщения
   * @example
   * ```typescript
   * const fileMessage = client.createFileMessage({
   *   url: 'https://example.com/document.pdf',
   *   filename: 'важный_документ.pdf',
   *   caption: 'Документ для ознакомления',
   *   mediaId: 'file_123'
   * });
   * await client.sendSessionMessage('1234567890', fileMessage);
   * ```
   */
  createFileMessage = (params: CreateFileMessageParams): FileMessage => {
    return {
      type: 'file',
      url: params.url,
      filename: params.filename,
      caption: params.caption,
      id: params.mediaId,
    };
  } 

  /**
   * Создает объект изображения сообщения для сессионной отправки
   * @group Message Creation
   * @param {CreateImageMessageParams} params - Параметры для создания изображения сообщения
   * @param {string} params.url - URL изображения
   * @param {string} [params.caption] - Подпись к изображению
   * @param {string} [params.mediaId] - ID медиа файла в Gupshup
   * @returns {ImageMessage} Объект изображения сообщения
   * @example
   * ```typescript
   * const imageMessage = client.createImageMessage({
   *   url: 'https://example.com/photo.jpg',
   *   caption: 'Красивое фото!',
   *   mediaId: 'image_123'
   * });
   * await client.sendSessionMessage('1234567890', imageMessage);
   * ```
   */
  createImageMessage = (params: CreateImageMessageParams): ImageMessage => {  
    return {
      type: 'image',
      originalUrl: params.url,
      previewUrl: params.url,
      caption: params.caption,
      id: params.mediaId,
    };
  }

  /**
  * @group Session Message
  * @deprecated Use createVideoMessage instead
  */
  sendMediaVideoMessage = async (userMobileNumber: string, videoUrl: string, caption: string): Promise<SendMediaVideoMessageResponse> => {
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
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };


  /**
   * Отправляет сообщение в сессии (универсальный метод для всех типов сообщений)
   * @group Session Message
   * @param {string} userMobileNumber - Номер пользователя в международном формате
   * @param {Message} message - Объект сообщения (текст, видео, аудио, файл или изображение)
   * @returns {Promise<SendTextMessageResponse>} Ответ axios с информацией о статусе отправки
   * @example
   * ```typescript
   * // Отправка текстового сообщения
   * const textMessage = client.createTextMessage('Привет!');
   * await client.sendSessionMessage('1234567890', textMessage);
   * 
   * // Отправка изображения
   * const imageMessage = client.createImageMessage({
   *   url: 'https://example.com/photo.jpg',
   *   caption: 'Красивое фото!'
   * });
   * await client.sendSessionMessage('1234567890', imageMessage);
   * 
   * // Отправка видео
   * const videoMessage = client.createVideoMessage({
   *   url: 'https://example.com/video.mp4',
   *   caption: 'Интересное видео'
   * });
   * await client.sendSessionMessage('1234567890', videoMessage);
   * ```
   */
  sendSessionMessage = async (
    userMobileNumber: string, 
    message: Message
  ): Promise<SendTextMessageResponse> => {
    const params = this.getUrlEncodedData({
      channel: 'whatsapp',
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      message,
      'src.name': this.APP_NAME
    });
    if (this.debug) console.log('params', params);
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };


  /**
  * @group Session Message
  * @deprecated Use sendSessionMessage instead
  */
  sendMediaAudioMessage = async (userMobileNumber: string, audioUrl: string, caption: string): Promise<SendMediaAudioMessageResponse> => {
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
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  * @deprecated Use sendSessionMessage instead
  */
  sendMediaFileMessage = async (userMobileNumber: string, fileUrl: string, filename: string, caption: string | null): Promise<SendMediaFileMessageResponse> => {
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
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };
  
  /**
  * @group Session Message
  */
  sendMediaStickerMessage = async (userMobileNumber: string, stickerUrl: string): Promise<SendMediaStickerMessageResponse> => {
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
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  * @deprecated Use createTextMessage instead
  */
  sendTextMessage = async (userMobileNumber: string, message: string): Promise<SendTextMessageResponse> => {
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
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
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
  ): Promise<SendLocationResponse> => {
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
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendContactCard = async (userMobileNumber: string, contact: ContactCard): Promise<SendContactCardResponse> => {
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
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendListMessage = async (userMobileNumber: string, message: ListMessage): Promise<SendListMessageResponse> => {
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
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
  * @group Session Message
  */
  sendQuickReply = async (userMobileNumber: string, message: QuickReplyMessage): Promise<SendQuickReplyResponse> => {
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
    return this.axios.post(SEND_TEXT_MESSAGE_URL, params);
  };

  /**
   * Создает объект шаблонного изображения сообщения
   * @group Template Message Creation
   * @param {TemplateImageMessageParams} params - Параметры для создания шаблонного изображения сообщения
   * @param {string} params.url - URL изображения
   * @param {string} [params.mediaId] - ID медиа файла в Gupshup
   * @returns {TemplateImageMessage} Объект шаблонного изображения сообщения
   * @example
   * ```typescript
   * const templateImage = client.createTemplateImageMessage({
   *   url: 'https://example.com/image.jpg',
   *   mediaId: 'image_123'
   * });
   * ```
   */
  createTemplateImageMessage = (params: TemplateImageMessageParams): TemplateImageMessage => {
    return {
      type: 'image',
      image: {
        link: params.url,
        id: params.mediaId,
      },
    };
  }

  /**
   * Создает объект шаблонного документа сообщения
   * @group Template Message Creation
   * @param {TemplateDocumentMessageParams} params - Параметры для создания шаблонного документа сообщения
   * @param {string} params.url - URL документа
   * @param {string} [params.mediaId] - ID медиа файла в Gupshup
   * @returns {TemplateDocumentMessage} Объект шаблонного документа сообщения
   * @example
   * ```typescript
   * const templateDocument = client.createTemplateDocumentMessage({
   *   url: 'https://example.com/document.pdf',
   *   mediaId: 'doc_123'
   * });
   * ```
   */
  createTemplateDocumentMessage = (params: TemplateDocumentMessageParams): TemplateDocumentMessage => {
    return {
      type: 'document',
      document: {
        link: params.url,
        id: params.mediaId,
      },
    };
  }

  /**
   * Создает объект шаблонного аудио сообщения
   * @group Template Message Creation
   * @param {TemplateAudioMessageParams} params - Параметры для создания шаблонного аудио сообщения
   * @param {string} params.url - URL аудио файла
   * @param {string} [params.mediaId] - ID медиа файла в Gupshup
   * @returns {TemplateAudioMessage} Объект шаблонного аудио сообщения
   * @example
   * ```typescript
   * const templateAudio = client.createTemplateAudioMessage({
   *   url: 'https://example.com/audio.mp3',
   *   mediaId: 'audio_123'
   * });
   * ```
   */
  createTemplateAudioMessage = (params: TemplateAudioMessageParams): TemplateAudioMessage => {
    return {
      type: 'audio',
      audio: {
        link: params.url,
        id: params.mediaId,
      },
    };
  }

  /**
   * Создает объект шаблонного видео сообщения
   * @group Template Message Creation
   * @param {TemplateVideoMessageParams} params - Параметры для создания шаблонного видео сообщения
   * @param {string} params.url - URL видео файла
   * @param {string} [params.mediaId] - ID медиа файла в Gupshup
   * @returns {TemplateVideoMessage} Объект шаблонного видео сообщения
   * @example
   * ```typescript
   * const templateVideo = client.createTemplateVideoMessage({
   *   url: 'https://example.com/video.mp4',
   *   mediaId: 'video_123'
   * });
   * ```
   */
  createTemplateVideoMessage = (params: TemplateVideoMessageParams): TemplateVideoMessage => {
    return {
      type: 'video',
      video: {
        link: params.url,
        id: params.mediaId,
      },
    };
  }

  /**
   * Отправляет шаблонное сообщение (универсальный метод)
   * @group Template Message
   * @param {string} userMobileNumber - Номер пользователя
   * @param {string} templateId - ID шаблона в Gupshup
   * @param {string[]} templateParams - Параметры для подстановки в шаблон
   * @param {TemplateMessage | null} message - Объект медиа сообщения или null для текстового шаблона
   * @returns {Promise<SendTemplateMessageResponse>} Ответ axios
   * @example
   * ```typescript
   * // Отправка шаблона с изображением
   * const templateImage = client.createTemplateImageMessage({
   *   url: 'https://example.com/image.jpg'
   * });
   * 
   * await client.sendTemplateMessage(
   *   '1234567890',
   *   'template_id_123',
   *   ['John', 'Doe'],
   *   templateImage
   * );
   * 
   * // Отправка текстового шаблона
   * await client.sendTemplateMessage(
   *   '1234567890',
   *   'text_template_id',
   *   ['param1', 'param2'],
   *   null
   * );
   * ```
   */
  sendTemplateMessage = async (userMobileNumber: string, templateId: string, templateParams: string[] | null, message: TemplateMessage | null): Promise<SendTemplateMessageResponse> => {
    let data : any;
    data = {
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      template: {
        id: templateId,
      },
    };
    if (templateParams) data.template.params = templateParams;
    if(message) data['message'] = message;
    const params = this.getUrlEncodedData(data);
    if (this.debug) console.log('params', params);
    return this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  }

  /**
  * @group Template Message
  * @deprecated Use sendTemplateMessage instead
  */
  sendTemplateTextMessage = async (
    userMobileNumber: string, templateId: string, templateParams: string[],
    ): Promise<SendTemplateTextMessageResponse> => {
    const params = this.getUrlEncodedData({
      source: this.SOURCE_MOBILE_NUMBER,
      destination: userMobileNumber,
      template: {
        id: templateId,
        params: templateParams,
      },
    });
    if (this.debug) console.log('params', params);
    return this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };

  /**
  * @group Template Message
  * @deprecated Use sendTemplateMessage instead
  */
  sendTemplateImageMessage = async (
    userMobileNumber: string,
    templateId: string,
    templateParams: string[],
    imageUrl: string,
    ): Promise<SendTemplateImageMessageResponse> => {
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
    return this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };

  /**
  * @group Template Message
  */
  sendTemplateVideoMessage = async (
    userMobileNumber: string,
    templateId: string,
    templateParams: string[],
    videoUrl: string,
    ): Promise<SendTemplateVideoMessageResponse> => {
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
    return this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
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
    ): Promise<SendTemplateDocumentMessageResponse> => {
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
    return this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
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
    ): Promise<SendTemplateLocationMessageResponse> => {
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
    return this.axios.post(SENT_TEMPLATE_MESSAGE_URL, params);
  };


  /**
   * Проверяет тип контента для медиа
   * @param {string} type - Тип (audio, image, video)
   * @param {string} contentType - Content-Type файла
   * @returns {boolean}
   */
  checkContentType = (type: string, contentType: string) => {
    const types: {[key: string]: string[]} = {
      audio: ['audio/aac', 'audio/mp4', 'audio/amr', 'audio/mpeg', 'audio/ogg;codecs=opus'],
      image: ['image/jpeg', 'image/png'],
      video: ['video/mp4', 'video/3gpp'],
    };
    return types[type].includes(contentType.replace(/ /g,''));
  }


  /**
   * Проверяет размер файла для медиа
   * @param {string} type - Тип (audio, image, video, file, sticker)
   * @param {number} size - Размер файла в байтах
   * @returns {boolean}
   */
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


  /**
   * Получить список заблокированных пользователей
   * @group Users
   * @param {number} [limit] - Лимит
   * @param {number} [after] - Смещение
   * @returns {Promise<GetListBlockedUsersResponse>} Ответ axios
   */
  getListBlockedUsers = async (limit?: number, after?: number): Promise<GetListBlockedUsersResponse> => {
    const url = `/wa/app/${this.APP_ID}/user/blocklist`;
    return this.axios.get(url);
  }

  /**
   * Заблокировать пользователя
   * @param {string} number - Номер пользователя
   * @returns {Promise<BlockUserResponse>} Ответ axios
   */
  blockUser = async (number: string): Promise<BlockUserResponse> => {
    const url = `/wa/app/${this.APP_ID}/user/block`;
    const data = {
      messaging_product: "whatsapp",
      block_users: [{user: number}],
    }
    return this.axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }

}
