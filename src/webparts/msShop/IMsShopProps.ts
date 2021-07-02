import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IAppState } from "./models";

export interface IMsShopProps {
  context: WebPartContext;
  siteTitle: string;
  country: string;
  state?: IAppState;
  dispatch?: React.Dispatch<any>;
}
