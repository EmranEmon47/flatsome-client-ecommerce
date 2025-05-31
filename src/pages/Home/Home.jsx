import React from "react";
import Nav from "../../Components/Shared/Nav.jsx";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts.jsx";
import { CardView } from "./CardView.jsx";
import BestSelling from "./BestSelling.jsx";
import BrowseCategories from "./BrowseCategories.jsx";
import Services from "./Services.jsx";
import Testimonial from "./Testimonial.jsx";
import News from "./News.jsx";

const Home = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <CardView />
      <FeaturedProducts />/
      <BestSelling />
      <BrowseCategories />
      <Services />
      <Testimonial />
      <News />
    </div>
  );
};

export default Home;
