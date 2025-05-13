import { useState } from "react";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import ProductFormModal from "./ProductFormModal.js";

// import service for real API integration
// import { listProducts, createProduct, updateProduct, deleteProduct } from "../services/productService.js";

export default function ProductPage() {
  // Mock data 3 items
  const [products, setProducts] = useState([
    {
      id: 1,
      code: "0000001",
      name: "iPhone 14 Pro",
      category: "โทรศัพท์",
      price: 15900,
      sold: 1000,
      stock: 200,
    },
    {
      id: 2,
      code: "0000002",
      name: "MacBook Pro 16",
      category: "โน้ตบุ๊ก",
      price: 79900,
      sold: 500,
      stock: 50,
    },
    {
      id: 3,
      code: "0000003",
      name: "iPad Air",
      category: "แท็บเล็ต",
      price: 17900,
      sold: 300,
      stock: 100,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const openAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const openEdit = (prod) => {
    setEditingProduct(prod);
    setShowForm(true);
  };

  const handleSaveProduct = (data) => {
    if (editingProduct) {
      // update API
      // await updateProduct(editingProduct.id, data);
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p))
      );
    } else {
      // create API
      // await createProduct(data);
      setProducts((prev) => [
        ...prev,
        { ...data, id: Date.now(), code: String(Date.now()).slice(-7) },
      ]);
    }
  };

  const handleDelete = (prod) => {
    // await deleteProduct(prod.id);
    setProducts((prev) => prev.filter((p) => p.id !== prod.id));
  };

  return (
    <>
      {/* ------------------------------ main ------------------------------ */}
      <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
        <div className="bg-gray-50 shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2 sm:px-4 py-2 sm:py-3">
            <h1 className="text-lg sm:text-xl font-semibold">สินค้า</h1>
            <button
              onClick={openAdd}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl"
            >
              <FaPlus />
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
                    <th className="px-4 py-3 text-left hidden md:table-cell">
                      หมวดหมู่
                    </th>
                    <th className="px-4 py-3 text-left">ราคา</th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">
                      ขายแล้ว
                    </th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">
                      คงเหลือ
                    </th>
                    <th className="px-4 py-3 text-center w-24">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="px-4 py-3">{p.code}</td>
                      <td className="px-4 py-3 max-w-[10rem] truncate">
                        {p.name}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {p.category}
                      </td>
                      <td className="px-4 py-3">{p.price}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {p.sold}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {p.stock}
                      </td>
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
      </div>

      {/* ----------------------------- modal ----------------------------- */}
      <ProductFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSaveProduct}
        editingData={editingProduct}
      />
    </>
  );
}
