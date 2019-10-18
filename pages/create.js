import React, { useState } from "react";

import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from "semantic-ui-react";

function CreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    media: "",
    description: ""
  });

  const handleChange = event => {
    const { name, value, files } = event.target;
    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
    }
    setProduct(prevState => ({ ...prevState, [name]: value }));
  };
  console.log(product);
  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" /> Create New Product{" "}
      </Header>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Media"
            accept="image/*"
            content="Select Image"
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          color="blue"
          label="Name"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;
