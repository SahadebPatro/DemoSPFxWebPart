import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ISimpleShopCartProps } from './ISimpleShopCartProps';
import {
  HomeContainer,
  MyCart
} from "./container";

// Styles
import 'react-tabs/style/react-tabs.css';

export default function SimpleShopCart(props: Partial<ISimpleShopCartProps>) {
  return (
    <div >
      <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>My Cart</Tab>
          <Tab>Reports</Tab>
        </TabList>

        <TabPanel>
          <HomeContainer {...props} />
        </TabPanel>
        <TabPanel>
          <MyCart {...props} />
        </TabPanel>
        <TabPanel>
          <h1>Reports</h1>
        </TabPanel>
      </Tabs>
    </div>
  );
}