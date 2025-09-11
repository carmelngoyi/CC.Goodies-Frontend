import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

const ProtectedRoute = ({ children }) => {
  const auth = isAuthenticated();

  if (!auth) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
