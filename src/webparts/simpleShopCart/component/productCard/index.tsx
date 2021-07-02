import * as React from 'react';
import { IProducts, IUserData } from "../../models";
import {
    Plus,
    Minus,
    Delete
} from "../../public/SVGIocns";
import { GetCurrencyFormat } from "../utils/commonMethods";

// Styles
import "./CartItemStyles.css";

export interface IProductCardProps {
    Products: IProducts | IUserData;
    ProductCounter?: any;
    AddToCart?: any;
    RemoveFromCart?: any;
    IsAllProductView: boolean;
    country: string;
}

export default function ProductCard(props: IProductCardProps) {
    const {
        Products,
        IsAllProductView,
        country
    } = props;

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
                    {Products.IsSelected &&
                        <div className="add2CartBtn grid-block">
                            <input
                                className="btn btn-outline-info"
                                type="button"
                                value="Add to Cart"
                                onClick={() => props.AddToCart(Products.ID)}
                            />
                        </div>
                    }
                </>
                :
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
                    <div className="greenTick grid-block" role="button" onClick={() => props.RemoveFromCart(Products.ID)}>
                        <Delete />
                    </div>
                </>
            }
        </div>
    );
}
