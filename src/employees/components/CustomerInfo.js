// src/pages/customerinfo.js
import { useState } from "react";
import {
  FaHome,
  FaPencilAlt,
  FaTrash,
  FaPlus,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

import CustomerFormModal from "./CustomerFormModal.js";
import AddressModal from "./CustomerAddressModal.js";

// import service createCustomer / updateCustomer / deleteCustomer
// import { createCustomer, updateCustomer, deleteCustomer } from "../services/customerService.js";

export default function CustomerInfo() {
  /* ---------- mock data ---------- */
  const [customers, setCustomers] = useState([
    {
      id: 1,
      code: "0000001",
      fullName: "นายทดสอบ นามสกุลสมบูรณ์",
      email: "test@example.com",
      phone: "0999999999",
      addresses: [],
    },
    {
      id: 2,
      code: "0000002",
      fullName: "Jane Doe",
      email: "jane@example.com",
      phone: "0898888888",
      addresses: [],
    },
    {
      id: 3,
      code: "0000003",
      fullName: "John Smith",
      email: "john@example.com",
      phone: "0897777777",
      addresses: [],
    },
  ]);

  /* ---------- modal states ---------- */
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [showAddress, setShowAddress] = useState(false);
  const [addressCustomer, setAddressCustomer] = useState(null);

  /* ---------- handlers ---------- */
  const openAdd = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const openEdit = (cust) => {
    setEditingCustomer(cust);
    setShowForm(true);
  };

  const handleSaveCustomer = (data) => {
    if (editingCustomer) {
      // await updateCustomer(editingCustomer.id, data);
      setCustomers((prev) =>
        prev.map((c) => (c.id === editingCustomer.id ? { ...c, ...data } : c))
      );
    } else {
      // const res = await createCustomer(data);
      setCustomers((prev) => [
        ...prev,
        { ...data, id: Date.now(), code: String(Date.now()).slice(-7) },
      ]);
    }
  };

  const handleDelete = (cust) => {
    // await deleteCustomer(cust.id);
    setCustomers((prev) => prev.filter((c) => c.id !== cust.id));
  };

  const openAddressModal = (cust) => {
    setAddressCustomer(cust);
    setShowAddress(true);
  };

  const handleSaveAddresses = (addresses) =>
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === addressCustomer.id ? { ...c, addresses } : c
      )
    );

  /* ---------- UI ---------- */
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-xl font-semibold">ข้อมูลลูกค้า</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded"
        >
          <FaPlus /> เพิ่มข้อมูล
        </button>
      </div>

      {/* ------------ table ------------- */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">รหัส</th>
              <th className="px-4 py-3 text-left">ชื่อ - นามสกุล</th>
              <th className="px-4 py-3 text-left">อีเมล</th>
              <th className="px-4 py-3 text-left">เบอร์โทรศัพท์</th>
              <th className="px-4 py-3 text-center w-28">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-3">{c.code}</td>
                <td className="px-4 py-3">{c.fullName}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phone}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center text-base">
                    <FaHome
                      className="cursor-pointer text-emerald-600"
                      title="ที่อยู่"
                      onClick={() => openAddressModal(c)}
                    />
                    <FaPencilAlt
                      className="cursor-pointer text-yellow-500"
                      title="แก้ไข"
                      onClick={() => openEdit(c)}
                    />
                    <FaTrash
                      className="cursor-pointer text-red-500"
                      title="ลบ"
                      onClick={() => handleDelete(c)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------ pagination mock ------------- */}
      <div className="flex justify-end mt-3 gap-1 items-center text-sm">
        <FaAngleLeft className="cursor-pointer" />
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={`px-2 py-1 rounded ${
              n === 3 ? "bg-gray-900 text-white" : "hover:bg-gray-100"
            }`}
          >
            {n}
          </button>
        ))}
        <FaAngleRight className="cursor-pointer" />
      </div>

      {/* ------------ Modals ------------- */}
      <CustomerFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSaveCustomer}
        editingData={editingCustomer}
      />

      <AddressModal
        open={showAddress}
        onClose={() => setShowAddress(false)}
        customer={addressCustomer ?? {}}
        onSave={handleSaveAddresses}
      />
    </div>
  );
}
