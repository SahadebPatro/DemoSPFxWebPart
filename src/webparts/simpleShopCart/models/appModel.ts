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
    ProductLookupId: number;
    UserName: number;    
    Price?: number;
    Product?: string;
    ProductType?: string;
    Company?: string;
    Image?: string;
    IsSelected?: boolean;
    NoOfItems: number;
    TotalCost: number;
}

interface ProductLookup {
    Price: number;
    Product: string;
    ProductType: string;
    Company: string;
    Image: string;
}

export interface IUserDataApi {
    ID?: number;
    ProductLookupId: number;
    UserName: number;
    ProductLookup?: ProductLookup;
    NoOfItems: number;
    TotalCost: number;
}

export interface IUser {
    name: string;
    email: string;
    absoluteWebUrl: string;
    id: number;
}
