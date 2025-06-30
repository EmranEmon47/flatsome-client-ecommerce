import React from "react";
import Nav from "../../Components/Shared/Nav";

const AboutUs = () => {
  return (
    <div>
      <Nav />

      <div className="container px-4 py-8 mx-auto mt-20">
        <h1 className="mb-4 text-3xl font-bold">About Us</h1>
        <p className="mb-4 text-lg">
          Welcome to our e-commerce platform! We are dedicated to providing you
          with the best online shopping experience.
        </p>
        <p className="mb-4 text-lg">
          Our mission is to offer a wide range of high-quality products at
          competitive prices, while ensuring excellent customer service.
        </p>
        <p className="mb-4 text-lg">
          Thank you for choosing us for your shopping needs!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
