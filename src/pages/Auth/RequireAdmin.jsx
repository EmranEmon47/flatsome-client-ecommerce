// src/pages/Auth/RequireAdmin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

const RequireAdmin = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.error("Please login first");
        navigate("/login", { state: { from: location }, replace: true });
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const res = await axiosInstance.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.role === "admin") {
          setIsAdmin(true);
        } else {
          toast.error("Access denied. Not an admin.");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        toast.error("Access denied.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  if (loading) {
    return <div className="p-6 text-center">Checking for admin access...</div>;
  }

  return isAdmin ? children : null;
};

export default RequireAdmin;
