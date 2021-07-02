import * as React from 'react';
import { IProducts } from "../../models";
import {
    Plus,
    Minus,
    GreenTick,
    Delete
} from "../../public/SVGIocns";
import { AppStateContext } from "../../contexts";
import { GetCurrencyFormat } from "../../mappers";

// Styles
import "./CartItemStyles.css";

export interface IShoppingItemsProps {
    Products: IProducts;
    ProductCounter?: any;
    AddToCart?: any;
    RemoveFromCart?: any;
    IsAllProductView: boolean;
}

export default function ShoppingItems(props: IShoppingItemsProps) {
    const {
        Products,
        IsAllProductView
    } = props;

    const { state } = React.useContext(AppStateContext);
    const { country } = state;

    return (
        <div className="item">
            <div className="ItemImage grid-block">
                <img src={require(`../../public/images/${Products.Image}`)} alt="img" />
            </div>

            <div className="description grid-block">
                <h6>{Products.Product}</h6>
                <span>{Products.ProductType}</span>
                <span>{Products.Company}</span>
            </div>

            <div className="total-price grid-block">
                <strong>{GetCurrencyFormat(country)} {Products.TotalCost ? Products.TotalCost : Products.Price}</strong>
            </div>

            {IsAllProductView ?
                <>
                    <div className="quantity grid-block">
                        <button className="minus-btn" type="button" name="button"
                            onClick={() => props.ProductCounter(Products.ID, (Products.NoOfItems - 1))}>
                            <Minus />
                        </button>
                        <strong><span className="my-1"> {Products.NoOfItems} </span></strong>
                        <button className="plus-btn" type="button" name="button"
                            onClick={() => props.ProductCounter(Products.ID, (Products.NoOfItems + 1))}>
                            <Plus />
                        </button>
                    </div>

                    <div className="add2CartBtn grid-block">
                        {Products.IsSelected ?
                            <GreenTick />
                            :
                            <input
                                className="btn btn-outline-info"
                                type="button"
                                value="Add to Cart"
                                onClick={() => props.AddToCart(Products.ID, true)}
                            />
                        }
                    </div>
                </>
                :
                <>
                    <div className="quantity grid-block">
                        <strong><span className="my-1"> {Products.NoOfItems} </span></strong>
                    </div>

                    <div className="greenTick grid-block" role="button" onClick={() => props.RemoveFromCart(Products.ID, false)}>
                        <Delete />
                    </div>
                </>
            }
        </div>
    );
}
