import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loading from "./page/loading";
import Login from "./page/login";
import HomePage from "./customers/components/HomePage"
import Layout from "./customers/pages/Layout";
import AllProduct from "./customers/components/AllProduct";
import ShoppingCart from "./customers/components/ShoppingCart";
import EditInfo from "./customers/components/EditInfo";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route element={<Layout />}>
      <Route path="/" element={<Loading />} />
      <Route path="home" element={<HomePage />} />
      <Route path="allproduct" element={<AllProduct />} />
      <Route path="shoppingcart" element={<ShoppingCart />} />
      <Route path="editinfo" element={<EditInfo />} />
    </Route>

  </Routes>
);

export default AppRoutes;
