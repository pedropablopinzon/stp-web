import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";

// import { Dashboard } from './Dashboard';
import { AppVersion } from "./AppVersion";
import { Login } from "./Login";
import { PrivateRoute } from "./PrivateRoute";
import { ForgotPassword } from "./ForgotPassword";
import { UpdateProfile } from "./UpdateProfile";
import { UpdatePassword } from "./UpdatePassword";
import { Home } from "./Home";
import { Navigationbar } from "./ui/Navigationbar";
import { CheckInOut } from "../screens/CheckInOut";
import { Projects } from "../screens/Projects";
import { Businesses } from "../screens/Businesses";
import { ProgressLog } from "../screens/ProgressLog";
import { ExpenseRecord } from "../screens/ExpenseRecord";
import { Profile } from "../screens/Profile";
import { BusinessUsers } from "../screens/BusinessUsers";
import { ProjectReport } from "../screens/ProjectReport";

function App() {
  return (
    <>
      {/* <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}> */}
      <Container>
        {/* <div className="w-100" style={{ maxWidth: '400px' }}> */}
        <Router>
          <AuthProvider>
            <Navigationbar />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute
                path="/update-password"
                component={UpdatePassword}
              />
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/checkInOut" component={CheckInOut} />
              <PrivateRoute path="/projects" component={Projects} />
              <PrivateRoute path="/businesses" component={Businesses} />
              <PrivateRoute path="/progressLog" component={ProgressLog} />
              <PrivateRoute path="/expenseRecord" component={ExpenseRecord} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute
                path="/businessUsers/:businessId/"
                component={BusinessUsers}
              />
              <PrivateRoute
                path="/projectReport/:projectId/"
                component={ProjectReport}
              />

              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
            <AppVersion />
          </AuthProvider>
        </Router>
        {/* </div> */}
      </Container>
    </>
  );
}

export default App;
