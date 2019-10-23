import React, { useState } from "react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import cookie from "js-cookie";

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products);
  const handleRemoveFromCart = async productId => {
    console.log({ productId });
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get("token");
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    };
    const { data } = await axios.delete(url, payload);
    console.log({ data });
    setCartProducts(data);
  };
  console.log(cartProducts);
  return (
    <Segment>
      <CartItemList
        products={cartProducts}
        user={user}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <CartSummary products={cartProducts} />
    </Segment>
  );
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const { data } = await axios.get(url, payload);
  console.log({ data });
  return { products: data };
};

export default Cart;
