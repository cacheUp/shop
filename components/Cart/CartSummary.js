import { Button, Segment, Divider } from "semantic-ui-react";
import React, { useState, useEffect } from "react";

function CartSummary({ products }) {
  const [isCartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong>$0.00
        <Button
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
          disabled={isCartEmpty}
        />
      </Segment>
    </>
  );
}

export default CartSummary;
