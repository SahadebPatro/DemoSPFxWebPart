import * as React from 'react';
import { IProducts, IUserData } from "../../models";
import { AppStateContext } from "../../contexts";
import * as fromAppStateActions from '../../actions';
import ShoppingItems from "../../components/shoppingItems";
import { AddToMyCart } from "../../services";

export function HomeContainer() {

    const { state, dispatch } = React.useContext(AppStateContext);
    const { productData, user, userData } = state;

    const ProductCounter = (pID: number, newNum: number) => {
        const filteredObj: IProducts[] = productData.map(item => {
            if (item.ID === pID) {
                return {
                    ...item,
                    TotalCost: (newNum < 1 ? (item.Price * 1) : (item.Price * newNum)),
                    NoOfItems: (newNum < 1 ? 1 : newNum)
                };
            } else return item;
        });
        dispatch(fromAppStateActions.Actions.setProductData(filteredObj));
    };

    const AddToCart = async (pID: number, isAdd: boolean) => {
        let uData: IUserData = null;
        const filteredObj: IProducts[] = productData.map(item => {
            if (item.ID === pID) {
                uData = {
                    ProductLookup: item.ID,
                    UserName: user.id,
                    NoOfItems: item.NoOfItems,
                    TotalCost: item.Price * item.NoOfItems
                };
                return {
                    ...item,
                    IsSelected: isAdd
                };
            } else return item;
        });
        if (uData && isAdd) {
            const res = await AddToMyCart(uData);
            uData = {
                ...uData,
                ID: res.data.ID
            };
            userData.push(uData);
            dispatch(fromAppStateActions.Actions.setUserData(userData));
        }
        dispatch(fromAppStateActions.Actions.setProductData(filteredObj));
    };

    return (
        <div className="shopping-cart">

            {productData.map((product: IProducts) => (
                <ShoppingItems
                    Products={product}
                    ProductCounter={ProductCounter}
                    AddToCart={AddToCart}
                    IsAllProductView={true}
                />
            ))
            }
        </div>
    );
}
