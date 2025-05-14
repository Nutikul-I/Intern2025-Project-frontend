import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EmployeeModal from "./EmployeeModal";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";


export default function EmployeePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // ✅ สำหรับแก้ไข
  const itemsPerPage = 10;

  useEffect(() => {
    const fakeEmployees = Array.from({ length: 85 }, (_, i) => ({
      code: String(i + 1).padStart(7, "0"),
      name: `ชื่อทดสอบ ${i + 1} นามสกุล`,
      email: `user${i + 1}@email.com`,
      phone: `0990000${String(i + 1).padStart(3, "0")}`,
      role: i % 2 === 0 ? "ผู้ดูแลระบบ" : "พนักงานทั่วไป",
    }));
    setAllEmployees(fakeEmployees);
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setEmployees(allEmployees.slice(start, end));
  }, [allEmployees, currentPage]);

  const handleSave = (newData) => {
    if (selectedEmployee) {
      // ✅ แก้ไข
      const updated = allEmployees.map((emp) =>
        emp.code === selectedEmployee.code ? { ...emp, ...newData } : emp
      );
      setAllEmployees(updated);
    } else {
      // ✅ เพิ่มใหม่
      const newEmployee = {
        ...newData,
        code: String(Date.now()).slice(-7),
      };
      setAllEmployees([newEmployee, ...allEmployees]);
    }

    setModalOpen(false);
    setSelectedEmployee(null);

    Swal.fire({
      icon: "success",
      title: "บันทึกข้อมูลสำเร็จ",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#000",
    });
  };

  const handleEdit = (emp) => {
    setSelectedEmployee(emp); // ✅ เตรียมข้อมูลไปแก้
    setModalOpen(true);
  };

  const handleDelete = (empCode) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "ข้อมูลนี้จะถูกลบถาวร!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        const filtered = allEmployees.filter((emp) => emp.code !== empCode);
        setAllEmployees(filtered);
        Swal.fire("ลบแล้ว!", "ข้อมูลพนักงานถูกลบเรียบร้อย", "success");
      }
    });
  };

  const totalPages = Math.ceil(allEmployees.length / itemsPerPage);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 sm:px-4 py-2 sm:py-3">
          <h2 className="text-lg sm:text-xl font-semibold">พนักงาน</h2>
          <button
            className="bg-black text-white px-4 py-2 rounded-xl"
            onClick={() => {
              setSelectedEmployee(null); // ✅ clear ก่อนเปิดเพิ่ม
              setModalOpen(true);
            }}
          >
            เพิ่มข้อมูล
          </button>
        </div>

        <table className="min-w-full text-xs sm:text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-2 sm:px-4 py-1 sm:py-3 text-left w-16">รหัส</th>
              <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">
                ชื่อ - นามสกุล
              </th>
              <th className="hidden md:table-cell px-2 sm:px-4 py-1 sm:py-3 text-left">
                อีเมล
              </th>
              <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">
                เบอร์โทรศัพท์
              </th>
              <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">
                สิทธิ์ผู้ใช้งาน
              </th>
              <th className="px-2 sm:px-4 py-1 sm:py-3 text-center w-24">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.code} className="border-t">
                <td className="px-4 py-3">{emp.code}</td>
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">{emp.email}</td>
                <td className="px-4 py-3">{emp.phone}</td>
                <td className="px-4 py-3">{emp.role}</td>
                <td className="px-4 py-3 gap-2 items-center flex justify-center">
                  <FaPencilAlt
                    className="cursor-pointer text-yellow-500 mr-2"
                    onClick={() => handleEdit(emp)}
                  />
                  <FaTrash
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDelete(emp.code)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Summary + MUI Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div>
            แสดง {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, allEmployees.length)} จาก{" "}
            {allEmployees.length} รายการ
          </div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </div>
      

      {modalOpen && (
        <EmployeeModal
          onClose={() => {
            setModalOpen(false);
            setSelectedEmployee(null);
          }}
          onSave={handleSave}
          defaultData={selectedEmployee} // ✅ ส่งข้อมูลให้ modal
        />
      )}
    </div>
  );
}
