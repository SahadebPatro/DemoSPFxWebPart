import * as React from 'react';
import Alert from 'react-bootstrap/Alert';
import { AppStateContext } from "../../contexts";
import * as fromAppStateActions from '../../actions';
import { PRICING_DETAILS } from "../../Constants";
import { GetCurrencyFormat } from "../../mappers";

// Styles
import "./PaymentStyles.css";

export function PaymentComponent() {

    const { state, dispatch } = React.useContext(AppStateContext);
    const { productData, user, country } = state;

    const [currenctSymbol, setCurrenctSymbol] = React.useState("");
    const [isOrdered, setIsOrdered] = React.useState(false);

    const CalculateTotalCost = (): number => {
        let total = 0;
        productData.filter(o => o.IsSelected).map(item => (total += item.TotalCost));
        return total;
    };

    const CostWithShipping = (): number => {
        let total = 0;
        const costWithNoShip = CalculateTotalCost();
        total = costWithNoShip ? (costWithNoShip + PRICING_DETAILS.SHIPPING) : 0;
        return total;
    };

    React.useEffect(() => {
        setCurrenctSymbol(GetCurrencyFormat(country));
    }, [country]);

    return (
        <>
            {isOrdered ?
                <Alert key={0} variant="success">
                    <span>Your order placed successfully !</span>
                </Alert>
                :
                <div className="payment-info">
                    <div className="d-flex justify-content-between align-items-center">
                        <span>CARD DETAILS</span>
                        <img className="rounded" src={`/_layouts/15/userphoto.aspx?size=L&username=${user.email}`} width="30" />
                    </div>
                    <span className="type d-block mt-3 mb-1">Card type</span>

                    <label className="radio"> <input type="radio" name="card" value="payment" checked />
                        <span><img width="30" src={require("../../public/images/mastercard.png")} /></span>
                    </label>
                    <label className="radio">
                        <input type="radio" name="card" value="payment" />
                        <span><img width="30" src={require("../../public/images/visa.png")} /></span>
                    </label>
                    <label className="radio">
                        <input type="radio" name="card" value="payment" />
                        <span><img width="30" src={require("../../public/images/amex.png")} /></span>
                    </label>
                    <label className="radio">
                        <input type="radio" name="card" value="payment" />
                        <span><img width="30" src={require("../../public/images/paypal.png")} /></span>
                    </label>
                    <div>
                        <label className="credit-card-label">Name on card</label>
                        <input type="text" className="form-control credit-inputs" placeholder="Name" />
                    </div>
                    <div>
                        <label className="credit-card-label">Card number</label>
                        <input type="text" className="form-control credit-inputs" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="credit-card-label">Date</label>
                            <input type="text" className="form-control credit-inputs" placeholder="12/24" />
                        </div>
                        <div className="col-md-6">
                            <label className="credit-card-label">CVV</label>
                            <input type="text" className="form-control credit-inputs" placeholder="123" />
                        </div>
                    </div>

                    <hr className="line" />

                    <div className="d-flex justify-content-between information">
                        <span>Subtotal</span><span>{currenctSymbol} {CalculateTotalCost()}</span>
                    </div>
                    <div className="d-flex justify-content-between information">
                        <span>Shipping</span><span>{currenctSymbol} {CalculateTotalCost() ? PRICING_DETAILS.SHIPPING : 0}</span>
                    </div>
                    <div className="d-flex justify-content-between information">
                        <span>Total(Incl. taxes)</span><span>{currenctSymbol} {CostWithShipping()}</span>
                    </div>

                    <button className="btn btn-block d-flex justify-content-between mt-3 payment-btn" type="button"
                        onClick={() => setIsOrdered(true)}>
                        <span><strong>{currenctSymbol} {CostWithShipping()}</strong></span>
                        <span><strong>Confirm checkout</strong></span>
                    </button>
                </div>
            }
        </>
    );
}
