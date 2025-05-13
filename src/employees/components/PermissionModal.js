import { useState, useEffect } from "react";
import { X } from "lucide-react";

const MODULES = ["ลูกค้า", "พนักงาน", "ตำแหน่ง"];
const PERMISSIONS = ["ดู", "สร้าง", "แก้ไข", "ลบ"];

export default function PermissionModal({ isOpen, onClose, onSave, defaultData }) {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    if (defaultData) {
      setRoleName(defaultData.name || "");
      setPermissions(defaultData.permissions || {});
    } else {
      setRoleName("");
      setPermissions({});
    }
  }, [defaultData]);

  const handleCheckbox = (module, perm) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [perm]: !prev?.[module]?.[perm],
      },
    }));
  };

  // ✅ ฟังก์ชันเลือก/ไม่เลือกทั้งคอลัมน์
  const handleToggleColumn = (perm) => {
    const allChecked = MODULES.every((mod) => permissions?.[mod]?.[perm]);
    const updated = {};
    MODULES.forEach((mod) => {
      updated[mod] = {
        ...permissions[mod],
        [perm]: !allChecked,
      };
    });
    setPermissions((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // ✅ ตรวจสอบว่าแต่ละคอลัมน์ถูกเลือกหมดไหม
  const isColumnAllChecked = (perm) =>
    MODULES.every((mod) => permissions?.[mod]?.[perm]);

  const handleSave = () => {
    const payload = { name: roleName, permissions };
    onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 sm:px-0">
      <div className="bg-white rounded-xl w-full max-w-3xl sm:p-6 p-4 relative overflow-y-auto max-h-[90vh]">
        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-lg sm:text-xl font-bold mb-4">สิทธิ์ผู้ใช้งาน</h2>

        {/* Input */}
        <label className="block text-sm mb-1 font-medium">ชื่อสิทธิ์ผู้ใช้งาน</label>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black text-sm"
          placeholder="ระบุชื่อสิทธิ์"
        />

        {/* ตารางสิทธิ์ */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs sm:text-sm border border-gray-200 rounded">
            <thead>
              <tr className="bg-black text-white">
                <th className="text-left px-3 py-2">รายการ</th>
                {PERMISSIONS.map((perm) => (
                  <th key={perm} className="px-3 py-2 text-center whitespace-nowrap">
                    {perm}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* ✅ แถว “ทั้งหมด” */}
              <tr className="bg-gray-100 border-b font-medium">
                <td className="text-left px-3 py-2">ทั้งหมด</td>
                {PERMISSIONS.map((perm) => (
                  <td key={perm} className="text-center px-3 py-2">
                    <input
                      type="checkbox"
                      checked={isColumnAllChecked(perm)}
                      onChange={() => handleToggleColumn(perm)}
                    />
                  </td>
                ))}
              </tr>

              {/* ✅ รายการปกติ */}
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
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={handleSave}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 text-sm w-full sm:w-auto"
          >
            บันทึก
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 text-sm w-full sm:w-auto"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}
