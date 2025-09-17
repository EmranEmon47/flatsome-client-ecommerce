import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../api/axiosInstance"; // use your custom axios

const ProtectedRoute = () => {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [mongoUser, setMongoUser] = useState(null);
  const [mongoLoading, setMongoLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchMongoUser = async () => {
      if (!firebaseUser) return;

      try {
        const res = await axiosInstance.get("/users/me"); //  No need to manually set token
        setMongoUser(res.data);
      } catch (err) {
        console.error("Failed to fetch MongoDB user:", err);
        setMongoUser(null);
      } finally {
        setMongoLoading(false);
      }
    };

    fetchMongoUser();
  }, [firebaseUser]);

  if (authLoading || mongoLoading) {
    return <div>Loading...</div>;
  }

  if (!firebaseUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!mongoUser) {
    return <div>Failed to load user data. Please try again.</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
