import { Header, Icon, Segment, Labal } from "semantic-ui-react";

function AccountHeader({ role, email, name, createdAt }) {
  return (
    <Segment>
      <Label
        color="teal"
        size="large"
        ribbon
        icon="privacy"
        style={{ textTransform: "capitalize" }}
        content={role}
      />
      <Header inverted textAlign="center" as="h1" icon>
        <Icon name="user" />
        {name}
        <Header.Subheader>{email}</Header.Subheader>
        <Header.Subheader>Joined {createdAt}</Header.Subheader>
      </Header>
    </Segment>
  );
}

export default AccountHeader;
