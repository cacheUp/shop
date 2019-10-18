import axios from "axios";

function Product(props) {
  return <>product</>;
}

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `http//localhost:3000/api/product`;
  const payload = { params: { _id } };
  const { data } = await axios.get(url, payload);
};

export default Product;
