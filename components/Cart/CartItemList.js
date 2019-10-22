import { Header, Segment, Button, Icon } from "semantic-ui-react";

function CartItemList({ user, products }) {
  if (products.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No products in your cart. Add some!
        </Header>

        <div>
          {" "}
          {user ? (
            <Button color="orange">View Products</Button>
          ) : (
            <Button color="blue">Login To Add Products</Button>
          )}
        </div>
      </Segment>
    );
  }
}

export default CartItemList;
