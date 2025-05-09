import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

// 👉 เปลี่ยน endpoint ให้ตรงกับ backend ของคุณ
export const listCustomers = () => api.get("/customers");
export const createCustomer = (data) => api.post("/customers", data);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

export const listAddresses = (customerId) =>
  api.get(`/customers/${customerId}/addresses`);
export const createAddress = (customerId, data) =>
  api.post(`/customers/${customerId}/addresses`, data);
export const updateAddress = (customerId, addrId, data) =>
  api.put(`/customers/${customerId}/addresses/${addrId}`, data);
export const deleteAddress = (customerId, addrId) =>
  api.delete(`/customers/${customerId}/addresses/${addrId}`);
