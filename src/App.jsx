// App.jsx or main router file
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Home from "./pages/Home/Home.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
