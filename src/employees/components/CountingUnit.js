// src/pages/CountingUnit.js
import { useState } from "react";
import {
  FaPencilAlt,
  FaTrash,
  FaPlus,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

export default function CountingUnit() {
  const [units, setUnits] = useState([
    {
      id: 1,
      code: "0000001",
      unitName: "อัน",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [unitName, setUnitName] = useState("");
  const [editingUnit, setEditingUnit] = useState(null);

  const openAdd = () => {
    setEditingUnit(null);
    setUnitName("");
    setShowForm(true);
  };

  const openEdit = (unit) => {
    setEditingUnit(unit);
    setUnitName(unit.unitName);
    setShowForm(true);
  };

  const handleDelete = (unit) => {
    setUnits((prev) => prev.filter((u) => u.id !== unit.id));
  };

  const handleSaveUnit = () => {
    if (!unitName.trim()) return;

    const now = Date.now();

    if (editingUnit) {
      setUnits((prev) =>
        prev.map((u) =>
          u.id === editingUnit.id
            ? { ...u, unitName, updatedAt: now }
            : u
        )
      );
    } else {
      const maxCode = units.reduce((max, u) => {
        const num = parseInt(u.code, 10);
        return num > max ? num : max;
      }, 0);

      const nextCode = String(maxCode + 1).padStart(7, "0");

      const newUnit = {
        id: now,
        code: nextCode,
        unitName,
        createdAt: now,
        updatedAt: now,
      };

      setUnits((prev) => [...prev, newUnit]);
    }

    setShowForm(false);
    setShowSuccess(true);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 sm:px-4 py-2 sm:py-3">
          <h1 className="text-lg sm:text-xl font-semibold">หน่วยนับ</h1>
          <button
            onClick={openAdd}
            className="mt-2 sm:mt-0 flex items-center gap-2 bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl"
          >
            <FaPlus />
            <span className="text-sm sm:text-base">เพิ่มข้อมูล</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left w-20">รหัส</th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">ชื่อหน่วยนับ</th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-center w-24">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {units.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-2 sm:px-4 py-2">{u.code}</td>
                  <td className="px-2 sm:px-4 py-2">{u.unitName}</td>
                  <td className="px-2 sm:px-4 py-2 text-center">
                    <div className="flex justify-center gap-2 text-base">
                      <FaPencilAlt
                        className="cursor-pointer text-yellow-500"
                        onClick={() => openEdit(u)}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => handleDelete(u)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center sm:justify-end mt-4 gap-2 text-xs sm:text-sm">
        <FaAngleLeft className="cursor-pointer" />
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={`px-2 py-1 rounded ${
              n === 1 ? "bg-gray-900 text-white" : "hover:bg-gray-100"
            }`}
          >
            {n}
          </button>
        ))}
        <FaAngleRight className="cursor-pointer" />
      </div>

      {/* --- Form Modal --- */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">หน่วยนับ</h2>
            <label className="block text-sm mb-1">ชื่อหน่วยนับ</label>
            <input
              className="w-full border rounded px-3 py-2 mb-4 text-sm"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              placeholder="เช่น ชิ้น, กล่อง"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded border text-sm"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSaveUnit}
                className="px-4 py-2 bg-gray-900 text-white rounded text-sm"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Success Modal --- */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center">
            <div className="text-green-500 text-4xl mb-2">✓</div>
            <div className="text-sm font-semibold mb-4">บันทึกข้อมูลสำเร็จ</div>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-4 py-2 bg-gray-900 text-white rounded text-sm w-full"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
