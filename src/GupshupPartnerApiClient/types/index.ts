export * from './TemplateCreateData';
export * from './Template';
export * from './GupshupPartnerApiClinetConfig';

// Re-export specific types for better organization
export { TemplateEditData, TemplateCreateDataButtons } from './TemplateCreateData';

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
