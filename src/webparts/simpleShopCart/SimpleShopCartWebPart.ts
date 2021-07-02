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
import * as strings from 'SimpleShopCartWebPartStrings';
import SimpleShopCart from './SimpleShopCart';
import { ISimpleShopCartProps } from './ISimpleShopCartProps';

/* styles */
import "bootstrap/dist/css/bootstrap.min.css";

export interface ISimpleShopCartWebPartProps {
  siteTitle: string;
  country: string;
}

export default class SimpleShopCartWebPart extends BaseClientSideWebPart<ISimpleShopCartWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<Partial<ISimpleShopCartProps>> = React.createElement(
      SimpleShopCart,
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
                PropertyPaneTextField('description', {
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
