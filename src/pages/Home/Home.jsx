import React from "react";
import Nav from "../../Components/Shared/Nav.jsx";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts.jsx";
import { CardView } from "./CardView.jsx";

const Home = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <CardView />
      <FeaturedProducts />/
    </div>
  );
};

export default Home;
