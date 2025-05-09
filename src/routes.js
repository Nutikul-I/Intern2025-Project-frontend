import React from "react";
import { Routes, Route } from "react-router-dom";

import OrderHistory  from "./customers/components/OrderHistory";
import ProcessTwo    from "./customers/components/ProcessTwo";
import ProductDetail from "./customers/components/ProductDetail";
import HomePage      from "./customers/components/HomePage";

import Layout   from "./customers/pages/Layout";
import Loading  from "./page/loading";
import Login    from "./page/login";
import Register from "./page/register";

const AppRoutes = () => (
  <Routes>

    <Route path="/login"    element={<Login />} />
    <Route path="/register" element={<Register />} />


    <Route element={<Layout />}>
      <Route index             element={<Loading />} />
      <Route path="home"       element={<HomePage />} />
      <Route path="orderhistory" element={<OrderHistory />} />
      <Route path="processtwo" element={<ProcessTwo />} />
      <Route path="productdetail/:id" element={<ProductDetail />} />
    </Route>
  </Routes>

  
);

export default AppRoutes;
