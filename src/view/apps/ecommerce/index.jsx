import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom';

import { Row, Col } from "antd";

import Inventory from './inventory';
import Shop from './shop/Shop';
import Wishlist from './wishlist/Wishlist';
import Detail from './detail/Detail';
import OrderDetails from './checkout/OrderDetails';
import AddressInformation from './checkout/AddressInformation';
import Payment from './checkout/Payment';

export default function Ecommerce() {
  const cart = useSelector(state => state.ecommerce.cart)
  const current = useSelector(state => state.ecommerce.currentItem)

  // Checkout Price
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += (item.qty * (item.discount ? item.discount : item.price))
    });

    setTotalItem(items);
    setTotalPrice(price);
  }, [cart, totalItem, totalPrice, setTotalItem, setTotalPrice]);

  return (
    <Row gutter={32} className="hp-ecommerce-app hp-mb-32">
      <Col span={24}>
        <Switch>
          <Route
            exact
            path="/account/ecommerce/shop"
          >
            <Shop />
          </Route>

          <Route path="/account/ecommerce/inventory">
            <Inventory />
          </Route>

          <Route path="/account/ecommerce/wishlist">
            <Wishlist />
          </Route>

          <Route path="/account/ecommerce/checkout">
            <OrderDetails
              totalItem={totalItem}
              totalPrice={totalPrice}
            />
          </Route>

          <Route path="/account/ecommerce/address-information">
            <AddressInformation
              totalItem={totalItem}
              totalPrice={totalPrice}
            />
          </Route>

          <Route path="/account/ecommerce/payment">
            <Payment
              totalItem={totalItem}
              totalPrice={totalPrice}
            />
          </Route>

          {!current ? (
            <Redirect to="/account/ecommerce/shop" />
          ) : (
            <Route path="/account/ecommerce/product-detail/:id">
              <Detail />
            </Route>
          )}
        </Switch>
      </Col>
    </Row >
  )
}