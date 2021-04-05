import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Menu.Item
        name="CareerDoor"
        style={{ marginLeft: "8em", marginRight: "0px", fontSize: "22px" }}
      />
      <Container>
        <Menu.Item name="Home" />
        <Menu.Item name="Jobs" />
        <Menu.Item name="Events" />
        <Menu.Item>
          <Button positive content="Create event" floated="right" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
