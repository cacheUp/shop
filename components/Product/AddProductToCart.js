import React, { useState } from "react";
import { Input } from "semantic-ui-react";

function AddProductToCart({ user }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Input
      type="number"
      min="1"
      value={quantity}
      onChange={event => setQuantity(Number(event.target.value))}
      placeholder="Quantity"
      action={
        user
          ? { color: "orange", content: "Add to Cart", icon: "plus cart" }
          : { color: "blue", content: "Sign Up To Purchase", icon: "signup" }
      }
    />
  );
}

export default AddProductToCart;
