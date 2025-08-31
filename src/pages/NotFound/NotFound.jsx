import React from "react";
import { Link } from "react-router";
import NotFoundImage from "../../assets/404image.jpg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2 text-center bg-gray-100 ">
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="w-2/3 max-w-full mb-6"
      />
      <h1 className="mb-2 text-3xl font-bold">404 Page Not Found</h1>
      <p className="mb-6 text-gray-600">
        <span className="text-red-400">Oops!</span> The page you're looking for
        doesn't exist.
      </p>
      <p>Try another page </p>
      <Link
        to="/"
        className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Go Back Home
      </Link>
      <Link
        to="/all-products"
        className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default NotFound;
