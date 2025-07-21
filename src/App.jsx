// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState, useEffect } from "react";
import SplashScreen from "./Components/Shared/SplashScreen.jsx";

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
import AdminDashboard from "./pages/admin/dashboard/DashboardHome.jsx";
import RequireAdmin from "./pages/Auth/RequireAdmin.jsx";
import AdminLayout from "./pages/admin/layout/AdminLayout.jsx";
import DashboardHome from "./pages/admin/dashboard/DashboardHome.jsx";
import AddProduct from "./pages/admin/products/AddProduct.jsx";
import UpdateProduct from "./pages/admin/products/UpdateProduct.jsx";
import AdminAllProducts from "./pages/admin/products/AdminAllProducts.jsx";
import AdminAllUsers from "./pages/admin/Users/AdminAllUsers.jsx";
import ManageOrders from "./pages/admin/Orders/ManageOrders.jsx";
import OrderDetails from "./pages/admin/Orders/OrderDetails.jsx";
import Blogs from "./pages/Blogs/Blogs.jsx";
import UserLayout from "./pages/user/UserLayout.jsx";
import Profile from "./pages/user/Profile.jsx";
import MyOrders from "./pages/user/MyOrders.jsx";
import UserOrderDetails from "./pages/user/UserOrderDetails.jsx";
import InvoiceGenerator from "./pages/user/InvoiceDownload.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000); // start fade out after 2s
    const unmountTimer = setTimeout(() => setLoading(false), 2500); // unmount splash after fade
    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (loading) return <SplashScreen fadeOut={fadeOut} />;
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          {/* <Route path="/blogs/:id" element={<BlogDetail />} /> */}
          <Route path="/cart" element={<CartView />} />

          {/* 🛡️ Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserLayout />}>
              <Route index element={<Profile />} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="user-orders/:id" element={<UserOrderDetails />} />
            </Route>
          </Route>

          {/* <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            /> */}

          <Route path="/checkout" element={<Checkout />} />

          {/* <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            /> */}
          <Route
            path="/payment/:orderId"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />

          <Route path="/test-payment/:orderId" element={<Payment />} />

          <Route path="/order-complete/:orderId" element={<OrderComplete />} />

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
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<DashboardHome />} /> {/* default route */}
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/all" element={<AdminAllProducts />} />
            <Route path="products/update/:id" element={<UpdateProduct />} />
            <Route path="users" element={<AdminAllUsers />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/orders/:id" element={<OrderDetails />} />
          </Route>
        </Routes>
      </Router>

      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;
