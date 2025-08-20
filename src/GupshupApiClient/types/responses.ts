import { AxiosResponse } from 'axios';

// Базовые типы ответов
export interface BaseApiResponse {
  status: string;
  message?: string;
  error?: string;
}

export interface ApiErrorResponse {
  status: 'error';
  error: string;
  message?: string;
}

// Template responses
export interface ApiTemplate {
  id: string;
  name: string;
  status: string;
  category: string;
  language: string;
  components: TemplateComponent[];
}

export interface TemplateComponent {
  type: string;
  text?: string;
  format?: string;
  example?: string;
}

export interface TemplatesListResponse extends BaseApiResponse {
  templates: ApiTemplate[];
}

export interface TemplateResponse extends BaseApiResponse {
  template: ApiTemplate;
}

// Subscription responses
export interface Subscription {
  id: string;
  url: string;
  tag: string;
  version: number;
  modes: string;
  active: boolean;
  doCheck: string;
}

export interface SubscriptionResponse extends BaseApiResponse {
  subscription: Subscription;
}

export interface SubscriptionsListResponse extends BaseApiResponse {
  subscriptions: Subscription[];
}

// Business Profile responses
export interface BusinessProfile {
  id: string;
  name: string;
  about?: string;
  address?: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  category?: string;
  subcategory?: string;
  verified?: boolean;
}

export interface BusinessProfileResponse extends BaseApiResponse {
  business: BusinessProfile;
}

export interface BusinessProfileAboutResponse extends BaseApiResponse {
  about: string;
}

export interface BusinessProfilePhotoResponse extends BaseApiResponse {
  url: string;
}

// Message responses
export interface MessageResponse extends BaseApiResponse {
  messageId: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp?: string;
}

export interface MessageStatusResponse extends BaseApiResponse {
  messageId: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  recipientId: string;
}

// Opt-in responses (deprecated)
export interface OptInResponse extends BaseApiResponse {
  user: string;
  status: 'success' | 'failed';
}

export interface OptInUsersResponse extends BaseApiResponse {
  users: string[];
}

// User management responses
export interface BlockedUsersResponse extends BaseApiResponse {
  users: string[];
  total: number;
}

export interface BlockUserData extends BaseApiResponse {
  blocked: string[];
  failed: string[];
}

// Media validation responses
export interface MediaValidationResult {
  isValid: boolean;
  error?: string;
  maxSize?: number;
  allowedTypes?: string[];
}

// Generic API response wrapper
export type ApiResponse<T = any> = AxiosResponse<T>;

// Specific response types for each method
export type GetTemplatesListResponse = ApiResponse<TemplatesListResponse>;
export type GetTemplateByIdResponse = ApiResponse<TemplateResponse>;
export type GetSubscriptionResponse = ApiResponse<SubscriptionResponse>;
export type AddSubscriptionResponse = ApiResponse<SubscriptionResponse>;
export type UpdateSubscriptionResponse = ApiResponse<SubscriptionResponse>;
export type DeleteSubscriptionResponse = ApiResponse<BaseApiResponse>;
export type DeleteAllSubscriptionsResponse = ApiResponse<BaseApiResponse>;
export type MarkUserOptInResponse = ApiResponse<OptInResponse>;
export type GetOptInUsersListResponse = ApiResponse<OptInUsersResponse>;
export type GetBusinessDetailsResponse = ApiResponse<BusinessProfileResponse>;
export type GetBusinessProfileAboutResponse = ApiResponse<BusinessProfileAboutResponse>;
export type UpdateBusinessProfileAboutResponse = ApiResponse<BaseApiResponse>;
export type GetBusinessProfileDetailsResponse = ApiResponse<BusinessProfileResponse>;
export type UpdateBusinessProfileDetailsResponse = ApiResponse<BaseApiResponse>;
export type GetBusinessProfilePhotoResponse = ApiResponse<BusinessProfilePhotoResponse>;
export type UpdateBusinessProfilePhotoResponse = ApiResponse<BaseApiResponse>;
export type MarkReadResponse = ApiResponse<BaseApiResponse>;
export type SetReadStatusResponse = ApiResponse<BaseApiResponse>;
export type GetReadStatusResponse = ApiResponse<MessageStatusResponse>;
export type SendMediaImageMessageResponse = ApiResponse<MessageResponse>;
export type SendMediaVideoMessageResponse = ApiResponse<MessageResponse>;
export type SendMediaAudioMessageResponse = ApiResponse<MessageResponse>;
export type SendMediaFileMessageResponse = ApiResponse<MessageResponse>;
export type SendMediaStickerMessageResponse = ApiResponse<MessageResponse>;
export type SendTextMessageResponse = ApiResponse<MessageResponse>;
export type SendLocationResponse = ApiResponse<MessageResponse>;
export type SendContactCardResponse = ApiResponse<MessageResponse>;
export type SendListMessageResponse = ApiResponse<MessageResponse>;
export type SendQuickReplyResponse = ApiResponse<MessageResponse>;
export type SendTemplateTextMessageResponse = ApiResponse<MessageResponse>;
export type SendTemplateImageMessageResponse = ApiResponse<MessageResponse>;
export type SendTemplateVideoMessageResponse = ApiResponse<MessageResponse>;
export type SendTemplateDocumentMessageResponse = ApiResponse<MessageResponse>;
export type SendTemplateLocationMessageResponse = ApiResponse<MessageResponse>;

/**
 * Общий тип для ответов шаблонных сообщений
 */
export type SendTemplateMessageResponse = ApiResponse<MessageResponse>;
export type GetListBlockedUsersResponse = ApiResponse<BlockedUsersResponse>;
export type BlockUserResponse = ApiResponse<BlockUserData>; 