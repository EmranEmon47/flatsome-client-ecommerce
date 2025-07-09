import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import loginImage from "../../assets/login-image.jpg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  // 🔹 Google login handler
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google sign-in failed.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {/* 🔙 Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute z-10 px-4 py-1 text-sm text-gray-800 bg-gray-200 rounded top-4 left-4 hover:bg-gray-300"
      >
        ← Back to Home
      </button>

      {/* Left image section */}
      <div className="hidden w-1/2 md:flex">
        <img
          src={loginImage}
          alt="Login Visual"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right form section */}
      <div className="flex flex-col items-center justify-center w-full px-8 py-12 bg-white md:w-1/2">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center ">
            <img src={logo} alt="Logo" className="h-12 mb-12 " />
            <h2 className="text-xl font-semibold text-green-700">
              Welcome Back
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                autoComplete="username"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 font-semibold text-white transition bg-green-600 rounded hover:bg-green-700"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              state={{ from }}
              className="font-medium text-green-600 hover:underline"
            >
              Sign up here
            </Link>
          </div>

          {/* 🔹 Google login button */}
          <div className="mt-6">
            <div className="relative mb-4 text-sm text-center text-gray-500">
              <span className="relative z-10 px-2 bg-white">
                or continue with
              </span>
              <div className="absolute left-0 w-full border-t border-gray-300 top-1/2 -z-10" />
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="flex items-center justify-center w-full gap-2 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
