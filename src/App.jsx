import React from "react";
import Home from "./pages/Home/Home";
import { CardView } from "./pages/Home/CardView";
import FeaturedProducts from "./pages/Home/FeaturedProducts";

const App = () => {
  return (
    <div>
      <Home />
      <CardView />
      <FeaturedProducts />/
    </div>
  );
};

export default App;
