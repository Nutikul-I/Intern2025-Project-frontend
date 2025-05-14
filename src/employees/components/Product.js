import { useState } from "react";
import { FaPencilAlt, FaTrash,} from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import ProductFormModal from "./ProductFormModal.js";

export default function ProductPage() {
  /* ---------- mock data (15 รายการเพื่อทดสอบหลายหน้า) ---------- */
  const [products, setProducts] = useState(
    Array.from({ length: 55 }).map((_, i) => ({
      id: i + 1,
      code: String(i + 1).padStart(7, "0"),
      name: `สินค้า #${i + 1}`,
      category: i % 2 ? "Phone" : "Laptop",
      price: 10000 + i * 500,
      sold: 50 + i * 5,
      stock: 20 + i,
    }))
  );

  /* ---------- modal states ---------- */
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const openAdd  = () => { setEditingProduct(null); setShowForm(true); };
  const openEdit = (p) => { setEditingProduct(p); setShowForm(true); };

  const handleSaveProduct = (data) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p))
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...data, id: Date.now(), code: String(Date.now()).slice(-7) },
      ]);
    }
  };
  const handleDelete = (p) =>
    setProducts((prev) => prev.filter((x) => x.id !== p.id));

    /* ---------- pagination ---------- */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems   = products.length;
  const totalPages   = Math.ceil(totalItems / itemsPerPage);

  const startIndex   = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const displayStart = totalItems === 0 ? 0 : startIndex + 1;
  const displayEnd   = Math.min(startIndex + itemsPerPage, totalItems);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  /* ---------- UI ---------- */
  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2 sm:px-4 py-2 sm:py-3">
            <h1 className="text-lg sm:text-xl font-semibold">สินค้า</h1>
            <button
              onClick={openAdd}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl"
            >
              <span className="text-sm sm:text-base">เพิ่มข้อมูล</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-white shadow-sm rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">รหัส</th>
                    <th className="px-4 py-3 text-left">ชื่อสินค้า</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">หมวดหมู่</th>
                    <th className="px-4 py-3 text-left">ราคา</th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">ขายแล้ว</th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">คงเหลือ</th>
                    <th className="px-4 py-3 text-center w-24">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="px-4 py-3">{p.code}</td>
                      <td className="px-4 py-3 max-w-[10rem] truncate">{p.name}</td>
                      <td className="px-4 py-3 hidden md:table-cell">{p.category}</td>
                      <td className="px-4 py-3">{p.price}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">{p.sold}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">{p.stock}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center text-base">
                          <FaPencilAlt
                            className="cursor-pointer text-yellow-500"
                            onClick={() => openEdit(p)}
                          />
                          <FaTrash
                            className="cursor-pointer text-red-500"
                            onClick={() => handleDelete(p)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

{/* ---------- Summary + MUI Pagination ---------- */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>
            แสดง {displayStart}-{displayEnd} จากทั้งหมด {totalItems} รายการ
          </span>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </div>
      </div>

      {/* modal */}
      <ProductFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSaveProduct}
        editingData={editingProduct}
      />
    </>
  );
}
