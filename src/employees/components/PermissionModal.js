import { useState } from "react";
import { X } from "lucide-react";

const MODULES = ["ลูกค้า", "พนักงาน", "ตำแหน่ง"];
const PERMISSIONS = ["ดู", "สร้าง", "แก้ไข", "ลบ"];

export default function PermissionModal({ isOpen, onClose, onSave }) {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({});

  const handleCheckbox = (module, perm) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [perm]: !prev?.[module]?.[perm],
      },
    }));
  };

  const handleSave = () => {
    const payload = { name: roleName, permissions };
    onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 relative">
        {/* ปิด */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">สิทธิ์ผู้ใช้งาน</h2>

        {/* Input */}
        <label className="block text-sm mb-1 font-medium">ชื่อสิทธิ์ผู้ใช้งาน</label>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="placeholder"
        />

        {/* ตารางสิทธิ์ */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black text-white">
                <th className="text-left px-3 py-2">รายการ</th>
                {PERMISSIONS.map((perm) => (
                  <th key={perm} className="px-3 py-2 text-center">
                    {perm}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODULES.map((mod) => (
                <tr key={mod} className="border-b">
                  <td className="px-3 py-2">{mod}</td>
                  {PERMISSIONS.map((perm) => (
                    <td key={perm} className="text-center">
                      <input
                        type="checkbox"
                        checked={permissions?.[mod]?.[perm] || false}
                        onChange={() => handleCheckbox(mod, perm)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onSave}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            บันทึก
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}
