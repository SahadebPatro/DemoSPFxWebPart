import * as React from 'react';
import { ISimpleShopCartProps } from "../ISimpleShopCartProps";
import ProductCard from "../component/productCard";
import { Loader } from "../component/loader";
import { GetListOfProducts, AddToMyCart, GetUserMappedData } from "../services";
import { IProducts, IUserDataApi, IUserData } from "../models";


export function HomeContainer(props: Partial<ISimpleShopCartProps>) {
  const { country, context } = props;
  const { userId } = context.pageContext.legacyPageContext;

  const [productList, setProductList] = React.useState<IProducts[]>([]);
  const [showLoader, setShowLoader] = React.useState(true);

  const AddToCart = async (pID: number) => {
    setShowLoader(true);
    let uData: IUserData = null;
    const filteredObj: IProducts[] = productList.map(item => {
      if (item.ID === pID) {
        uData = {
          ProductLookupId: item.ID,
          UserName: userId,
          NoOfItems: item.NoOfItems,
          TotalCost: item.Price * item.NoOfItems
        };
        return {
          ...item,
          IsSelected: false
        };
      } else return item;
    });
    if (uData) await AddToMyCart(uData);
    setProductList(filteredObj);
    setShowLoader(false);
  };

  React.useEffect(() => {
    (async () => {
      let pList: IProducts[] = await GetListOfProducts();
      const userList: IUserDataApi[] = await GetUserMappedData(userId);
      pList = pList.map(o => {
        return {
          ...o,
          IsSelected: userList.filter(x => x.ProductLookupId === o.ID).length <= 0
        };
      });
      setProductList(pList);
      setShowLoader(false);
    })();
  }, []);


  return (
    <>
      {showLoader ?
        <Loader />
        :
        <>
          {productList.map((product: IProducts) => (
            <ProductCard
              Products={product}
              AddToCart={AddToCart}
              IsAllProductView={true}
              country={country}
            />
          ))
          }
          {!productList.length &&
            <h6>There are no products in the site. </h6>
          }
        </>
      }
    </>
  );
}
