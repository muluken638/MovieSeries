import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Component {...props} />
        ) : (
          <Navigate to={{ pathname: '/api/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;