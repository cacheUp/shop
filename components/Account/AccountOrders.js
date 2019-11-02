import {
  Header,
  Accordion,
  Label,
  Icon,
  Button,
  List,
  Image,
  Segment
} from "semantic-ui-react";
import { formatDate } from "../../utils/formatDate";
import { useRouter } from "next/router";

function AccountOrders({ orders }) {
  const router = useRouter();
  console.log(orders);

  const mapOrdersToPanels = orders => {
    console.log(orders);
    return orders.map((order, index) => ({
      key: index,
      title: {
        content: <Label color="blue" content={formatDate(order.createdAt)} />
      },
      content: {
        content: (
          <>
            {" "}
            <List.Header as="h3">
              Total: ${order.total}
              <Label
                content={order.email}
                icon="mail"
                basic
                horizontal
                style={{ marginLeft: "1em" }}
              />
            </List.Header>
            <List key={orders._id}>
              {order.products.map((product, index) => (
                <List.Item>
                  <Image avatar src={product.product.mediaUrl} />
                  <List.Content>
                    <List.Header>{product.product.name}</List.Header>
                    <List.Description>
                      {product.quantity} • ${product.product.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <Label tag color="red" size="tiny">
                      {product.product.sku}
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </>
        )
      }
    }));
  };

  return (
    <>
      <Header as="h2">
        <Icon name="folder open" />
        Order History
      </Header>

      {orders.length === 0 ? (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline" />
            No past orders
          </Header>
          <div>
            <Button onClick={() => router.push("/")} color="orange">
              View Products
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion
          fluid
          styled
          exclusive={false}
          panels={mapOrdersToPanels(orders)}
        />
      )}
    </>
  );
}

export default AccountOrders;
