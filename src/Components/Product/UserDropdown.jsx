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
      <button className="flex items-center gap-2 py-2 text-black dark:text-[#abddff]">
        {/* <img
          src={avatar}
          alt="User avatar"
          className="object-cover w-6 h-6 rounded-full"
        /> */}
        <span className="text-xs text-black dark:text-white">Hi!</span>{" "}
        {getFirstName()}
      </button>

      {/* Dropdown */}
      <ul className="absolute left-0 z-50 hidden w-40 border rounded shadow-lg backdrop-blur-lg bg-white/70 dark:bg-black/70 group-hover:block">
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-[#FF6347] text-black dark:text-white hover:text-white transition"
          >
            Profile
          </Link>
          <Link
            to="/profile/my-orders"
            className="block px-4 py-2 hover:bg-[#FF6347] text-black dark:text-white hover:text-white transition"
          >
            My Orders
          </Link>
        </li>
        {mongoUser?.role === "admin" && (
          <li>
            <Link
              to="/admin"
              className="block px-4 py-2 hover:bg-[#FF6347] text-black dark:text-white hover:text-white transition"
            >
              Admin Panel
            </Link>
          </li>
        )}
        <li>
          <button
            onClick={handleLogout}
            className="block px-4 w-full py-2 text-left hover:bg-[#FF6347] text-black dark:text-white hover:text-white transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
