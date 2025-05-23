import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { FaHome, FaPencilAlt, FaTrash } from "react-icons/fa";
import CustomerFormModal from "./CustomerFormModal";
import AddressModal from "./CustomerAddressModal";

import {
  listCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../Services/customerService.js";

export default function CustomerInfo() {
  const pageSize = 10;

  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ── modal states ── */
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [showAddress, setShowAddress] = useState(false);
  const [addressCustomer, setAddressCustomer] = useState(null);

  /* ─────────────────────────────────────────────── */
  // โหลดข้อมูลครั้งแรกเท่านั้น
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listCustomers(1, 100); // ดึงข้อมูลมาเยอะๆ
      
      // ตรวจสอบและแปลงข้อมูลให้เป็น array
      const data = Array.isArray(res.data) ? res.data : 
                  (res.data?.data ? res.data.data : []);
      
      // เรียงข้อมูลตาม ID จากน้อยไปมาก
      const sortedData = [...data].sort((a, b) => a.ID - b.ID);
      setAllCustomers(sortedData);
      
      // แสดงหน้าแรก
      setCustomers(sortedData.slice(0, pageSize));
      
      console.log('All data loaded:', sortedData);
    } catch (err) {
      setError("โหลดข้อมูลไม่สำเร็จ");
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // โหลดข้อมูลครั้งแรกเท่านั้น
  useEffect(() => {
    fetchAllData();
  }, []); // empty dependency array

  // อัพเดทข้อมูลที่แสดงเมื่อเปลี่ยนหน้า
  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setCustomers(allCustomers.slice(start, end));
    console.log('Page changed:', page);
    console.log('Showing data:', allCustomers.slice(start, end));
  }, [page, allCustomers]);

  /* ── handlers ─────────────────────────────────── */
  const openAdd = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const openEdit = async (cust) => {
    try {
      const { data } = await getCustomer(cust.ID);
      setEditingCustomer(data);
      setShowForm(true);
    } catch (err) {
      console.error(err);
    }
  };


  const handleDelete = async (cust) => {
    if (!window.confirm("ยืนยันลบลูกค้า?")) return;
    try {
      await deleteCustomer(cust.ID);
      /* ถ้าลบจนหน้า current ว่าง → กลับไปหน้าก่อน */
      const newPage = customers.length === 1 && page > 1 ? page - 1 : page;
      setPage(newPage);
      fetchAllData();
    } catch (err) {
      alert("ลบไม่สำเร็จ");
      console.error(err);
    }
  };

  const openAddr = async (cust) => {
    try {
      const { data } = await getCustomer(cust.ID);
      setAddressCustomer(data);
      setShowAddress(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveAddr = async (addresses) => {
    try {
      const base = { ...addressCustomer, Addresses: addresses };
      delete base.ID; // backend รับ body แบบ CustomerCreate (ไม่มี ID)
      await updateCustomer(addressCustomer.ID, base);
      setShowAddress(false);
      fetchAllData();
    } catch (err) {
      alert("อัปเดตที่อยู่ไม่สำเร็จ");
    }
  };

  // เพิ่มฟังก์ชันสำหรับจัดการเปลี่ยนหน้า
  const handlePageChange = (_, newPage) => {
    setPage(newPage);
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
              <span className="text-sm sm:text-base">เพิ่มข้อมูล</span>
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <p className="p-4">กำลังโหลด...</p>
          ) : error ? (
            <p className="p-4 text-red-500">{error}</p>
          ) : (
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
                    <tr key={c.ID} className="border-t">
                      <td className="px-2 sm:px-4 py-1 sm:py-3">
                        {String(c.ID).padStart(7, "0")}
                      </td>
                      <td className="px-2 sm:px-4 py-1 sm:py-3">
                        {c.FirstName} {c.LastName}
                      </td>
                      <td className="hidden md:table-cell px-2 sm:px-4 py-1 sm:py-3">
                        {c.Email}
                      </td>
                      <td className="px-2 sm:px-4 py-1 sm:py-3">{c.Phone}</td>
                      <td className="px-2 sm:px-4 py-1 sm:py-3">
                        <div className="flex items-center justify-center gap-2 text-base">
                          <FaHome
                            className="cursor-pointer text-emerald-600"
                            onClick={() => openAddr(c)}
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
          )}
        </div>

        {/* ---------- Summary + MUI Pagination ---------- */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>
            แสดง {allCustomers.length ? ((page - 1) * pageSize) + 1 : 0}-
            {Math.min(page * pageSize, allCustomers.length)} จากทั้งหมด {allCustomers.length} รายการ
          </span>
          <Pagination
            page={page}
            count={Math.max(1, Math.ceil(allCustomers.length / pageSize))}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </div>
      </div>

      {/* ------------ Modals ------------- */}
      <CustomerFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        editingData={editingCustomer} // undefined ตอนเพิ่มใหม่
        onSaved={() => fetchAllData()} // รีโหลด list หลังบันทึก
      />

      <AddressModal
        open={showAddress}
        onClose={() => setShowAddress(false)}
        customer={addressCustomer || { addresses: [] }} // 🟢 safe
        onSave={handleSaveAddr}
      />
    </>
  );
}
