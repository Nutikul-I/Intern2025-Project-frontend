import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderHistory from "./customers/components/OrderHistory";
import Loading from "./page/loading";
import Login from "./page/login";
<<<<<<< HEAD
import HomePage from "./customers/components/HomePage"
import Layout from "./customers/pages/Layout";
import Register from "./page/register";
=======
import Layout from  "../src/customers/pages/Layout";
import ProcessTwo from "./customers/components/ProcessTwo";

>>>>>>> 5b49138682e2f422fad0443eb839657f3d085cba

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route element={<Layout/>}>
      <Route path="/" element={<Loading />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/processtwo" element={<ProcessTwo />} />
      
    </Route>

  </Routes>

);






export default AppRoutes;
