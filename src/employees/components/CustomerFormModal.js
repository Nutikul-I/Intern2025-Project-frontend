import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  createCustomer,
  updateCustomer,
} from "../../Services/customerService.js";

export default function CustomerFormModal({
  open,
  onClose,
  onSaved,         // callback รีเฟรช list
  editingData,     // undefined → create, มีค่า → edit
}) {
  /* ── local form state ─────────────────────────── */
  const [form, setForm] = useState({
    fullName: "",
    citizenId: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  /* ── sync เมื่อเปลี่ยน editingData ───────────── */
  useEffect(() => {
    if (!editingData) {
      setForm({
        fullName: "",
        citizenId: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      return;
    }

    const fullName =
      (editingData.FirstName || "") +
      (editingData.LastName ? " " + editingData.LastName : "");

    setForm({
      fullName,
      citizenId: editingData.NationalID || "",
      phone: editingData.Phone || "",
      email: editingData.Email || "",
      username: editingData.UserName || "",
      password: "",
      confirmPassword: "",
    });
  }, [editingData]);

  /* ── handler เปลี่ยนค่า ────────────────────── */
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  /* ── helper: แปลง Axios error → {title, message} ───────── */
  function mapAxiosError(err) {
    if (!err.response) {
      return {
        title: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        message:
          "ระบบไม่สามารถติดต่อเซิร์ฟเวอร์ได้ในขณะนี้ กรุณาตรวจสอบอินเทอร์เน็ตหรือรอซักครู่แล้วลองใหม่",
      };
    }

    const { status, data } = err.response;
    const rawMsg = (data?.message || data?.error || "").toLowerCase();

    /* ---------- 409: duplicate ---------- */
    if (status === 409 || rawMsg.includes("duplicate") || rawMsg.includes("exists")) {
      if (rawMsg.includes("email")) {
        return {
          title: "อีเมลซ้ำ",
          message: `อีเมล ${form.email} มีอยู่ในระบบแล้ว กรุณาใช้อีเมลอื่น`,
        };
      }
      if (rawMsg.includes("username")) {
        return {
          title: "ชื่อผู้ใช้ซ้ำ",
          message: `ชื่อผู้ใช้ ${form.username} มีอยู่ในระบบแล้ว กรุณาใช้ชื่อผู้ใช้อื่น`,
        };
      }
      if (rawMsg.includes("national")) {
        return {
          title: "เลขบัตรประชาชนซ้ำ",
          message: `เลขบัตรประชาชน ${form.citizenId} มีอยู่ในระบบแล้ว`,
        };
      }
      if (rawMsg.includes("phone")) {
        return {
          title: "เบอร์โทรศัพท์ซ้ำ",
          message: `เบอร์โทรศัพท์ ${form.phone} มีอยู่ในระบบแล้ว`,
        };
      }
      return { title: "ข้อมูลซ้ำ", message: "มีข้อมูลซ้ำในระบบ กรุณาตรวจสอบอีกครั้ง" };
    }

    /* ---------- 400: validation ---------- */
    if (status === 400 || rawMsg.includes("invalid")) {
      if (rawMsg.includes("email")) {
        return { title: "อีเมลไม่ถูกต้อง", message: "รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบ" };
      }
      if (rawMsg.includes("phone")) {
        return { title: "เบอร์โทรไม่ถูกต้อง", message: "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง" };
      }
      if (rawMsg.includes("national")) {
        return { title: "เลขบัตรไม่ถูกต้อง", message: "เลขบัตรประชาชนไม่ถูกต้อง" };
      }
      return {
        title: "ข้อมูลไม่ถูกต้อง",
        message: data?.message || "กรุณาตรวจสอบข้อมูลที่กรอก",
      };
    }

    /* ---------- 404 ---------- */
    if (status === 404) {
      return { title: "ไม่พบข้อมูล", message: "รายการที่ต้องการไม่พบในระบบ" };
    }

    /* ---------- 401 / 403 ---------- */
    if (status === 401 || status === 403) {
      return {
        title: "ไม่ได้รับอนุญาต",
        message: "คุณไม่มีสิทธิ์ดำเนินการ กรุณาเข้าสู่ระบบใหม่หรือขอสิทธิ์เพิ่มเติม",
      };
    }

    /* ---------- 5xx ---------- */
    return {
      title: "ข้อผิดพลาดจากเซิร์ฟเวอร์",
      message: data?.message || "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่ภายหลัง",
    };
  }

  /* ── submit ─────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (!editingData && !form.password) ||
      (form.password && form.password !== form.confirmPassword)
    ) {
      return Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ถูกต้อง",
        text: editingData
          ? "กรุณาตรวจสอบรหัสผ่านและยืนยันรหัสผ่านให้ตรงกัน"
          : "กรุณากรอกรหัสผ่านและตรวจสอบให้ตรงกัน",
        confirmButtonText: "ตกลง",
      });
    }

    /* แตกชื่อ */
    const parts = form.fullName.trim().split(/\s+/);
    const firstName = parts.shift() || "";
    const lastName = parts.join(" ");

    /* payload */
    const payload = {
      FirstName: firstName,
      LastName: lastName,
      NationalID: form.citizenId,
      Phone: form.phone,
      Email: form.email,
      Username: form.username,
      Addresses: editingData?.Addresses || [],
    };
    if (form.password) payload.Password = form.password;

    try {
      if (editingData) {
        await updateCustomer(editingData.ID, payload);
      } else {
        await createCustomer(payload);
      }

      await Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        confirmButtonText: "ตกลง",
      });

      onClose();
      onSaved?.(); // refresh list
    } catch (err) {
      console.error(err);
      const { title, message } = mapAxiosError(err);

      await Swal.fire({
        icon: "error",
        title,
        text: message,
        confirmButtonText: "ตกลง",
      });
    }
  };

  /* ── UI ───────────────────────────────────────── */
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-lg p-4">
        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {editingData ? "แก้ไขลูกค้า" : "เพิ่มลูกค้าใหม่"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit}>
          {[
            { label: "ชื่อ-นามสกุล", name: "fullName" },
            { label: "บัตรประชาชน", name: "citizenId" },
            { label: "เบอร์โทรศัพท์", name: "phone", type: "tel" },
            { label: "อีเมล", name: "email", type: "email" },
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
                value={form[name]}
                onChange={handleChange}
                required={
                  name !== "password" && name !== "confirmPassword"
                    ? true
                    : !editingData
                }
                className="mt-1 w-full border px-3 py-2 rounded"
                placeholder={label}
              />
            </div>
          ))}

          {/* footer buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-2 rounded"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
