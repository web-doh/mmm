import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ children, isAuthenticated, ...props }) => (
  <Route
    {...props}
    render={(props) => (isAuthenticated ? children : <Redirect to="/" />)}
  />
);

export default PrivateRoute;
