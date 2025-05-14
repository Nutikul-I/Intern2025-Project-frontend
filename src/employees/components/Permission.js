import { useEffect, useState } from "react";
import {
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import Pagination from '@mui/material/Pagination';
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
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setAllRoles(mockAllRoles);
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setRoles(allRoles.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage, allRoles]);

  const handleSaveRole = (newRole) => {
    if (selectedRole) {
      setAllRoles((prev) =>
        prev.map((r) =>
          r.id === selectedRole.id ? { ...r, ...newRole } : r
        )
      );
    } else {
      const newId = String(Date.now());
      setAllRoles((prev) => [{ id: newId, ...newRole }, ...prev]);
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
      customClass: { popup: "rounded-xl" },
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

  const handlePageChange = (_, page) => setCurrentPage(page);

  return (
    <div className="min-h-screen bg-gray-100 p-0 flex justify-center">
      <div className="w-full max-w-7xl ">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg sm:text-xl font-semibold">สิทธิ์ผู้ใช้งาน</h2>
          <button
            onClick={() => { setSelectedRole(null); setShowModal(true); }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl"
          >
            <span className="text-sm sm:text-base">เพิ่มข้อมูล</span> 
          </button>
        </div>

        {/* Table */}
        <div className="bg-white overflow-x-auto rounded-lg">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left w-16">รหัส</th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">ชื่อสิทธิ์ผู้ใช้</th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">รายละเอียด</th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-center w-24">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="border-t hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{role.id}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{role.name}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{role.description}</td>
                  <td className="px-3 py-2 sm:px-6 sm:py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button onClick={() => handleEdit(role)} className="text-yellow-500 hover:text-yellow-600">
                        <FaPencilAlt size={16} />
                      </button>
                      <button onClick={() => handleDelete(role.id)} className="text-red-500 hover:text-red-600">
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary + Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-600">
          <div>
            แสดง {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} จากทั้งหมด {totalItems} รายการ
          </div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </div>

        {/* Modal */}
        <PermissionModal
          isOpen={showModal}
          onClose={() => { setShowModal(false); setSelectedRole(null); }}
          onSave={handleSaveRole}
          defaultData={selectedRole}
        />
      </div>
    </div>
  );
}
