// src/components/AddEmployeeModal.jsx
import React from "react";

export default function EmployeeModal({ onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">พนักงาน</h3>
          <button onClick={onClose}>❌</button>
        </div>
        <form onSubmit={onSave} className="space-y-3">
          <input className="w-full border px-3 py-2 rounded" placeholder="ชื่อ-นามสกุล" />
          <input className="w-full border px-3 py-2 rounded" placeholder="เบอร์โทรศัพท์" />
          <input className="w-full border px-3 py-2 rounded" placeholder="อีเมล" />
          <select className="w-full border px-3 py-2 rounded">
            <option>เลือกสิทธิ์</option>
            <option>ผู้ใช้งาน</option>
            <option>แอดมิน</option>
          </select>
          <input className="w-full border px-3 py-2 rounded" placeholder="ชื่อผู้ใช้" />
          <input className="w-full border px-3 py-2 rounded" placeholder="รหัสผ่าน" type="password" />
          <input className="w-full border px-3 py-2 rounded" placeholder="ยืนยันรหัสผ่าน" type="password" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
              ยกเลิก
            </button>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
