import * as React from 'react';
import * as _ from 'lodash';
import { IProducts } from "../../models";
import { AppStateContext } from "../../contexts";
import * as fromAppStateActions from '../../actions';
import ShoppingItems from "../../components/shoppingItems";
import { RemoveFromcart } from "../../services";

export function MyCart() {
    const { state, dispatch } = React.useContext(AppStateContext);
    const { productData, userData } = state;

    const [pData, setPData] = React.useState<IProducts[]>([]);

    React.useEffect(() => {
        const myItems = productData.filter(item => item.IsSelected);
        setPData(myItems);
    }, [productData]);

    const RemoveFromCart = async (pID: number, isAdd: boolean) => {
        const filteredObj: IProducts[] = productData.map(item => {
            if (item.ID === pID) {
                return {
                    ...item,
                    IsSelected: isAdd
                };
            } else return item;
        });
        if (!isAdd) {
            const uObj = _.head(userData.filter(x => x.ProductLookup === pID));
            if (uObj) {
                await RemoveFromcart(uObj.ID);
                const newUserData = userData.filter(x => x.ProductLookup != pID);
                dispatch(fromAppStateActions.Actions.setUserData(newUserData));
            }
        }
        dispatch(fromAppStateActions.Actions.setProductData(filteredObj));
    };

    return (
        <div className="shopping-cart">

            {pData.map((product: IProducts) => (
                <ShoppingItems
                    Products={product}
                    IsAllProductView={false}
                    RemoveFromCart={RemoveFromCart}
                />
            ))
            }
            {!pData.length &&
                <h4>There are no items in your cart ! </h4>
            }
        </div>
    );
}
