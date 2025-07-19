import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../Context/AuthContext";

const ProtectedRoute = () => {
  const { firebaseUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // or spinner component
  }

  if (!firebaseUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
