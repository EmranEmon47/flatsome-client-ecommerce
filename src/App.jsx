// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster

import Home from "./pages/Home/Home.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import ProtectedRoute from "./Components/Protected/ProtectedRoute.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;
