import React from "react";
import { Navigate, useLocation } from "react-router";
import { auth } from "../../firebase"; // your firebase config import

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Check if user is logged in via Firebase auth
  const user = auth.currentUser;

  if (!user) {
    // Not logged in → redirect to login with state to remember where user wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is logged in → render the requested page
  return children;
};

export default ProtectedRoute;
