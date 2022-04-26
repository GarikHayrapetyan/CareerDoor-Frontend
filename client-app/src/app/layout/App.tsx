import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import GetTogetherDashboard from "../../features/gettogethers/dashboard/GetTogetherDashboard";
import GetTogetherDetails from "../../features/gettogethers/details/GetTogetherDetails";
import TestErrors from "../../features/gettogethers/errors/TestErrors";
import GetTogetherForm from "../../features/gettogethers/form/GetTogetherForm";
import HomePage from "../../features/home/HomePage";
import JobDashboard from "../../features/jobs/JobDashboard";
import ProfilePage from "../../features/profiles/ProfilePage";
import LoginForm from "../../features/users/LoginForm";
import ResetPasswordForm from "../../features/users/ResetPasswordForm";
import ModalContainer from "../common/modals/ModalContainer";
import { useStore } from "../store/store";
import NavBar from "./NavBar";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  // if(!commonStore.appLoaded) return <LoadingComponent content='Loading app ...'/>

  return (
    <>
      <ToastContainer hideProgressBar />
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/jobs" component={JobDashboard} />
                <Route exact path="/meetings" component={GetTogetherDashboard} />
                <Route exact path="/meetings/:id" component={GetTogetherDetails} />
                <Route exact key={location.key} path={["/createmeeting", "/manage/:id"]} component={GetTogetherForm} />
                <Route exact path='/profiles/:username' component={ProfilePage} />
                <Route exact path="/errors" component={TestErrors} />
                <Route path="/login" component={LoginForm} />
                <Route path="/resetpassword" component={ResetPasswordForm} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
