import React from "react";
import { Container } from "semantic-ui-react";
import GetTogetherDashboard from "../../features/gettogethers/dashboard/GetTogetherDashboard";
import GetTogetherDetails from '../../features/gettogethers/details/GetTogetherDetails';
import NavBar from "./NavBar";

function App() {

  const defaultValue = {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    title: 'Work Shop',
    description: 'This meeting is about Web Development',
    date: '2021-04-05',
    link: 'zoom.com',
    passCode: 'SHJ65E'
  };
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
          <GetTogetherDashboard />  
          {/* <GetTogetherDetails meeting={defaultValue}/>  */}
      </Container>
    </>
  );
}

export default App;
