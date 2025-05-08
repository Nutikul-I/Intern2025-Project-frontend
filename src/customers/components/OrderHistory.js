import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";

export default function OrderHistoryPage() {
  /* ------------------ STATE ------------------ */
  const [orders, setOrders] = useState([]);

  /* ------------------ FETCH DATA ------------------ */
  useEffect(() => {
    async function fetchOrders() {
      try {
        /* 
         * TODO: เปลี่ยนเป็น endpoint จริง เช่น
         * const res = await fetch("https://api.example.com/orders");
         * const data = await res.json();
         */
        const mock = [
          {
            id: "ORD‑240501",
            status: "กำลังดำเนินการ",
            items: [
              { id: 1, name: "Apple iPhone 14 Pro Max 128GB", price: 1399 },
              { id: 2, name: "AirPods Max Silver", price: 549 },
              { id: 3, name: "Apple Watch Series 9 GPS 41 mm", price: 399 }
            ]
          },
          {
            id: "ORD‑240427",
            status: "กำลังดำเนินการ",
            items: [
              { id: 1, name: "Apple iPhone 14 Pro Max 128GB", price: 1399 },
              { id: 2, name: "AirPods Max Silver", price: 549 },
              { id: 3, name: "Apple Watch Series 9 GPS 41 mm", price: 399 }
            ]
          }
        ];
        setOrders(mock);
      } catch (err) {
        console.error("fetchOrders error:", err);
      }
    }

    fetchOrders();
  }, []);

  /* ------------------ RENDER ------------------ */
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ======== CONTENT ======== */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 lg:px-0 py-10 space-y-10">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-6">
          รายการสั่งซื้อ
        </h1>

        {/* TODO: ใส่ skeleton/loading UI ถ้า orders.length === 0 */}
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </main>
    </div>
  );
}

/* ------------------ SUB‑COMPONENTS ------------------ */
function OrderCard({ order }) {
  const total = order.items.reduce((sum, i) => sum + i.price, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-50/60">
        <span className="font-medium text-sm text-gray-700">#{order.id}</span>
        <span className="text-xs font-semibold bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full">
          {order.status}
        </span>
      </div>

      {/* Items */}
      <ul className="divide-y divide-gray-100">
        {order.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between px-6 py-3 text-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-md bg-gray-100 flex-shrink-0" />
              <span>{item.name}</span>
            </div>
            <span className="font-medium">฿{item.price}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 text-sm font-medium bg-gray-50">
        <div>
          Total <span className="ml-2 font-semibold">฿{total}</span>
        </div>
        {/* TODO: เปลี่ยนเป็น <Link> ไปหน้า /orders/:id ถ้ามีหน้ารายละเอียด */}
        <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100">
          รายละเอียด
        </button>
      </div>
    </motion.div>
  );
}
