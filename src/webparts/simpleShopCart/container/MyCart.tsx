import * as React from 'react';
import { ISimpleShopCartProps } from "../ISimpleShopCartProps";
import ProductCard from "../component/productCard";
import { Loader } from "../component/loader";
import { PaymentComponent } from "../component/payment";
import { RemoveFromcart, GetUserMappedData } from "../services";
import { IUserData, IUserDataApi } from "../models";

export function MyCart(props: Partial<ISimpleShopCartProps>) {

  const { country, context } = props;
  const { userId } = context.pageContext.legacyPageContext;
  const { email } = context.pageContext.user;

  const [userData, setUserData] = React.useState<IUserData[]>([]);
  const [showLoader, setShowLoader] = React.useState(true);
  const [isPaymentReady, setIsPaymentReady] = React.useState(false);

  const ProductCounter = (pID: number, newNum: number) => {
    const filteredObj: IUserData[] = userData.map(item => {
      if (item.ID === pID) {
        return {
          ...item,
          TotalCost: (newNum < 1 ? (item.Price * 1) : (item.Price * newNum)),
          NoOfItems: (newNum < 1 ? 1 : newNum)
        };
      } else return item;
    });
    setUserData(filteredObj);
  };

  const RemoveFromCart = async (pID: number) => {
    setShowLoader(true);
    await RemoveFromcart(pID);
    setUserData(
      userData.filter(x => x.ID != pID)
    );
    setShowLoader(false);
  };

  const GoToPayment = (isPayment: boolean) => {
    setIsPaymentReady(isPayment);
  };

  React.useEffect(() => {
    (async () => {
      const pList: IUserDataApi[] = await GetUserMappedData(userId);
      const finalList: IUserData[] = pList.map(o => {
        return {
          ID: o.ID,
          ProductLookupId: o.ProductLookupId,
          UserName: userId,
          Price: o.ProductLookup.Price,
          Product: o.ProductLookup.Product,
          Company: o.ProductLookup.Company,
          ProductType: o.ProductLookup.ProductType,
          Image: o.ProductLookup.Image,
          NoOfItems: o.NoOfItems,
          TotalCost: o.ProductLookup.Price * o.NoOfItems
        };
      });
      setUserData(finalList);
      setShowLoader(false);
    })();
  }, []);


  return (
    <>
      {showLoader ?
        <Loader />
        :
        <>
          {!isPaymentReady ?
            <>
              {userData.map((product: IUserData) => (
                <ProductCard
                  Products={product}
                  ProductCounter={ProductCounter}
                  RemoveFromCart={RemoveFromCart}
                  IsAllProductView={false}
                  country={country}
                />
              ))
              }
              {!userData.length &&
                <h6>There are no items in your cart. </h6>
              }
              <input type="button" value="Proceed for Payment" className="btn btn-primary" style={{ float: "right" }}
                onClick={() => GoToPayment(true)} />
            </>
            :
            <PaymentComponent
              userData={userData}
              userEmail={email}
              country={country}
            />
          }
        </>
      }
    </>
  );
}
