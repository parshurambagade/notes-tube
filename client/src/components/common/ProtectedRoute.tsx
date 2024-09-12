import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";

const ProtectedRoute: React.FC<{children: JSX.Element}> = ({ children }) => {
  const {isAuthenticated} = useAuthContext();

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
