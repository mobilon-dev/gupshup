export * from './TemplateCreateData';
export * from './Template';
export * from './GupshupPartnerApiClinetConfig';


export interface PartnerSubscriptionDataAdd {
  url: string;
  tag: string;
  version: number;
  modes: string;
  doCheck: string;
}

export interface PartnerSubscriptionDataUpdate {
  url: string;
  tag: string;
  version: number;
  modes: string;
  active: boolean;
}
