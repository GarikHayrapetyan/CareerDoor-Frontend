import React from "react";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import GetTogetherDashboard from "../../features/gettogethers/dashboard/GetTogetherDashboard";
import GetTogetherDetails from '../../features/gettogethers/details/GetTogetherDetails';
import TestErrors from "../../features/gettogethers/errors/TestErrors";
import NavBar from "./NavBar";

function App() {

  return (
    <>
      <ToastContainer hideProgressBar/>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
          {/* <GetTogetherDashboard />   */}
          <GetTogetherDetails /> 
          {/* <TestErrors/> */}
      </Container>
    </>
  );
}

export default App;
