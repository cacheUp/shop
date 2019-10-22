import { Card } from "semantic-ui-react";
import uuidv4 from "uuid/v4";

function ProductList({ products }) {
  const mapProductsToItems = products => {
    return products.map((product, index) => ({
      header: product.name,
      image: product.mediaUrl,
      meta: `$${product.price}`,
      color: "teal",
      fluid: true,
      key: index,

      href: `/product?_id=${product._id}`
    }));
  };
  return (
    <Card.Group
      key={uuidv4()}
      stackable
      itemsPerRow="3"
      centered
      items={mapProductsToItems(products)}
    />
  );
}

export default ProductList;
