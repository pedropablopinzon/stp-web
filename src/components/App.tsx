import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Signup from './Signup';
import { AuthProvider } from '../contexts/AuthContext';

// import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Home from './Home';
// import Home from '../screens/Home'
import CheckInOut from '../screens/CheckInOut';
import { Projects } from '../screens/Projects';
import { Business } from '../screens/Business';
import { ProgressLog } from '../screens/ProgressLog';
import Navigationbar from './ui/Navigationbar';

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
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/checkInOut" component={CheckInOut} />
              <PrivateRoute path="/projects" component={Projects} />
              <PrivateRoute path="/business" component={Business} />
              <PrivateRoute path="/progressLog" component={ProgressLog} />

              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
        {/* </div> */}
      </Container>
    </>
  );
}

export default App;
