import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import signupImage from "../../assets/login-image.jpg"; // Use same or another image
import logo from "../../assets/logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      toast.success("🎉 Account created successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Signup failed.");
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300 text-sm z-10"
      >
        ← Back to Home
      </button>

      {/* Left image section */}
      <div className="hidden md:flex w-1/2">
        <img
          src={signupImage}
          alt="Signup Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right form section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white px-8 py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center ">
            <img src={logo} alt="Logo" className=" h-12 mb-12" />
            <h2 className="text-xl font-semibold text-green-700">
              Create Account
            </h2>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                autoComplete="name"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
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
                autoComplete="new-password"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              state={{ from }}
              className="text-green-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </div>

          {/* Google Sign-in button */}
          <div className="mt-6">
            <div className="relative text-center mb-4 text-sm text-gray-500">
              <span className="px-2 bg-white relative z-10">
                or continue with
              </span>
              <div className="absolute left-0 top-1/2 w-full border-t border-gray-300 -z-10" />
            </div>

            <button
              onClick={handleGoogleSignup}
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span className="text-sm text-gray-700 font-medium">
                Sign up with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
