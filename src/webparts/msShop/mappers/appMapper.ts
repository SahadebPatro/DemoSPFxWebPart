import * as _ from 'lodash';
import {
    IProducts,
    IUserData,
    IUserDataApi,
    IUser
} from "../models";

export function GetCurrencyFormat(countryName: string): string {
    let currency = "$";
    switch (countryName) {
        case "India":
            currency = "₹";
            break;
        case "US":
            currency = "$";
            break;
        case "UK":
            currency = "£";
            break;
        default:
            break;
    }
    return currency;
}

export function MapProductData(allProducts: IProducts[], userData: IUserDataApi[]): IProducts[] {
    let tempProduct: IProducts[] = [];
    allProducts.map(product => {
        let userMappedProduct: IUserDataApi = _.head(userData.filter(x => x.ProductLookupId === product.ID));
        let temp_IsSelected = false;
        let temp_NoOfItems = 1;
        let temp_TotalCost = 0;
        if (userMappedProduct) {
            temp_IsSelected = true;
            temp_NoOfItems = userMappedProduct.NoOfItems;
            temp_TotalCost = userMappedProduct.TotalCost;
        }

        tempProduct.push({
            ID: product.ID,
            Product: product.Product,
            ProductType: product.ProductType,
            Company: product.Company,
            Price: product.Price,
            Image: product.Image,
            IsSelected: temp_IsSelected,
            NoOfItems: temp_NoOfItems,
            TotalCost: temp_TotalCost
        });
    });
    return tempProduct;
}

export function MapUserData(userId: number, userData: IUserDataApi[]): IUserData[] {
    let tempProduct: IUserData[] = [];
    userData.map(item => {

        tempProduct.push({
            ID: item.ID,
            UserName: userId,
            ProductLookup: item.ProductLookupId,
            NoOfItems: item.NoOfItems,
            TotalCost: item.TotalCost
        });
    });
    return tempProduct;
}
