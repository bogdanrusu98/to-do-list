// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './userContext';

const PrivateRoute = ({ children }) => {
  const user = useUser();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default PrivateRoute;
