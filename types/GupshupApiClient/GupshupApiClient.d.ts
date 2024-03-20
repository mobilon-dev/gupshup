import { AxiosInstance } from 'axios';
import type { GupshupAPIClientConfig, ContactCard, ListMessage, QuickReplyMessage } from './types';
export declare class GupshupAPIClient {
    API_KEY: string;
    APP_NAME: string;
    SOURCE_MOBILE_NUMBER: string;
    APP_ID?: string;
    axios: AxiosInstance;
    url: {
        getTemplatesList: string;
        optInUser: string;
        bulkOptIn: string;
        sendTextMessage: string;
        sendTemplateMessage: string;
        getWalletBalance: string;
        optInUsersList: string;
    };
    constructor({ API_KEY, APP_NAME, SOURCE_MOBILE_NUMBER, APP_ID, debug }: GupshupAPIClientConfig);
    /**
     *
     * @param {*} data
     * @returns
     */
    getUrlEncodedData: (data: {
        [key: string]: any;
    }) => URLSearchParams;
    /**
     *
     * @returns
     */
    getTemplatesList: () => Promise<import("axios").AxiosResponse<any, any>>;
    getWalletBalance: () => Promise<import("axios").AxiosResponse<any, any>>;
    getOptInUsersList: () => Promise<import("axios").AxiosResponse<any, any>>;
    markRead: (msgid: string) => Promise<import("axios").AxiosResponse<any, any>>;
    markUserOptIn: (userMobileNumber: string) => Promise<import("axios").AxiosResponse<any, any>>;
    markBulkOptIn: (userMobileNumbers: string[]) => Promise<import("axios").AxiosResponse<any, any>>;
    sendMediaImageMessage: (userMobileNumber: string, imageUrl: string, caption: string) => Promise<import("axios").AxiosResponse<any, any>>;
    sendMediaVideoMessage: (userMobileNumber: string, videoUrl: string, caption: string) => Promise<import("axios").AxiosResponse<any, any>>;
    sendMediaAudioMessage: (userMobileNumber: string, audioUrl: string) => Promise<import("axios").AxiosResponse<any, any>>;
    sendMediaFileMessage: (userMobileNumber: string, fileUrl: string, filename: string) => Promise<import("axios").AxiosResponse<any, any>>;
    sendMediaStickerMessage: (userMobileNumber: string, stickerUrl: string) => Promise<import("axios").AxiosResponse<any, any>>;
    sendTextMessage: (userMobileNumber: string, message: string) => Promise<import("axios").AxiosResponse<any, any>>;
    sendLocation: (userMobileNumber: string, longitude: string, latitude: string, name: string, address: string) => Promise<import("axios").AxiosResponse<any, any>>;
    sendContactCard: (userMobileNumber: string, contact: ContactCard) => Promise<import("axios").AxiosResponse<any, any>>;
    sendListMessage: (userMobileNumber: string, message: ListMessage) => Promise<import("axios").AxiosResponse<any, any>>;
    sendQuickReply: (userMobileNumber: string, message: QuickReplyMessage) => Promise<import("axios").AxiosResponse<any, any>>;
    sendTemplateTextMessage: (userMobileNumber: string, templateId: string, templateParams: string[]) => Promise<import("axios").AxiosResponse<any, any>>;
    sendTemplateImageMessage: (userMobileNumber: string, templateId: string, templateParams: string[], imageUrl: string) => Promise<import("axios").AxiosResponse<any, any>>;
    sendTemplateVideoMessage: (userMobileNumber: string, templateId: string, templateParams: string[], videoUrl: string) => Promise<import("axios").AxiosResponse<any, any>>;
    sendTemplateDocumentMessage: (userMobileNumber: string, templateId: string, templateParams: string[], documentUrl: string, filename: string) => Promise<import("axios").AxiosResponse<any, any>>;
    sendTemplateLocationMessage: (userMobileNumber: string, templateId: string, templateParams: string[], longitude: string, latitude: string) => Promise<import("axios").AxiosResponse<any, any>>;
    checkContentType: (type: string, contentType: string) => boolean;
    checkSize: (type: string, size: number) => boolean;
}
