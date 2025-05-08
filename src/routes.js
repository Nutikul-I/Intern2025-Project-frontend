import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderHistory from "./customers/components/OrderHistory";
import Loading from "./page/loading";
import Login from "./page/login";
<<<<<<< HEAD
import Layout from  "../src/customers/pages/Layout";


=======
import HomePage from "./customers/components/HomePage"
import Layout from "./customers/pages/Layout";
import ProductDetail from "./customers/components/ProductDetail";
>>>>>>> 883f3c5c560bff316920518c645adb2f1d98981d

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
<<<<<<< HEAD

    <Route element={<Layout/>}>
      <Route path="/" element={<Loading />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
    </Route>


=======
    <Route element={<Layout />}>
      <Route path="/" element={<Loading />} />
      <Route path="home" element={<HomePage />} />
      <Route path="product/:id" element={<ProductDetail />} />
    </Route>
>>>>>>> 883f3c5c560bff316920518c645adb2f1d98981d
  </Routes>

);






export default AppRoutes;
