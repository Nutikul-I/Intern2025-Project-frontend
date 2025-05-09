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
      <div className="p-6">
        <div className="flex justify-between mb-4 items-center">
          <h1 className="text-xl font-semibold">สินค้า</h1>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded"
          >
            <FaPlus /> เพิ่มข้อมูล
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">รหัส</th>
                  <th className="px-4 py-3 text-left">ชื่อสินค้า</th>
                  <th className="px-4 py-3 text-left">หมวดหมู่</th>
                  <th className="px-4 py-3 text-left">ราคา</th>
                  <th className="px-4 py-3 text-left">จำนวนที่ขายแล้ว</th>
                  <th className="px-4 py-3 text-left">จำนวนคงเหลือ</th>
                  <th className="px-4 py-3 text-center w-28">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-3">{p.code}</td>
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3">{p.category}</td>
                    <td className="px-4 py-3">{p.price}</td>
                    <td className="px-4 py-3">{p.sold}</td>
                    <td className="px-4 py-3">{p.stock}</td>
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

      {/* Modal for Add/Edit Product */}
      <ProductFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSaveProduct}
        editingData={editingProduct}
      />
    </>
  );
}
