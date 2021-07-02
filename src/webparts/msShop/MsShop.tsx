import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IMsShopProps } from './IMsShopProps';
import { AppStateContext } from './contexts';
import appReducer, { initialState } from './reducers/appReducer';
import * as fromAppStateActions from './actions';
import { HomeContainer } from "./container/home";
import { MyCart } from "./container/myCart";
import { PaymentComponent } from "./container/payment";
import { GetListOfProducts, GetUserMappedData } from "./services";
import { MapProductData, MapUserData } from "./mappers";

// Styles
import 'react-tabs/style/react-tabs.css';
import "./public/styles/commonStyles.css";

export default function MsShop(props: Partial<IMsShopProps>) {

  const {
    context,
    country,
    siteTitle
  } = props;

  const [state, dispatch] = React.useReducer(appReducer, {
    ...initialState,
    pageContext: context
  });
  const { displayName, email } = context.pageContext.user;
  const { userId } = context.pageContext.legacyPageContext;
  const absoluteWebUrl = context.pageContext.web.absoluteUrl;

  React.useEffect(() => {
    const user = {
      name: displayName,
      email,
      absoluteWebUrl,
      id: userId
    };
    dispatch(fromAppStateActions.Actions.userInfo(user));
  }, [displayName, email, absoluteWebUrl, userId]);

  React.useEffect(() => {
    dispatch(fromAppStateActions.Actions.setCountry(country));
  }, [country]);

  React.useEffect(() => {
    dispatch(fromAppStateActions.Actions.setSiteTitle(siteTitle));
  }, [siteTitle]);

  const GetProductDetails = () => {
    (async () => {
      const productList = await GetListOfProducts();
      const userData = await GetUserMappedData(userId);
      dispatch(fromAppStateActions.Actions.setUserData(
        MapUserData(userId, userData)
      ));
      dispatch(fromAppStateActions.Actions.setProductData(
        MapProductData(productList, userData))
      );
    })();
  };

  React.useEffect(() => {
    GetProductDetails();
  }, [absoluteWebUrl]);

  return (
    <div>
      <AppStateContext.Provider value={{ state, dispatch }}>
        <Tabs>
          <TabList>
            <Tab>Home</Tab>
            <Tab>My Cart</Tab>
            <Tab>Payment</Tab>
          </TabList>

          <TabPanel>
            <HomeContainer />
          </TabPanel>
          <TabPanel>
            <MyCart />
          </TabPanel>
          <TabPanel>
            <PaymentComponent />
          </TabPanel>
        </Tabs>
      </AppStateContext.Provider>
    </div>
  );
}
