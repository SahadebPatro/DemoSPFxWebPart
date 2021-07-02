import * as _ from 'lodash';
import { sp } from '@pnp/sp/presets/all';
import { LIST_NAMES } from "../Constants";
import { IUserData } from "../models";


export async function GetListOfProducts() {
    let allProducts = [];
    await sp.web.lists.getByTitle(LIST_NAMES.ALL_PRODUCTS)
        .items
        .select("*", "Attachments", "AttachmentFiles")
        .expand("AttachmentFiles")
        .top(4900)
        .get()
        .then((response) => {
            allProducts = response;
        });

    return allProducts;
}

export async function GetUserMappedData(userId: number) {
    let allItems = [];
    await sp.web.lists.getByTitle(LIST_NAMES.MY_CART)
        .items
        .filter(`UserNameId eq '${userId}'`)
        .top(4900)
        .get()
        .then((response) => {
            allItems = response;
        });

    return allItems;
}

export async function AddToMyCart(userData: IUserData) {
    let response;
    await sp.web.lists.getByTitle(LIST_NAMES.MY_CART)
        .items
        .add({
            UserNameId: {
                results: [userData.UserName]
            },
            ProductLookupId: userData.ProductLookup,
            NoOfItems: userData.NoOfItems,
            TotalCost: userData.TotalCost
        }).then(res => {
            response = res;
        });
    return response;
}

export async function RemoveFromcart(itemID: number) {
    await sp.web.lists.getByTitle(LIST_NAMES.MY_CART)
        .items
        .getById(itemID)
        .delete();
}






