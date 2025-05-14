import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";

export default function EditStock() {
  const [products, setStock] = useState([
    {
      id: 1,
      code: "0000001",
      stockAdjustmentAt: "24/12/2568 11:22น.",
      product: "IPHONE 14 PRO",
      quantity: 3,
      adjustmentType: "เพิ่มสินค้า",
      stockAdjuster: "นายทดสอบ",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // NEW: track edit/add mode
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    product: "",
    adjustmentType: "",
    quantity: "",
    note: "",
  });

  const handleDelete = (id) => {
    setStock(products.filter((item) => item.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      product: product.product,
      adjustmentType: product.adjustmentType,
      quantity: product.quantity.toString(),
      note: "",
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = () => {
    const timestamp = new Date().toLocaleString("th-TH");

    if (isEditing && editingProduct) {
      // แก้ไขสินค้า
      const updatedProduct = {
        ...editingProduct,
        product: form.product,
        quantity: parseInt(form.quantity),
        adjustmentType: form.adjustmentType,
        stockAdjuster: "ผู้ใช้ระบบ",
        stockAdjustmentAt: timestamp,
      };

      setStock(
        products.map((item) =>
          item.id === editingProduct.id ? updatedProduct : item
        )
      );
    } else {
      // เพิ่มสินค้าใหม่
      const newProduct = {
        id: products.length + 1,
        code: (products.length + 1).toString().padStart(7, "0"),
        product: form.product,
        quantity: parseInt(form.quantity),
        adjustmentType: form.adjustmentType,
        stockAdjuster: "ผู้ใช้ระบบ",
        stockAdjustmentAt: timestamp,
      };

      setStock([...products, newProduct]);
    }

    setShowModal(false);
    setShowSuccess(true);
    setForm({ product: "", adjustmentType: "", quantity: "", note: "" });
    setEditingProduct(null);
    setIsEditing(false);
  };

  /* ---------- Pagination ---------- */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

    return (
        <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3">
                    <h1 className="text-lg sm:text-xl font-semibold">ปรับสต็อก</h1>
                    <button
                        onClick={() => {
                            setForm({ product: "", adjustmentType: "", quantity: "", note: "" });
                            setEditingProduct(null);
                            setIsEditing(false);
                            setShowModal(true);
                        }}
                        className="mt-2 sm:mt-0 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm"
                    >
                        <span className="text-sm sm:text-base">เพิ่มข้อมูล</span>
                    </button>
                </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">รหัส</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  วันที่ปรับสต็อก
                </th>
                <th className="px-4 py-3 text-left">สินค้า</th>
                <th className="px-4 py-3 text-left">จำนวนที่ปรับ</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  ผู้ปรับสต็อก
                </th>
                <th className="px-4 py-3 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{item.code}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 hidden sm:table-cell">
                    {item.stockAdjustmentAt}
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{item.product}</td>
                  <td
                    className={`px-2 sm:px-4 py-1 sm:py-3 font-semibold ${
                      item.adjustmentType === "เพิ่มสินค้า"
                        ? "text-green-600"
                        : item.adjustmentType === "ลดสินค้า"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.adjustmentType === "เพิ่มสินค้า"
                      ? `+${item.quantity}`
                      : item.adjustmentType === "ลดสินค้า"
                      ? `-${item.quantity}`
                      : item.quantity}
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 hidden sm:table-cell">
                    {item.stockAdjuster}
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <FaPencilAlt
                        className="text-yellow-500 cursor-pointer"
                        onClick={() => handleEdit(item)}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary + Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          แสดง {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, totalItems)} จากทั้งหมด{" "}
          {totalItems} รายการ
        </span>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
            </h2>

            <div className="mb-3">
              <label className="block mb-1 text-sm">สินค้า</label>
              <select
                name="product"
                value={form.product}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">เลือกสินค้า</option>
                <option value="IPHONE 14 PRO">IPHONE 14 PRO</option>
                <option value="SAMSUNG GALAXY S24">SAMSUNG GALAXY S24</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-sm">ประเภทการปรับ</label>
              <select
                name="adjustmentType"
                value={form.adjustmentType}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">เลือกประเภทการปรับ</option>
                <option value="เพิ่มสินค้า">เพิ่มสินค้า</option>
                <option value="ลดสินค้า">ลดสินค้า</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-sm">จำนวนที่ปรับ</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="ระบุจำนวน"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm">หมายเหตุ</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="ระบุหมายเหตุ (ถ้ามี)"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-gray-900 text-white"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center max-w-xs">
            <div className="text-green-500 text-4xl mb-4">✔️</div>
            <p className="font-semibold mb-4">บันทึกข้อมูลสำเร็จ</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-4 py-2 rounded bg-gray-900 text-white"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
