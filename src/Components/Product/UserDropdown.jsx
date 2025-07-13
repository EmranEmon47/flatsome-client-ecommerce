import React from "react";
import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../Context/AuthContext";

const UserDropdown = () => {
  const { firebaseUser, mongoUser } = useAuth();

  const getFirstName = () => {
    const fullName =
      mongoUser?.name || firebaseUser?.displayName || firebaseUser?.email;
    if (!fullName) return "User";
    return fullName.includes("@")
      ? fullName.split("@")[0]
      : fullName.split(" ")[0];
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  //   const avatar = firebaseUser?.photoURL || "/default-avatar.png";

  return (
    <div className="relative hidden text-sm font-semibold text-gray-500 group lg:block">
      <button className="flex items-center gap-2 py-2 text-black dark:text-amber-500">
        {/* <img
          src={avatar}
          alt="User avatar"
          className="object-cover w-6 h-6 rounded-full"
        /> */}
        {getFirstName()}
      </button>

      {/* Dropdown */}
      <ul className="absolute right-0 z-50 hidden w-40 bg-white border rounded shadow-md group-hover:block">
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile
          </Link>
        </li>
        {mongoUser?.role === "admin" && (
          <li>
            <Link
              to="/admin"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Admin Panel
            </Link>
          </li>
        )}
        <li>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
