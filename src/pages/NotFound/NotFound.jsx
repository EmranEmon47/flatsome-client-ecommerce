import React from "react";
import { Link } from "react-router";
import NotFoundImage from "../../assets/404image.jpg";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center ">
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="w-2/3 max-w-full mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        <span className="text-red-400">Oops!</span> The page you're looking for
        doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
