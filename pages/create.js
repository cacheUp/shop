import React, { useState, useEffect } from "react";
import catchErrors from "../utils/catchErrors";
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
import axios from "axios";
import baseUrl from "../utils/baseUrl";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [success, setSuccess] = useState(false);
  const [mediaPreview, setMediaPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  const handleChange = event => {
    const { name, value, files } = event.target;
    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageUpload = async () => {
    try {
      const data = new FormData();
      data.append("file", product.media);
      data.append("upload_preset", "cacheupshop");
      data.append("cloud_name", "cloud-9");
      const response = await axios.post(process.env.CLOUDINARY_URL, data);
      const mediaUrl = response.data.url;

      return mediaUrl;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async event => {
    try {
      const { name, description, price } = product;
      event.preventDefault();
      setError("");
      setLoading(true);
      const mediaUrl = await handleImageUpload();

      const url = `${baseUrl}/api/product`;
      const payload = { name, description, price, mediaUrl };
      const res = await axios.post(url, payload);

      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (err) {
      catchErrors(err, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" /> Create New Product{" "}
      </Header>
      <Form
        loading={loading}
        success={success}
        onSubmit={handleSubmit}
        error={Boolean(error)}
      >
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Message error header="Oops!" content={error} />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            onChange={handleChange}
            value={product.name}
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
            value={product.price}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Media"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
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
