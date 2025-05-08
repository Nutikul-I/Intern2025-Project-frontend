import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderHistory from "./customers/components/OrderHistory";
import Loading from "./page/loading";
import Login from "./page/login";
import Layout from  "../src/customers/pages/Layout";
import ProcessTwo from "./customers/components/ProcessTwo";


const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route element={<Layout/>}>
      <Route path="/" element={<Loading />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/processtwo" element={<ProcessTwo />} />
      
    </Route>

  </Routes>

);






export default AppRoutes;
