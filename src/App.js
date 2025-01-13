import React from "react";
import { Routes, Route } from "react-router-dom";

import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
       </Routes>
    </div>
  );
};

export default App;
