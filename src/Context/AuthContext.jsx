import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (user) {
        try {
          const token = await user.getIdToken(true); // Force refresh token

          const res = await axiosInstance.get("/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setMongoUser(res.data);
          console.log("✅ Synced user from MongoDB:", res.data);
        } catch (err) {
          console.error("❌ Error syncing MongoDB user:", err);
          setMongoUser(null);
        }
      } else {
        setMongoUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, mongoUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
