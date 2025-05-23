import React from "react";
import { Routes, Route } from "react-router-dom";

import OrderHistory from "./customers/components/OrderHistory";
import ProcessOne from "./customers/components/ProcessOne";
import ProcessTwo from "./customers/components/ProcessTwo";
import ProcessThree from "./customers/components/ProcessThree";
import ProductDetail from "./customers/components/ProductDetail";
import HomePage from "./customers/components/HomePage";
import Layout from "./customers/pages/Layout";
import Login from "./page/login";
import Register from "./page/register";
import AllProduct from "./customers/components/AllProduct";
import ShoppingCart from "./customers/components/ShoppingCart";
import EditInfo from "./customers/components/EditInfo";
import CheckoutPage from "./customers/components/CheckoutPage";
import LayoutEmployee from "./employees/pages/Layout";
import DashBoard from "./employees/components/Dashboard";
import CustomerInfo from "./employees/components/CustomerInfo";
import Employees from "./employees/components/Employee";
import Permission from "./employees/components/Permission";
import Category from "./employees/components/Category";
import CountingUnit from "./employees/components/CountingUnit";
import Discount from "./employees/components/Discount";
import Product from "./employees/components/Product";
import OrderHistoryDetail from "./customers/components/OrderHistoryDetail";
import AddProduct from "./employees/components/AddProduct";
import OrderList from "./employees/components/OrderList";
import EditStock from "./employees/components/EditStock";
import Review from "./employees/components/Review";

import ProductAdd from "./employees/components/Product";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="orderhistory" element={<OrderHistory />} />
      <Route path="orderhistory/:id" element={<OrderHistoryDetail />} />
      <Route path="processOne" element={<ProcessOne />} />
      <Route path="processtwo" element={<ProcessTwo />} />
      <Route path="processthree" element={<ProcessThree />} />
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="allproduct" element={<AllProduct />} />
      <Route path="shoppingcart" element={<ShoppingCart />} />
      <Route path="editinfo" element={<EditInfo />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="process" element={<ProcessTwo />} />
    </Route>
    
    <Route element={<LayoutEmployee />}>
      <Route path="/employee/dashboard" element={<DashBoard />} />
      <Route path="/employee/customer" element={<CustomerInfo />} />
      <Route path="/employee/employee" element={<Employees />} />
      <Route path="/employee/permission" element={<Permission />} />
      <Route path="/employee/category" element={<Category />} />
      <Route path="/employee/countingUnit" element={<CountingUnit />} />
      <Route path="/employee/discount" element={<Discount />} />
      <Route path="/employee/product" element={<Product />} />
      <Route path="/employee/addproduct" element={<AddProduct />} />
      <Route path="/employee/orderlist" element={<OrderList />} />
      <Route path="/employee/editstock" element={<EditStock />} />      
      <Route path="/employee/review" element={<Review />} />


      <Route path="/employee/product" element={<ProductAdd />} />
    
    </Route>
  </Routes>
);

export default AppRoutes;
