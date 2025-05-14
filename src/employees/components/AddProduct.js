// src/pages/AddProduct.js
import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";

export default function AddProduct() {
  const [products, setProducts] = useState([
    {
      id: 1,
      code: "0000001",
      documentNumber: "AS1234567890",
      product: "IPHONE 14 PRO",
      importer: "นายทดสอบ",
      quantity: 100,
      createdAt: "24/12/2568 11:22น.",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    documentNumber: "",
    importer: "",
    note: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const openAdd = () => {
    setEditingProduct(null);
    setFormData({
      product: "",
      quantity: "",
      documentNumber: "",
      importer: "",
      note: "",
    });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditingProduct(item);
    setFormData({
      product: item.product,
      quantity: item.quantity,
      documentNumber: item.documentNumber,
      importer: item.importer,
      note: item.note || "",
    });
    setShowForm(true);
  };

  const handleDelete = (item) => {
    setProducts((prev) => prev.filter((p) => p.id !== item.id));
  };

  const handleSave = () => {
    const now = new Date();
    const formattedDate =
      now.toLocaleDateString("th-TH") +
      " " +
      now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) +
      "น.";

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formData } : p
        )
      );
    } else {
      const maxCode = products.reduce((max, p) => {
        const num = parseInt(p.code, 10);
        return num > max ? num : max;
      }, 0);
      const nextCode = String(maxCode + 1).padStart(7, "0");

      const newProduct = {
        id: now.getTime(),
        code: nextCode,
        createdAt: formattedDate,
        ...formData,
        quantity: parseInt(formData.quantity),
      };

      setProducts((prev) => [...prev, newProduct]);
    }

    setShowForm(false);
    setShowSuccess(true);
  };

  /* ---------- Pagination state ---------- */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3">
          <h1 className="text-lg sm:text-xl font-semibold">นำเข้าสินค้า</h1>
          <button
            onClick={openAdd}
            className="mt-2 sm:mt-0 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl"
          >
            <span className="text-sm sm:text-base">เพิ่มข้อมูล</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  รหัส
                </th>
                <th className="px-4 py-3 text-left">เลขเอกสาร</th>
                <th className="px-4 py-3 text-left">วันที่นำเข้า</th>
                <th className="px-4 py-3 text-left">สินค้า</th>
                <th className="px-4 py-3 text-left">จำนวนนำเข้า</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  ผู้นำเข้า
                </th>
                <th className="px-4 py-3 text-center hidden sm:table-cell">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2 hidden sm:table-cell">
                    {item.code}
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{item.documentNumber}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{item.createdAt}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{item.product}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{item.quantity}</td>
                  <td className="px-2 sm:px-4 py-1 hidden sm:table-cell">
                    {item.importer}
                  </td>
                  <td className="px-4 py-2 text-center hidden sm:table-cell">
                    <div className="flex justify-center gap-2">
                      <FaPencilAlt
                        className="text-yellow-500 cursor-pointer"
                        onClick={() => openEdit(item)}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(item)}
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

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-5 text-xl"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">นำเข้าสินค้า</h2>

            <div className="space-y-4 text-sm">
              {/* เลือกสินค้า */}
              <div>
                <label className="block mb-1 font-medium">สินค้า</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={formData.product}
                  onChange={(e) =>
                    setFormData({ ...formData, product: e.target.value })
                  }
                >
                  <option value="">เลือกสินค้า</option>
                  <option value="IPHONE 14 PRO">IPHONE 14 PRO</option>
                  <option value="Samsung Galaxy S23 Ultra">
                    Samsung Galaxy S23 Ultra
                  </option>
                </select>
              </div>

              {/* จำนวนที่นำเข้า */}
              <div>
                <label className="block mb-1 font-medium">จำนวนที่นำเข้า</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  placeholder="placeholder"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                />
              </div>

              {/* เลขเอกสารนำเข้า */}
              <div>
                <label className="block mb-1 font-medium">
                  เลขเอกสารนำเข้า
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="placeholder"
                  value={formData.documentNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, documentNumber: e.target.value })
                  }
                />
              </div>

              {/* อัปโหลดไฟล์ */}
              <div>
                <label className="block mb-1 font-medium">เอกสารประกอบ</label>
                <div className="border rounded-lg px-3 py-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.size <= 10 * 1024 * 1024) {
                        setFormData({ ...formData, file });
                      } else {
                        alert(
                          "ไฟล์ต้องไม่เกิน 10MB และเป็น PNG หรือ JPG เท่านั้น"
                        );
                      }
                    }}
                  />
                  <p className="text-xs mt-2 text-gray-500">
                    รองรับไฟล์ png, jpg, jpeg ขนาดไม่เกิน 10 mb
                  </p>
                  <p className="text-xs text-gray-400">
                    ภาพเอกสารนำเข้าสินค้าหรือหลักฐานการนำเข้าสินค้า
                  </p>
                </div>
                {formData.file && (
                  <div className="mt-2 text-xs text-gray-600">
                    ไฟล์ที่เลือก: {formData.file.name}
                  </div>
                )}
              </div>

              {/* หมายเหตุ */}
              <div>
                <label className="block mb-1 font-medium">หมายเหตุ</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  placeholder="placeholder"
                  value={formData.note || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                ></textarea>
              </div>
            </div>

            {/* ปุ่ม */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded text-sm"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gray-900 text-white rounded text-sm"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center">
            <div className="text-green-500 text-5xl mb-2">✓</div>
            <div className="text-sm font-semibold mb-4">บันทึกข้อมูลสำเร็จ</div>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-4 py-2 bg-gray-900 text-white rounded text-sm w-full"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
