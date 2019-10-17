import React, { useEffect } from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";

function Home({ products }) {
  return <ProductList products={products} />;
}

Home.getInitialProps = async () => {
  const url = "http://localhost:3000/api/products";
  const { data } = await axios.get(url);
  return { products: data };
};

export default Home;
