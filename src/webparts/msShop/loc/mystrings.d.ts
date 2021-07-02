declare interface IMsShopWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  SiteTitleLabel: string;
  CountrySelectionLabel: string;
}

declare module 'MsShopWebPartStrings' {
  const strings: IMsShopWebPartStrings;
  export = strings;
}
