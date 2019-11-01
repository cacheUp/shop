import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import { Header, Checkbox, Table, Icon } from "semantic-ui-react";

function AccountPermissions() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  });

  const getUsers = async () => {
    const url = `${baseUrl}/api/users`;
    const token = cookie.get("token");
    const payload = { headers: { Authorization: token } };
    const { data } = await axios.get(url, payload);
    setUsers(data);
  };
  return (
    <div style={{ margin: "2em 0" }}>
      <Header as="h2">
        <Icon name="settings" />
        User Permissions
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <UserPermission key={user._id} user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function UserPermission({ user }) {
  const [admin, setAdmin] = useState(user.role == "admin");
  const handleChangePermission = () => {
    setAdmin(prevState => !prevState);
  };
  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox toggle onChange={handleChangePermission} />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.createdAt}</Table.Cell>
      <Table.Cell>{user.updatedAt}</Table.Cell>
      <Table.Cell>{admin ? "admin" : "user"}</Table.Cell>
    </Table.Row>
  );
}

export default AccountPermissions;
