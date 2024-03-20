
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
