import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderHistory from "./customers/components/OrderHistory";
import Loading from "./page/loading";
import Login from "./page/login";
import Layout from  "../src/customers/pages/Layout";
import ProcessTwo from "./customers/components/ProcessTwo";
import ProcessThree from "./customers/components/ProcessThree";
import LayoutAdmin from "./employees/pages/Layout";
import EmployeePage from "./employees/components/Employee";


const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route element={<Layout/>}>
      <Route path="/" element={<Loading />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/processtwo" element={<ProcessTwo />} />
      <Route path="/processtree" element={<ProcessThree  />} />
    </Route>

    <Route element={< LayoutAdmin / >}>
      <Route path="/" element={<Loading />} />
      <Route path="/employeePage" element={<EmployeePage />} />
  
    </Route>


  </Routes>

);






export default AppRoutes;
