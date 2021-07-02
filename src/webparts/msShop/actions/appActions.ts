import { ActionsUnion, createAction } from '../utils/actionCreator';

import {
    IUser,
    IProducts,
    IUserData
} from "../models";

export enum AppStateActionTypes {
    USER_INFO = '[APP STATE] Update User Info',
    SHOW_LOADER = '[APP STATE] Show the application loader',
    HIDE_LOADER = '[APP STATE] HIde the application loader',
    SITE_TITLE = '[APP STATE] Update Site Title property',
    COUNTRY = '[APP STATE] Update Country property',
    PRODUCT_DATA = '[APP STATE] Update Product Data',
    USER_DATA = '[APP STATE] Update User Data',
}

export const Actions = {
    userInfo: (user: IUser) => createAction(AppStateActionTypes.USER_INFO, user),
    showLoader: () => createAction(AppStateActionTypes.SHOW_LOADER),
    hideLoader: () => createAction(AppStateActionTypes.HIDE_LOADER),
    setSiteTitle: (title: string) => createAction(AppStateActionTypes.SITE_TITLE, title),
    setCountry: (country: string) => createAction(AppStateActionTypes.COUNTRY, country),
    setProductData: (products: IProducts[]) => createAction(AppStateActionTypes.PRODUCT_DATA, products),
    setUserData: (userData: IUserData[]) => createAction(AppStateActionTypes.USER_DATA, userData)
};

export type AppStateActions = ActionsUnion<typeof Actions>;