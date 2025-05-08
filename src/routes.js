import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderHistory from "./customers/components/OrderHistory";
import Loading from "./page/loading";
import Login from "./page/login";
import Layout from  "../src/customers/pages/Layout";
import HomePage from "./customers/components/HomePage"
import ProductDetail from "./customers/components/ProductDetail";


const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route element={<Layout/>}>
      <Route path="/" element={<Loading />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="home" element={<HomePage />} />
      <Route path="product/:id" element={<ProductDetail />} />
    </Route>

  </Routes>

);






export default AppRoutes;
