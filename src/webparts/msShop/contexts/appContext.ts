import * as React from 'react';
import { IMsShopProps } from '../IMsShopProps';

export const AppStateContext = React.createContext<Partial<IMsShopProps>>(
  {}
);