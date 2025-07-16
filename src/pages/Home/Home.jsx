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
import Footer from "../../Components/Shared/Footer.jsx";
// import { useEffect } from "react";
// import { useAuth } from "../../Context/AuthContext.jsx";

const Home = () => {
  // const { firebaseUser, mongoUser } = useAuth();

  // useEffect(() => {
  //   console.log("📦 Firebase User:", firebaseUser);
  //   console.log("🧠 MongoDB User:", mongoUser);
  // }, [firebaseUser, mongoUser]);
  return (
    <div className="text-gray-800 bg-white dark:bg-black dark:text-white">
      <Nav />
      <Hero />
      <CardView />
      <FeaturedProducts />/
      <BestSelling />
      <BrowseCategories />
      <Services />
      <Testimonial />
      <News />
      <Footer />
    </div>
  );
};

export default Home;
