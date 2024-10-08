import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('access_token'); 

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default ProtectedRoute;
