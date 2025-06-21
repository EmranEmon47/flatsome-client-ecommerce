import React from "react";
import Nav from "../../Components/Shared/Nav";

const AllProducts = () => {
  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-white mt-24">
        {/* This is the AllProducts page */}
        <h1 className="text-2xl font-bold text-center my-8">All Products</h1>
        {/* You can add your product listing logic here */}
        {/* For now, this is just a placeholder */}
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-600 text-center">
            This page will display all products available in the store.
          </p>
          {/* You can map through your products and display them here */}
          {/* Example: */}
          {/* {products.map(product => (
            <ProductCard key={product.id} product={product} />
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
