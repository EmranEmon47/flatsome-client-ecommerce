import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "./Context/ThemeProvider";
import { CartProvider } from "./Context/CartProvider";
import { WishlistProvider } from "./Context/WishlistContext";
import { AuthProvider } from "./Context/AuthContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
