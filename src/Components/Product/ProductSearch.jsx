import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const [input, setInput] = useState(searchTerm || "");
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(input);
      if (input) {
        params.set("search", input);
      } else {
        params.delete("search");
      }
      setParams(params);
    }, 400); // debounce
    return () => clearTimeout(timeout);
  }, [input]);

  const clearSearch = () => {
    setInput("");
    setSearchTerm("");
    params.delete("search");
    setParams(params);
  };

  return (
    <div className="relative w-full mb-4">
      <input
        type="text"
        placeholder="Search your products..."
        className="w-full py-2 pl-4 pr-10 text-black transition-all duration-200 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-white/10 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff7860] caret-black dark:caret-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {input && (
        <button
          onClick={clearSearch}
          aria-label="Clear search"
          className="absolute text-gray-500 transition -translate-y-1/2 right-2 top-1/2 hover:text-red-500"
        >
          <XMarkIcon className="w-5 h-5 bg-gray-200 rounded-full" />
        </button>
      )}
    </div>
  );
};

export default ProductSearch;
