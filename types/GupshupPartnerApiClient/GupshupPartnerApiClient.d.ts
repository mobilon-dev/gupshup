import { AxiosInstance } from 'axios';
import { Template, TemplateCreateData, GupshupPartnerApiClientConfig } from './types';
declare class GupshupPartnerApiClient {
    portalUrl: string;
    appId: string;
    appToken: string;
    axios: AxiosInstance;
    constructor({ appId, appToken, debug }: GupshupPartnerApiClientConfig);
    getTemplates(): Promise<Template[]>;
    postTemplate(templateData: TemplateCreateData): Promise<any>;
    delTemplate(elementName: string): Promise<any>;
    putCallBackUrl(callbackUrl: string): Promise<any>;
    addOptIn(phone: string): Promise<any>;
    getUserStatus(phone: string): Promise<any>;
    isPhoneOpted(phone: string): Promise<boolean>;
    getMessageLimit(): Promise<any>;
    updateEvents(events: string[]): Promise<boolean>;
    getUsage(from: string, to: string): Promise<any>;
    getDiscount(year: string, month: string): Promise<any>;
    getBusinessProfileDetails(): Promise<any>;
    getBusinessProfileAbout(): Promise<any>;
    getBusinessProfilePhoto(): Promise<any>;
}
export { GupshupPartnerApiClient, };
