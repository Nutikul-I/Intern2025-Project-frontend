import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import PermissionModal from "../components/PermissionModal";

export default function UserRolePage() {
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const itemsPerPage = 10;
  const totalItems = 85;

  useEffect(() => {
    setRoles([
      {
        id: "0000001",
        name: "ผู้จัดการ",
        description: "ลูกค้า, พนักงาน, สิทธิ์ผู้ใช้งาน, สินค้า, นำเข้าสินค้า",
        permissions: {
          ลูกค้า: { ดู: true },
          พนักงาน: { ดู: true },
        },
      },
    ]);
  }, [currentPage]);

  const handleSaveRole = (newRole) => {
    setRoles((prev) => {
      if (selectedRole) {
        return prev.map((r) =>
          r.id === selectedRole.id ? { ...r, ...newRole } : r
        );
      } else {
        return [...prev, { id: String(Date.now()), ...newRole }];
      }
    });
    setShowModal(false);
    setSelectedRole(null);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-8 flex justify-center">
      <div className="w-full max-w-6xl">

        {/* Header (ไม่มี margin-bottom แล้ว) */}
        <div className="bg-white rounded-t-xl shadow-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">สิทธิ์ผู้ใช้งาน</h2>
          <button
            onClick={() => {
              setSelectedRole(null);
              setShowModal(true);
            }}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm w-full sm:w-auto"
          >
            เพิ่มข้อมูล
          </button>
        </div>

        {/* Table (ชิดติดกับ header และใช้ rounded-b) */}
        <div className="overflow-x-auto w-full bg-white rounded-b-xl shadow-sm">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead className="text-gray-600 border-b bg-white">
              <tr>
                <th className="px-3 py-2 sm:px-6 sm:py-3 whitespace-nowrap">รหัส</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 whitespace-nowrap">ชื่อสิทธิ์ผู้ใช้</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 whitespace-nowrap">รายละเอียด</th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 text-right whitespace-nowrap">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50 border-b">
                  <td className="px-3 py-2 sm:px-6 sm:py-3">{role.id}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-3">{role.name}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-3">{role.description}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        className="text-yellow-500 hover:text-yellow-600"
                        onClick={() => handleEdit(role)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="text-sm text-gray-600 flex flex-col md:flex-row justify-between md:items-center items-start gap-4 mt-6">
          <div className="px-1">
            แสดง {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} จากทั้งหมด {totalItems} รายการ
          </div>
          <div className="flex flex-wrap items-center gap-1 px-1">
            {[1, "...", 4, 5, 6, "...", 20].map((num, i) => (
              <button
                key={i}
                disabled={num === "..."}
                onClick={() => typeof num === "number" && setCurrentPage(num)}
                className={`w-8 h-8 rounded border text-sm flex items-center justify-center transition ${
                  num === currentPage
                    ? "bg-black text-white border-black"
                    : num === "..."
                    ? "text-gray-400 cursor-default border-transparent"
                    : "hover:bg-gray-200 border border-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Modal */}
        <PermissionModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedRole(null);
          }}
          onSave={handleSaveRole}
          defaultData={selectedRole}
        />
      </div>
    </div>
  );
}
