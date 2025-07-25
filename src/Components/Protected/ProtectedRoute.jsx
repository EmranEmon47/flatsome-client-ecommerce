import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

const ProtectedRoute = () => {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [mongoUser, setMongoUser] = useState(null);
  const [mongoLoading, setMongoLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchMongoUser = async () => {
      if (!firebaseUser) return;

      try {
        const token = await firebaseUser.getIdToken(); // ✅ Get token directly
        const res = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  // Show loading state while Firebase or MongoDB user is loading
  if (authLoading || mongoLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!firebaseUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Show error if MongoDB user failed to load
  if (!mongoUser) {
    return <div>Failed to load user data. Please try again.</div>;
  }

  // Authenticated and user data loaded
  return <Outlet />;
};

export default ProtectedRoute;
