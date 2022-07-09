import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

// @ts-ignore
export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};
