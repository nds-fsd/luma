import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, userRole, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
