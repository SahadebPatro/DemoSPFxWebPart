import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp/presets/all";
import * as strings from 'MsShopWebPartStrings';
import MsShop from './MsShop';
import { IMsShopProps } from './IMsShopProps';

/* styles */
import "bootstrap/dist/css/bootstrap.min.css";

export interface IMsShopWebPartProps {
  siteTitle: string;
  country: string;
}

export default class MsShopWebPart extends BaseClientSideWebPart<IMsShopWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<Partial<IMsShopProps>> = React.createElement(
      MsShop,
      {
        siteTitle: this.properties.siteTitle,
        country: this.properties.country,
        context: this.context
      } 
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('siteTitle', {
                  label: strings.SiteTitleLabel
                }),
                PropertyPaneDropdown('country', {
                  label: strings.CountrySelectionLabel,
                  options: [{
                    key: 'India',
                    text: 'India'
                  },
                  {
                    key: 'US',
                    text: 'US'
                  },
                  {
                    key: "UK",
                    text: "UK"
                  }]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
