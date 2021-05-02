import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import GetTogetherDashboard from "../../features/gettogethers/dashboard/GetTogetherDashboard";
import GetTogetherDetails from "../../features/gettogethers/details/GetTogetherDetails";
import TestErrors from "../../features/gettogethers/errors/TestErrors";
import GetTogetherForm from "../../features/gettogethers/form/GetTogetherForm";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";

function App() {
  const location = useLocation();
  
  return (
    <>
      <ToastContainer hideProgressBar />
      <Route exact path="/" component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/meetings" component={GetTogetherDashboard} />
                <Route exact path="/meetings/:id" component={GetTogetherDetails} />
                <Route exact key={location.key} path={["/createmeeting", "/manage/:id"]} component={GetTogetherForm} />
                <Route exact path="/errors" component={TestErrors} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
