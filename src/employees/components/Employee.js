import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EmployeeModal from "./EmployeeModal";

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

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">พนักงาน</h2>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => {
              setSelectedEmployee(null); // ✅ clear ก่อนเปิดเพิ่ม
              setModalOpen(true);
            }}
          >
            เพิ่มข้อมูล
          </button>
        </div>

        <table className="w-full table-auto text-center">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">รหัส</th>
              <th className="px-4 py-2">ชื่อ - นามสกุล</th>
              <th className="px-4 py-2">อีเมล</th>
              <th className="px-4 py-2">เบอร์โทรศัพท์</th>
              <th className="px-4 py-2">สิทธิ์ผู้ใช้งาน</th>
              <th className="px-4 py-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.code} className="border-t">
                <td className="px-4 py-2">{emp.code}</td>
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.phone}</td>
                <td className="px-4 py-2">{emp.role}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-yellow-500 mr-2"
                    onClick={() => handleEdit(emp)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(emp.code)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div>
            แสดง {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, allEmployees.length)} จาก{" "}
            {allEmployees.length} รายการ
          </div>
          <div className="flex gap-1 items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-2 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded border ${
                  currentPage === num
                    ? "bg-black text-white border-black"
                    : "hover:bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-2 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
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
