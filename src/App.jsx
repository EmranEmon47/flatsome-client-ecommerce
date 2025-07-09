// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Home from "./pages/Home/Home.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import ProtectedRoute from "./Components/Protected/ProtectedRoute.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import CartView from "./pages/Cart/CartView.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import OrderComplete from "./pages/OrderComplete/OrderComplete.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import AllProducts from "./pages/AllProduct/AllProducts.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import RequireAdmin from "./pages/Auth/RequireAdmin.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartView />} />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-complete"
              element={
                <ProtectedRoute>
                  <OrderComplete />
                </ProtectedRoute>
              }
            />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aboutUs" element={<AboutUs />} />

            <Route path="*" element={<NotFound />} />
            {/* admin */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
          </Routes>
        </Router>

        <Toaster position="top-right" reverseOrder={false} />
      </Elements>
    </AuthProvider>
  );
}

export default App;
