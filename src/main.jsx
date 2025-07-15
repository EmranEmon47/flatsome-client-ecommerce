// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "./Context/ThemeProvider";
import { CartProvider } from "./Context/CartProvider";

import "./index.css";
import { WishlistProvider } from "./Context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>
);
