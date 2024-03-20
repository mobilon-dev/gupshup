export interface TemplateCreateDataButtons{
  type:string;
  text:string;
  url?:string;
  phone_number?:string;
}

export interface TemplateCreateData{
  elementName: string;
  languageCode: string;
  category: string;
  templateType: string;
  vertical: string;
  content: string;
  header: string;
  footer: string;
  buttons: TemplateCreateDataButtons[];
  example: string;
  enableSample: boolean
}
