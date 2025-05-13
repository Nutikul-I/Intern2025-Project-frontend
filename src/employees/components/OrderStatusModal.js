import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

/**
 * OrderStatusModal
 * แสดงรายละเอียดคำสั่งซื้อและให้แก้ไขสถานะได้
 *
 * Props
 *  ├ open           : boolean
 *  ├ order          : object | null  (ต้องมี { status, items[], address, shippingCost, discount })
 *  ├ onClose()      : void
 *  └ onSave(status) : void – ส่งค่าสถานะใหม่กลับไป
 */
export default function OrderStatusModal({ open, order, onClose, onSave }) {
  /* ---------------- local state (hooks must be top‑level) ---------------- */
  const [status, setStatus] = useState(order?.status || "รอตรวจสอบ");

  /* ถ้า order เปลี่ยนให้ sync สถานะเข้ากับ state */
  useEffect(() => {
    setStatus(order?.status || "รอตรวจสอบ");
  }, [order]);

  /* ซ่อนไว้ถ้า modal ปิดหรือยังไม่มีข้อมูล order */
  if (!open || !order) return null;

  const subtotal = order.items?.reduce((sum, item) => sum + item.price, 0) || 0;
  const total = subtotal - (order.discount || 0) + (order.shippingCost || 0);

  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl p-6 overflow-y-auto max-h-[90vh]">
        {/* close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        {/* header */}
        <h2 className="text-lg font-semibold mb-6">รายละเอียดสินค้า</h2>

        {/* สถานะ badge */}
        <div className="flex justify-end mb-4">
          <span
            className={`
    px-4 py-1 rounded-full text-sm
    ${
      order.status === "สำเร็จแล้ว"
        ? "bg-green-600 text-white"
        : order.status === "ยกเลิก/คืนเงิน"
        ? "bg-red-400 text-white"
        : order.status === "กำลังจัดสินค้า"
        ? "bg-blue-400 text-white"
        : order.status === "รอตรวจสอบ"
        ? "bg-yellow-500 text-black"
        : "bg-gray-500 text-black"
    }
  `}
          >
            {order.status}
          </span>
        </div>

        {/* รายการสินค้า */}
        <div className="space-y-2 mb-6">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-md object-cover"
                />
                <span className="truncate max-w-[12rem] md:max-w-none">
                  {item.name}
                </span>
              </div>
              <span className="font-semibold whitespace-nowrap">
                ฿{item.price}
              </span>
            </div>
          ))}
        </div>

        {/* ที่อยู่ & การจัดส่ง */}
        <div className="mb-6 text-sm text-gray-700 space-y-4">
          <div>
            <span className="font-semibold text-gray-500 block mb-1">
              ที่อยู่
            </span>
            <p>{order.address}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-500 block mb-1">
              การจัดส่ง
            </span>
            <p>{order.shippingCost === 0 ? "ฟรี" : `฿${order.shippingCost}`}</p>
          </div>
        </div>

        {/* สรุปราคา */}
        <div className="mb-8 text-sm space-y-2">
          <div className="flex justify-between">
            <span>ราคาสินค้า</span>
            <span>฿{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>ส่วนลด</span>
            <span>฿{order.discount}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>ค่าจัดส่ง</span>
            <span>฿{order.shippingCost}</span>
          </div>
          <div className="flex justify-between text-base pt-2">
            <span>Total</span>
            <span>฿{total}</span>
          </div>
        </div>

        {/* เปลี่ยนสถานะ */}
        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium">
            สถานะการสั่งซื้อ
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 w-full md:w-60 border rounded-lg px-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {[
              "รอตรวจสอบ",
              "กำลังจัดสินค้า",
              "จัดส่งสินค้า",
              "สำเร็จแล้ว",
              "ยกเลิก/คืนเงิน",
            ].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* action buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-8 rounded-lg border border-gray-400 hover:bg-gray-100"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={() => onSave(status)}
            className="h-11 px-8 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}
