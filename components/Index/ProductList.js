import { Card } from "semantic-ui-react";

function ProductList({ products }) {
  const mapProductsToItems = products => {
    return products.map((product, index) => ({
      header: product.name,
      image: product.mediaUrl,
      meta: `$${product.price}`,
      color: "teal",
      fluid: true,
      childKey: index,
      href: `/product?_id=${product._id}`
    }));
  };
  return (
    <Card.Group
      stackable
      itemsPerRow="3"
      centered
      items={mapProductsToItems(products)}
    />
  );
}

export default ProductList;
