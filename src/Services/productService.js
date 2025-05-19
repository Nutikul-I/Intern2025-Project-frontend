// src/services/productService.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ลิสต์สินค้า
export const fetchProducts = (page = 1, row = 20) =>
  api.get("/product/products", { params: { page, row } });

// รายละเอียดสินค้าเดี่ยว
export const fetchProductById = (id) => api.get(`/product/${id}`);

export default { fetchProducts, fetchProductById };
