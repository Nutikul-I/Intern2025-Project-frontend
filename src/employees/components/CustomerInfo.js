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
      prev.map((c) => (c.id === addressCustomer.id ? { ...c, addresses } : c))
    );

  /* ---------- Pagination states ---------- */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // ปรับได้
  const totalItems = customers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const displayStart = totalItems === 0 ? 0 : startIndex + 1;
  const displayEnd = Math.min(startIndex + itemsPerPage, totalItems);

  /* ดึงเลขหน้าพร้อม … */
  const getPageNumbers = () => {
    if (totalPages <= 7) return [...Array(totalPages).keys()].map((i) => i + 1);

    const pages = [1];
    if (currentPage > 4) pages.push("…");

    const s = Math.max(2, currentPage - 1);
    const e = Math.min(totalPages - 1, currentPage + 1);
    for (let i = s; i <= e; i++) pages.push(i);

    if (currentPage < totalPages - 3) pages.push("…");
    pages.push(totalPages);
    return pages;
  };

  /* ---------- UI ---------- */
  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 sm:px-4 py-2 sm:py-3">
            <h1 className="text-lg sm:text-xl font-semibold">ลูกค้า</h1>
            <button
              onClick={openAdd}
              className="mt-2 sm:mt-0 flex items-center gap-2 bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl"
            >
              <FaPlus />
              <span className="text-sm sm:text-base">เพิ่มข้อมูล</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-2 sm:px-4 py-1 sm:py-3 text-left w-16">
                    รหัส
                  </th>
                  <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">
                    ชื่อ - นามสกุล
                  </th>
                  {/* ซ่อนคอลัมน์อีเมลบนจอเล็ก */}
                  <th className="hidden md:table-cell px-2 sm:px-4 py-1 sm:py-3 text-left">
                    อีเมล
                  </th>
                  <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">
                    เบอร์โทรศัพท์
                  </th>
                  <th className="px-2 sm:px-4 py-1 sm:py-3 text-center w-24">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="px-2 sm:px-4 py-1 sm:py-3">{c.code}</td>
                    <td className="px-2 sm:px-4 py-1 sm:py-3">{c.fullName}</td>
                    <td className="hidden md:table-cell px-2 sm:px-4 py-1 sm:py-3">
                      {c.email}
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-3">{c.phone}</td>
                    <td className="px-2 sm:px-4 py-1 sm:py-3">
                      <div className="flex items-center justify-center gap-2 text-base">
                        <FaHome
                          className="cursor-pointer text-emerald-600"
                          onClick={() => openAddressModal(c)}
                        />
                        <FaPencilAlt
                          className="cursor-pointer text-yellow-500"
                          onClick={() => openEdit(c)}
                        />
                        <FaTrash
                          className="cursor-pointer text-red-500"
                          onClick={() => handleDelete(c)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- Summary + Pagination ---------- */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between mt-4 gap-3 text-xs sm:text-sm">
          {/* ข้อความซ้ายมือ */}
          <span className="text-gray-700">
            แสดง {displayStart}-{displayEnd} จากทั้งหมด {totalItems} รายการ
          </span>

          {/* ปุ่มหน้า */}
          <nav>
            <ul className="flex overflow-hidden rounded-full border border-gray-300 divide-x divide-gray-300">
              {/* Prev */}
              <li>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 flex items-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <FaAngleLeft size={12} />
                </button>
              </li>

              {/* หมายเลขหน้า + … */}
              {getPageNumbers().map((p, idx) =>
                p === "…" ? (
                  <li
                    key={`dots-${idx}`}
                    className="px-3 py-1 flex items-center"
                  >
                    …
                  </li>
                ) : (
                  <li key={p}>
                    <button
                      onClick={() => setCurrentPage(p)}
                      className={`px-3 py-1 ${
                        p === currentPage
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  </li>
                )
              )}

              {/* Next */}
              <li>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 flex items-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <FaAngleRight size={12} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
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
    </>
  );
}
