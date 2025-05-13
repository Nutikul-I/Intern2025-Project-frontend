import { useState } from "react";
import {
  FaPencilAlt,
  FaTrash,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import OrderStatusModal from "./OrderStatusModal";

export default function OrderList() {
  /* --------------------- mock orders --------------------- */
  const url1 =
    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-3-202409?wid=600&hei=600&fmt=p-jpg&qlt=90";
  const url2 =
    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-4-202409?wid=600&hei=600&fmt=p-jpg&qlt=90";
  const url3 =
    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-5-202409?wid=600&hei=600&fmt=p-jpg&qlt=90";

  const [orders, setOrders] = useState([
    /* --- เพิ่มรายการเยอะ ๆ เพื่อทดสอบ --- */
    ...Array.from({ length: 50 }).map((_, i) => ({
      id: `ORD-24050${i + 1}`,
      code: `${(i + 1).toString().padStart(7, "0")}`,
      buyer: `ผู้ซื้อทดสอบ #${i + 1}`,
      date: "24/12/2568 11:22น.",
      shipping: "ฟรี",
      shippingCost: 0,
      discount: 500,
      status: "กำลังดำเนินการ",
      items: [
        { id: 1, name: "iPhone 14 Pro Max 128GB", price: 13990, image: url1 },
        { id: 2, name: "AirPods Max Silver", price: 5490, image: url2 },
        {
          id: 3,
          name: "Apple Watch Series 9 GPS 41mm",
          price: 3990,
          image: url3,
        },
      ],
    })),
  ]);

  /* ------------- คำนวณยอด/จำนวนเงิน ------------- */
  const ordersWithTotal = orders.map((o) => {
    const subtotal = o.items.reduce((sum, it) => sum + it.price, 0);
    return { ...o, subtotal, amount: subtotal - o.discount + o.shippingCost };
  });

  /* ---------------- Pagination state ---------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(ordersWithTotal.length / itemsPerPage);

  /* ตัดรายการให้ตรงกับหน้า */
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = ordersWithTotal.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* สร้าง page numbers แบบมี … */
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [1];
    if (currentPage > 4) pages.push("…");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 3) pages.push("…");
    pages.push(totalPages);

    return pages;
  };

  /* ---------------- Modal state ---------------- */
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleSaveStatus = (newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === selectedOrder.id ? { ...o, status: newStatus } : o))
    );
    setShowModal(false);
  };

  const handleDelete = (order) =>
    setOrders((prev) => prev.filter((o) => o.id !== order.id));

  /* --------------------------- UI --------------------------- */
  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 sm:px-4 py-2 sm:py-3">
            <h1 className="text-lg sm:text-xl font-semibold">รายการสั่งซื้อ</h1>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">รหัส</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">
                    ชื่อผู้สั่งซื้อ
                  </th>
                  <th className="hidden md:table-cell px-2 sm:px-4 py-1 sm:py-3 text-left">
                    วันที่สั่งซื้อ
                  </th>
                  <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">การขนส่ง</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">ส่วนลด</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">จำนวนเงิน</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-3 text-center w-24">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="px-2 sm:px-4 py-1 sm:py-3">{o.code}</td>
                    <td className="px-2 sm:px-4 py-1 sm:py-3">{o.buyer}</td>
                    <td className="hidden md:table-cell px-2 sm:px-4 py-1 sm:py-3">
                      {o.date}
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-3">{o.shipping}</td>
                    <td className="px-2 sm:px-4 py-1 sm:py-3">฿{o.discount}</td>
                    <td className="px-2 sm:px-4 py-1 sm:py-3 font-medium">
                      ฿{o.amount}
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-3">
                      <div className="flex justify-center gap-2 text-base">
                        <FaPencilAlt
                          className="cursor-pointer text-yellow-500"
                          onClick={() => openStatusModal(o)}
                        />
                        <FaTrash
                          className="cursor-pointer text-red-500"
                          onClick={() => handleDelete(o)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- Pagination ---------- */}
        <div className="flex flex-wrap justify-center sm:justify-end mt-4 gap-1 text-xs sm:text-sm">
          {/* prev */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded flex items-center ${
              currentPage === 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <FaAngleLeft />
          </button>

          {getPageNumbers().map((p, idx) =>
            p === "…" ? (
              <span key={`dots-${idx}`} className="px-2 select-none">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-2 py-1 rounded ${
                  p === currentPage
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            )
          )}

          {/* next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded flex items-center ${
              currentPage === totalPages
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      {/* ---------- Modal ---------- */}
      <OrderStatusModal
        open={showModal}
        order={selectedOrder}
        onClose={() => setShowModal(false)}
        onSave={handleSaveStatus}
      />
    </>
  );
}
