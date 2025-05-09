import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function CustomerFormModal({
  open,
  onClose,
  onSave,
  editingData,
}) {
  const [form, setForm] = useState({
    fullName: "",
    citizenId: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (editingData) setForm(editingData);
  }, [editingData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    // 👉 ตัวอย่าง validate เบื้องต้น
    if (form.password !== form.confirmPassword) {
      Swal.fire("รหัสผ่านไม่ตรงกัน", "", "error");
      return;
    }
    onSave(form);
    Swal.fire({
      icon: "success",
      title: "บันทึกข้อมูลสำเร็จ",
      confirmButtonText: "ตกลง",
    }).then(onClose);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {editingData ? "แก้ไขลูกค้า" : "เพิ่มลูกค้า"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {[
          { label: "ชื่อ-นามสกุล", name: "fullName" },
          { label: "บัตรประชาชน", name: "citizenId" },
          { label: "เบอร์โทรศัพท์", name: "phone" },
          { label: "อีเมล", name: "email" },
          { label: "ชื่อผู้ใช้", name: "username" },
          { label: "รหัสผ่าน", name: "password", type: "password" },
          {
            label: "ยืนยันรหัสผ่าน",
            name: "confirmPassword",
            type: "password",
          },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="mb-3">
            <label className="text-sm">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name] ?? ""}
              onChange={handleChange}
              className="mt-1 w-full border px-3 py-2 rounded"
              placeholder="placeholder"
            />
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            className="bg-gray-900 text-white px-4 py-2 rounded"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
