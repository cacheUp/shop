import React, { useEffect } from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";

function Home({ products }) {
  return <ProductList products={products} />;
}

Home.getInitialProps = async ctx => {
  console.log(ctx.query);
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 9;
  const payload = { params: { page, size } };
  const url = `${baseUrl}/api/products`;
  const { data } = await axios.get(url, payload);
  return { products: data };
};

export default Home;
