import React from "react";
import { Container } from "semantic-ui-react";
import GetTogetherDashboard from "../../features/gettogethers/GetTogetherDashboard";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <GetTogetherDashboard />
      </Container>
    </>
  );
}

export default App;
