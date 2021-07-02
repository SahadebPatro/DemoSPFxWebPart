import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISimpleShopCartProps {
  context: WebPartContext;
  siteTitle: string;
  country: string;
}
