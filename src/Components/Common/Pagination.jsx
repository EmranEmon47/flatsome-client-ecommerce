// src/Components/Common/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 border text-sm rounded ${
            page === currentPage
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
