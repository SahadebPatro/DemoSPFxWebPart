import { IAppState } from "../models";
import * as AppStateActions from '../actions';


export const initialState: IAppState = {
    pageContext: null,
    user: {
        name: '',
        email: '',
        absoluteWebUrl: '',
        id: null
    },
    showLoader: true,
    siteTitle: "MS Shopping Cart",
    country: "India",
    productData: [],
    userData: []
};

export default function appReducer(
    state: IAppState,
    action: AppStateActions.AppStateActions
): IAppState {
    switch (action.type) {
        case AppStateActions.AppStateActionTypes.USER_INFO:
            return {
                ...state,
                user: action.payload
            };

        case AppStateActions.AppStateActionTypes.SHOW_LOADER:
            return {
                ...state,
                showLoader: true
            };

        case AppStateActions.AppStateActionTypes.HIDE_LOADER:
            return {
                ...state,
                showLoader: false
            };

        case AppStateActions.AppStateActionTypes.SITE_TITLE:
            return {
                ...state,
                siteTitle: action.payload
            };

        case AppStateActions.AppStateActionTypes.COUNTRY:
            return {
                ...state,
                country: action.payload
            };

        case AppStateActions.AppStateActionTypes.PRODUCT_DATA:
            return {
                ...state,
                productData: action.payload
            };

        case AppStateActions.AppStateActionTypes.USER_DATA:
            return {
                ...state,
                userData: action.payload
            };

        default:
            break;
    }
}
