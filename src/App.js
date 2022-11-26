// import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import Missing from "./pages/Missing";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Cart from "./redux/features/cart/Cart";
import Category from "./pages/Category";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/products/search" element={<SearchResults />} />
          <Route path="/products/category/*" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
