import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import PermissionModal from "../components/PermissionModal";

// จำลอง total 85 รายการ
const mockAllRoles = Array.from({ length: 85 }).map((_, i) => ({
  id: String(i + 1).padStart(7, "0"),
  name: `สิทธิ์ที่ ${i + 1}`,
  description: `รายละเอียดของสิทธิ์ ${i + 1}`,
  permissions: {
    ลูกค้า: { ดู: true },
    พนักงาน: { ดู: i % 2 === 0 },
  },
}));

export default function UserRolePage() {
  const [allRoles, setAllRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const itemsPerPage = 10;
  const totalItems = allRoles.length;

  useEffect(() => {
    const fakeData = mockAllRoles;
    setAllRoles(fakeData);
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setRoles(allRoles.slice(startIndex, endIndex));
  }, [currentPage, allRoles]);

  const handleSaveRole = (newRole) => {
    if (selectedRole) {
      const updatedAllRoles = allRoles.map((r) =>
        r.id === selectedRole.id ? { ...r, ...newRole } : r
      );
      setAllRoles(updatedAllRoles);
    } else {
      const newId = String(Date.now());
      setAllRoles([{ id: newId, ...newRole }, ...allRoles]);
    }
    setShowModal(false);
    setSelectedRole(null);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleDelete = (roleId) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "การลบนี้ไม่สามารถย้อนกลับได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      customClass: {
        popup: "rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = allRoles.filter((r) => r.id !== roleId);
        setAllRoles(updated);

        const newPage = Math.ceil(updated.length / itemsPerPage);
        if (currentPage > newPage) setCurrentPage(newPage);

        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "bg-black text-white rounded px-6 py-2 text-sm",
            popup: "rounded-xl",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0 flex justify-center">
      <div className="w-full max-w-7xl">
        {/* Header */}
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

        {/* Table */}
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
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(role.id)}
                      >
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
          <div>
            แสดง {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} จากทั้งหมด {totalItems} รายการ
          </div>

          <div className="flex flex-wrap items-center gap-1 px-1 justify-end w-full md:w-auto">
            <div className="flex flex-wrap items-center gap-1">
              {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 rounded border text-sm flex items-center justify-center transition ${
                    num === currentPage
                      ? "bg-black text-white border-black"
                      : "hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
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
