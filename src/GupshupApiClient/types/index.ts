
export interface Address {
  city: string;
  country: string;
  countryCode: string;
  state: string;
  street: string;
  type: string;
  zip: string;
}

export interface Email {
  email: string;
  type: string;
}

export interface Name {
  firstName: string;
  formattedName: string;
  lastName: string;
}

export interface Phone {
  phone: string;
  type: string;
  wa_id: string;
}

export interface ContactCard {
  name: Name;
  addresses: Address[];
  emails: Email[];
  phones: Phone[];
}

export interface GupshupAPIClientConfig {
  APP_ID?: string;
  API_KEY: string;
  APP_NAME: string;
  SOURCE_MOBILE_NUMBER: string;
  debug?: boolean;
}

export interface GlobalButton {
  type: string;
  title: string;
}

export interface ListMessageItemOption {
  type: string;
  title: string;
  description: string;
  postbackText: string;
}

export interface ListMessageItem {
  title: string;
  options: ListMessageItemOption[];
}

export interface ListMessage {
  title: string,
  body: string,
  msgid: string,
  globalButtons: GlobalButton[],
  items: ListMessageItem[],
}

export interface QuickReplyMessageTextContent {
  type: string;
  header: string;
  text: string;
  footer: string;  
}

export interface QuickReplyMessageMediaContent {
  type: string;
  text: string;
  url: string;
  caption: string;
}

export interface QuickReplyMessageOption {
  type: string;
  title: string;
}

export interface QuickReplyMessage {
  msgid: string;
  content: QuickReplyMessageTextContent | QuickReplyMessageMediaContent;
  options: QuickReplyMessageOption[];
}

export interface SubscriptionDataAdd {
  url: string;
  tag: string;
  version: number;
  modes: string;
  doCheck: string;
}

export interface SubscriptionDataUpdate {
  url: string;
  tag: string;
  version: number;
  modes: string;
  active: boolean;
}

export interface BusinessProfileDetails {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  desc?: string;
  pinCode?: string;
  profileEmail?: string;
  state?: string;
  vertical?: string;
  website1?: string;
  website2?: string;
}

export type AnyObject = Record<string, unknown>;

export type UploadableFile = Buffer | Blob | NodeJS.ReadableStream;

/**
 * Интерфейс для текстового сообщения в сессионном режиме
 * @interface TextMessage
 * @example
 * ```typescript
 * const textMessage: TextMessage = {
 *   type: 'text',
 *   text: 'Привет! Как дела?'
 * };
 * ```
 */
export interface TextMessage {
  /** Тип сообщения, всегда 'text' */
  type: 'text';
  /** Текст сообщения */
  text: string;
}

/**
 * Интерфейс для видео сообщения в сессионном режиме
 * @interface VideoMessage
 * @example
 * ```typescript
 * const videoMessage: VideoMessage = {
 *   type: 'video',
 *   url: 'https://example.com/video.mp4',
 *   caption: 'Интересное видео',
 *   id: 'video_123'
 * };
 * ```
 */
export interface VideoMessage {
  /** Тип сообщения, всегда 'video' */
  type: 'video';
  /** URL видео файла */
  url?: string;
  /** Подпись к видео (опционально) */
  caption?: string;
  /** ID медиа файла в Gupshup (опционально) */
  id?: string;
}

/**
 * Интерфейс для аудио сообщения в сессионном режиме
 * @interface AudioMessage
 * @example
 * ```typescript
 * const audioMessage: AudioMessage = {
 *   type: 'audio',
 *   url: 'https://example.com/audio.mp3',
 *   id: 'audio_123'
 * };
 * ```
 */
export interface AudioMessage {
  /** Тип сообщения, всегда 'audio' */
  type: 'audio';
  /** URL аудио файла */
  url?: string;
  /** ID медиа файла в Gupshup (опционально) */
  id?: string;
}

/**
 * Интерфейс для файлового сообщения в сессионном режиме
 * @interface FileMessage
 * @example
 * ```typescript
 * const fileMessage: FileMessage = {
 *   type: 'file',
 *   url: 'https://example.com/document.pdf',
 *   filename: 'важный_документ.pdf',
 *   caption: 'Документ для ознакомления',
 *   id: 'file_123'
 * };
 * ```
 */
export interface FileMessage {
  /** Тип сообщения, всегда 'file' */
  type: 'file';
  /** URL файла */
  url?: string;
  /** Имя файла */
  filename: string;
  /** Подпись к файлу (опционально) */
  caption?: string;
  /** ID медиа файла в Gupshup (опционально) */
  id?: string;
}

/**
 * Интерфейс для изображения сообщения в сессионном режиме
 * @interface ImageMessage
 * @example
 * ```typescript
 * const imageMessage: ImageMessage = {
 *   type: 'image',
 *   originalUrl: 'https://example.com/photo.jpg',
 *   previewUrl: 'https://example.com/photo.jpg',
 *   caption: 'Красивое фото!',
 *   id: 'image_123'
 * };
 * ```
 */
export interface ImageMessage {
  /** Тип сообщения, всегда 'image' */
  type: 'image';
  /** URL оригинального изображения */
  originalUrl?: string;
  /** URL превью изображения */
  previewUrl?: string;
  /** Подпись к изображению (опционально) */
  caption?: string;
  /** ID медиа файла в Gupshup (опционально) */
  id?: string;
}

/**
 * Параметры для создания видео сообщения в сессионном режиме
 * @interface CreateVideoMessageParams
 * @example
 * ```typescript
 * const params: CreateVideoMessageParams = {
 *   url: 'https://example.com/video.mp4',
 *   caption: 'Интересное видео',
 *   mediaId: 'video_123'
 * };
 * ```
 */
export interface CreateVideoMessageParams {
  /** URL видео файла */
  url?: string;
  /** Подпись к видео (опционально) */
  caption?: string;
  /** ID медиа файла в Gupshup (опционально) */
  mediaId?: string;
}

/**
 * Параметры для создания аудио сообщения в сессионном режиме
 * @interface CreateAudioMessageParams
 * @example
 * ```typescript
 * const params: CreateAudioMessageParams = {
 *   url: 'https://example.com/audio.mp3',
 *   mediaId: 'audio_123'
 * };
 * ```
 */
export interface CreateAudioMessageParams {
  /** URL аудио файла */
  url?: string;
  /** ID медиа файла в Gupshup (опционально) */
  mediaId?: string;
}

/**
 * Параметры для создания файлового сообщения в сессионном режиме
 * @interface CreateFileMessageParams
 * @example
 * ```typescript
 * const params: CreateFileMessageParams = {
 *   url: 'https://example.com/document.pdf',
 *   filename: 'важный_документ.pdf',
 *   caption: 'Документ для ознакомления',
 *   mediaId: 'file_123'
 * };
 * ```
 */
export interface CreateFileMessageParams {
  /** URL файла */
  url?: string;
  /** Имя файла */
  filename: string;
  /** Подпись к файлу (опционально) */
  caption?: string;
  /** ID медиа файла в Gupshup (опционально) */
  mediaId?: string;
}

/**
 * Параметры для создания изображения сообщения в сессионном режиме
 * @interface CreateImageMessageParams
 * @example
 * ```typescript
 * const params: CreateImageMessageParams = {
 *   url: 'https://example.com/photo.jpg',
 *   caption: 'Красивое фото!',
 *   mediaId: 'image_123'
 * };
 * ```
 */
export interface CreateImageMessageParams {
  /** URL изображения */
  url?: string;
  /** Подпись к изображению (опционально) */
  caption?: string;
  /** ID медиа файла в Gupshup (опционально) */
  mediaId?: string;
}

/**
 * Общий тип для всех типов сообщений в сессионном режиме
 * @type {Message}
 * @example
 * ```typescript
 * // Можно использовать любой из типов сообщений
 * const message: Message = client.createTextMessage('Привет!');
 * // или
 * const message: Message = client.createImageMessage({ url: 'https://example.com/photo.jpg' });
 * ```
 */
export type Message = TextMessage | VideoMessage | AudioMessage | FileMessage | ImageMessage;

/**
 * Интерфейс для шаблонного изображения сообщения
 * @interface TemplateImageMessage
 * @example
 * ```typescript
 * const templateImage: TemplateImageMessage = {
 *   type: 'image',
 *   image: {
 *     link: 'https://example.com/photo.jpg',
 *     id: 'image_123'
 *   }
 * };
 * ```
 */
export interface TemplateImageMessage {
  /** Тип сообщения, всегда 'image' */
  type: 'image';
  /** Объект изображения */
  image: {
    /** URL изображения (опционально) */
    link?: string;
    /** ID медиа файла в Gupshup (опционально) */
    id?: string;
  };
}

/**
 * Интерфейс для шаблонного документа сообщения
 * @interface TemplateDocumentMessage
 * @example
 * ```typescript
 * const templateDocument: TemplateDocumentMessage = {
 *   type: 'document',
 *   document: {
 *     link: 'https://example.com/document.pdf',
 *     id: 'doc_123'
 *   }
 * };
 * ```
 */
export interface TemplateDocumentMessage {
  /** Тип сообщения, всегда 'document' */
  type: 'document';
  /** Объект документа */
  document: {
    /** URL документа (опционально) */
    link?: string;
    /** ID медиа файла в Gupshup (опционально) */
    id?: string;
  };
}

/**
 * Интерфейс для шаблонного аудио сообщения
 * @interface TemplateAudioMessage
 * @example
 * ```typescript
 * const templateAudio: TemplateAudioMessage = {
 *   type: 'audio',
 *   audio: {
 *     link: 'https://example.com/audio.mp3',
 *     id: 'audio_123'
 *   }
 * };
 * ```
 */
export interface TemplateAudioMessage {
  /** Тип сообщения, всегда 'audio' */
  type: 'audio';
  /** Объект аудио */
  audio: {
    /** URL аудио файла (опционально) */
    link?: string;
    /** ID медиа файла в Gupshup (опционально) */
    id?: string;
  };
}

/**
 * Интерфейс для шаблонного видео сообщения
 * @interface TemplateVideoMessage
 * @example
 * ```typescript
 * const templateVideo: TemplateVideoMessage = {
 *   type: 'video',
 *   video: {
 *     link: 'https://example.com/video.mp4',
 *     id: 'video_123'
 *   }
 * };
 * ```
 */
export interface TemplateVideoMessage {
  /** Тип сообщения, всегда 'video' */
  type: 'video';
  /** Объект видео */
  video: {
    /** URL видео файла (опционально) */
    link?: string;
    /** ID медиа файла в Gupshup (опционально) */
    id?: string;
  };
}

/**
 * Общий тип для всех шаблонных сообщений
 * @type {TemplateMessage}
 * @example
 * ```typescript
 * // Можно использовать любой из типов шаблонных сообщений
 * const templateMessage: TemplateMessage = client.createTemplateImageMessage({ url: 'https://example.com/photo.jpg' });
 * // или передать null для текстового шаблона
 * const templateMessage: TemplateMessage | null = null;
 * ```
 */
export type TemplateMessage = TemplateImageMessage | TemplateDocumentMessage | TemplateAudioMessage | TemplateVideoMessage;

/**
 * Параметры для создания шаблонного изображения сообщения
 * @interface TemplateImageMessageParams
 * @example
 * ```typescript
 * const params: TemplateImageMessageParams = {
 *   url: 'https://example.com/photo.jpg',
 *   mediaId: 'image_123'
 * };
 * ```
 */
export interface TemplateImageMessageParams {
  /** URL изображения */
  url?: string;
  /** ID медиа файла в Gupshup (опционально) */
  mediaId?: string;
}

/**
 * Параметры для создания шаблонного документа сообщения
 * @interface TemplateDocumentMessageParams
 * @example
 * ```typescript
 * const params: TemplateDocumentMessageParams = {
 *   url: 'https://example.com/document.pdf',
 *   mediaId: 'doc_123'
 * };
 * ```
 */
export interface TemplateDocumentMessageParams {
  /** URL документа */
  url?: string;
  /** ID медиа файла в Gupshup (опционально) */
  mediaId?: string;
}

/**
 * Параметры для создания шаблонного аудио сообщения
 * @interface TemplateAudioMessageParams
 * @example
 * ```typescript
 * const params: TemplateAudioMessageParams = {
 *   url: 'https://example.com/audio.mp3',
 *   mediaId: 'audio_123'
 * };
 * ```
 */
export interface TemplateAudioMessageParams {
  /** URL аудио файла */
  url?: string;
  /** ID медиа файла в Gupshup (опционально) */
  mediaId?: string;
}

/**
 * Параметры для создания шаблонного видео сообщения
 * @interface TemplateVideoMessageParams
 * @example
 * ```typescript
 * const params: TemplateVideoMessageParams = {
 *   url: 'https://example.com/video.mp4',
 *   mediaId: 'video_123'
 * };
 * ```
 */
export interface TemplateVideoMessageParams {
  /** URL видео файла */
  url?: string;
  /** ID медиа файла в Gupshup (опционально) */
  mediaId?: string;
}

// Re-export response types
export * from './responses';
