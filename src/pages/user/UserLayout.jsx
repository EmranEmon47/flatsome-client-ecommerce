import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import Nav from "../../Components/Shared/Nav";
import { useAuth } from "../../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { FaUserCircle } from "react-icons/fa";

const UserLayout = () => {
  const { firebaseUser, mongoUser } = useAuth();
  const navigate = useNavigate();

  const name =
    mongoUser?.name ||
    firebaseUser?.displayName ||
    firebaseUser?.name ||
    "User";
  const photo = mongoUser?.profileImage;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="relative flex min-h-screen pt-20 bg-gray-100 dark:bg-black">
        {/* Sidebar */}
        <aside className="flex flex-col justify-between fixed left-0 bottom-0 w-64 px-4 py-8 bg-white shadow-lg h-[450px] dark:bg-gray-900">
          <div>
            {/* Greeting Section */}
            <div className="flex flex-col items-center gap-3 pb-6 border-b border-gray-300 dark:border-gray-700">
              {photo ? (
                <img
                  src={photo}
                  alt="User"
                  className="object-cover w-12 h-12 rounded-full"
                />
              ) : (
                <FaUserCircle className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              )}
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">Hi,</p>
                <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
                  {name}
                </h2>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 mt-6">
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-[#FF6347] px-3 py-2 rounded"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded"
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/profile/my-orders"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-[#FF6347] px-3 py-2 rounded"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded"
                }
              >
                My Orders
              </NavLink>
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 mt-6 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserLayout;
