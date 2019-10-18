import axios from "axios";

function Product({ product }) {
  console.log(product);
  return <>product</>;
}

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `http://localhost:3000/api/product`;
  const payload = { params: { _id } };
  const { data } = await axios.get(url, payload);
  return { product: data };
};

export default Product;
