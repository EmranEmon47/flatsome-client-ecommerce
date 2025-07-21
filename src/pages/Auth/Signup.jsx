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
import signupImage from "../../assets/login-image.jpg";
import logo from "../../assets/logo.png";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!firstName.trim()) {
      toast.error("Please enter your first name.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Update Firebase displayName using first + last name concatenated (optional)
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`.trim(),
      });

      // 3. Sync user with backend MongoDB
      try {
        await axios.post("http://localhost:5000/api/users", {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        });
      } catch (backendError) {
        console.error(
          "Failed to create user in backend:",
          backendError.response?.data || backendError
        );
        toast.error("Signup succeeded but failed to sync profile.");
      }

      toast.success("🎉 Account created successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Signup failed.");
    }

    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // Split displayName into firstName and lastName
      const names = (user.displayName || "").trim().split(" ");
      const firstName = names[0] || "";
      const lastName = names.length > 1 ? names.slice(1).join(" ") : "";

      // Sync user with backend
      try {
        await axios.post("http://localhost:5000/api/users", {
          uid: user.uid,
          email: user.email,
          firstName,
          lastName,
        });
      } catch (backendError) {
        console.error(
          "Failed to create user in backend:",
          backendError.response?.data || backendError
        );
        toast.error("Google sign-in succeeded but failed to sync profile.");
      }

      toast.success("Signed in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google sign-in failed.");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="absolute z-10 px-4 py-1 text-sm text-gray-800 bg-gray-200 rounded top-4 left-4 hover:bg-gray-300"
      >
        ← Back to Home
      </button>

      <div className="hidden lg:flex lg:w-1/2">
        <img
          src={signupImage}
          alt="Signup Visual"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full px-8 py-12 bg-white lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center ">
            <img src={logo} alt="Logo" className="h-12 mb-12 " />
            <h2 className="text-xl font-semibold text-green-700">
              Create Account
            </h2>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                autoComplete="given-name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                autoComplete="family-name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
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
                autoComplete="new-password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
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
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-semibold text-white rounded ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              state={{ from }}
              className="font-medium text-green-600 hover:underline"
            >
              Login here
            </Link>
          </div>

          <div className="mt-6">
            <div className="relative mb-4 text-sm text-center text-gray-500">
              <span className="relative z-10 px-2 bg-white">
                or continue with
              </span>
              <div className="absolute left-0 w-full border-t border-gray-300 top-1/2 -z-10" />
            </div>

            <button
              onClick={handleGoogleSignup}
              type="button"
              disabled={loading}
              className={`flex items-center justify-center w-full gap-2 py-2 border border-gray-300 rounded ${
                loading ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"
              }`}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">
                {loading ? "Please wait..." : "Sign up with Google"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
