// src/components/EmployeePage.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import EmployeeModal from "./EmployeeModal"; // 🔹 แยกออกมาเรียกใช้งาน

export default function EmployeePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState([
    {
      code: "0000001",
      name: "นายทดสอบ นามสกุลสมมติ",
      email: "อีเมล",
      phone: "0999999999",
      role: "ตำแหน่ง",
    },
    {
      code: "0000002",
      name: "นางสาวตัวอย่าง สมมุติ",
      email: "example@email.com",
      phone: "0888888888",
      role: "ผู้ดูแลระบบ",
    },
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    setModalOpen(false);
    Swal.fire({
      icon: "success",
      title: "บันทึกข้อมูลสำเร็จ",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#000",
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">พนักงาน</h2>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => setModalOpen(true)}
          >
            เพิ่มข้อมูล
          </button>
        </div>

        <table className="w-full table-auto">
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
            {employees.map((emp, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2">{emp.code}</td>
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.phone}</td>
                <td className="px-4 py-2">{emp.role}</td>
                <td className="px-4 py-2">
                  <button className="text-yellow-500 mr-2">✏️</button>
                  <button className="text-red-500">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <EmployeeModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
