import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

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
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 border border-gray-300 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {input && (
        <button
          onClick={clearSearch}
          className="px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default ProductSearch;
