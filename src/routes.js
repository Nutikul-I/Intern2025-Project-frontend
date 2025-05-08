import React from "react";
import { Routes, Route } from "react-router-dom";

import OrderHistory from "./customers/components/OrderHistory";
import ProcessTwo from "./customers/components/ProcessTwo";
import ProductDetail from "./customers/components/ProductDetail";
import HomePage from "./customers/components/HomePage";

import Layout from "./customers/pages/Layout";
import Loading from "./page/loading";
import Login from "./page/login";
import Register from "./page/register";
import AllProduct from "./customers/components/AllProduct";
import ShoppingCart from "./customers/components/ShoppingCart";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route element={<Layout />}>
      <Route index element={<Loading />} />
      <Route path="/" element={<Loading />} />
      <Route path="home" element={<HomePage />} />
      <Route path="orderhistory" element={<OrderHistory />} />
      <Route path="processtwo" element={<ProcessTwo />} />
      <Route path="productdetail/:id" element={<ProductDetail />} />
      <Route path="allproduct" element={<AllProduct />} />
      <Route path="shoppingcart" element={<ShoppingCart />} />
    </Route>

  </Routes>
);

export default AppRoutes;
