import React, { useEffect } from "react";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import Link from "next/link";

const INITIAL_USER = {
  name: "",
  email: "",
  password: ""
};

function Signup() {
  const [user, setUser] = React.useState({ INITIAL_USER });

  useEffect(() => {}, [user]);

  const handleChange = event => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Message
        attached
        icon="settings"
        header="Get Started!"
        content="Create a new account"
        color="teal"
      />

      <Form>
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={user.name}
          />
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            type="email"
            label="Email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={user.email}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
          <Button icon="signup" type="submit" color="orange" content="Signup" />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" /> Existing User?{" "}
        <Link href="/login">
          <a>Login here</a>
        </Link>{" "}
        instead
      </Message>
    </>
  );
}

export default Signup;
