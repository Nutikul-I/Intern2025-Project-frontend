import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import PermissionModal from "../components/PermissionModal"; 

export default function UserRolePage() {
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(6);
  const [showModal, setShowModal] = useState(false); 

  const itemsPerPage = 10;
  const totalItems = 85;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setRoles([
      {
        id: "0000001",
        name: "ผู้จัดการ",
        description: "ลูกค้า, พนักงาน, สิทธิ์ผู้ใช้งาน, สินค้า, นำเข้าสินค้า",
      },
    ]);
  }, [currentPage]);

  const handleSaveRole = (newRole) => {
    console.log("บันทึกสิทธิ์:", newRole);
    // 👇 คุณสามารถเชื่อม API ที่นี่ได้
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8 flex justify-center p-0">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header + Button */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-lg font-bold">สิทธิ์ผู้ใช้งาน</h2>
            <button
              onClick={() => setShowModal(true)} // ✅ เปิด Modal
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
            >
              เพิ่มข้อมูล
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-600 border-b bg-white">
                <tr>
                  <th className="px-6 py-3">รหัส</th>
                  <th className="px-6 py-3">ชื่อสิทธิ์ผู้ใช้</th>
                  <th className="px-6 py-3">รายละเอียด</th>
                  <th className="px-6 py-3 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{role.id}</td>
                    <td className="px-6 py-3">{role.name}</td>
                    <td className="px-6 py-3">{role.description}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button className="text-yellow-500 hover:text-yellow-600">
                          <Pencil size={18} />
                        </button>
                        <button className="text-red-500 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
                <div className="mt-6 text-sm text-gray-600 flex justify-between items-center">
          <div>
            แสดง {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} จากทั้งหมด {totalItems} รายการ
          </div>
          <div className="flex gap-1">
            {[1, "...", 4, 5, 6, 7, 8, "...", 20].map((num, i) => (
              <button
                key={i}
                disabled={num === "..."}
                onClick={() => typeof num === "number" && setCurrentPage(num)}
                className={`w-8 h-8 text-sm rounded ${
                  num === currentPage
                    ? "bg-black text-white"
                    : num === "..."
                    ? "text-gray-400 cursor-default"
                    : "hover:bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Modal เพิ่มสิทธิ์ */}
      <PermissionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveRole}
      />
    </div>
  );
}
