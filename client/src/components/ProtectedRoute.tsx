import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{children: JSX.Element}> = ({ children }) => {
//TODO:   const isAuthenticated = logic to determine if user is authenticated;
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
