export interface IProducts {
    ID: number;
    Product: string;
    ProductType: string;
    Company: string;
    Price: number;
    Image: string;
    IsSelected: boolean;
    NoOfItems: number;
    TotalCost: number;
}

export interface IUserData {
    ID?: number;
    ProductLookup: number;
    UserName: number;
    NoOfItems: number;
    TotalCost: number;
}

export interface IUserDataApi {
    ID?: number;
    ProductLookupId: number;
    UserName: number;
    NoOfItems: number;
    TotalCost: number;
}

export interface IUser {
    name: string;
    email: string;
    absoluteWebUrl: string;
    id: number;
}

export interface IAppState {
    pageContext: any;
    user: IUser;
    showLoader: boolean;
    siteTitle: string;
    country: string;
    productData: IProducts[];
    userData: IUserData[];
}