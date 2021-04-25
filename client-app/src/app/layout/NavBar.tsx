import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

  return (
    <Menu inverted fixed="top">
      <Container>
      <Menu.Item
        name="CareerDoor"
        style={{ marginLeft: "2em", marginRight: "0px", fontSize: "22px" }}
      />
        <Menu.Item name="Jobs" />
        <Menu.Item name="Events" />
        <Menu.Item>
          <Button positive content="Create event" floated="right" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
