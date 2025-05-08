// RegisterPage.js
import React, { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    citizenId: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const splitFullName = (full) => {
    // ตัดช่องว่างซ้ำ, ลบ space หน้า/หลัง แล้วแยกคำ
    const parts = full.trim().replace(/\s+/g, " ").split(" ");
    // ดึงคำแรกเป็น firstName ที่เหลือ join เป็น lastName
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    // แยกชื่อ
    const { firstName, lastName } = splitFullName(form.fullName);

    // เตรียม payload ส่งไป back‑end
    const payload = {
      first_name: firstName,
      last_name: lastName,
      citizen_id: form.citizenId,
      phone: form.phone,
      email: form.email,
      username: form.username,
      password: form.password,
    };

    console.log("payload ส่งไป API", payload);
    // TODO: fetch/axios.post("/api/register", payload) …

    alert("สมัครสมาชิกสำเร็จ (จำลอง)");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5">
      {/* left */}
      <div className="col-span-1 lg:col-span-3 flex flex-col justify-center px-8 py-12 bg-white">
        <div className=" max-w-sm w-full mx-auto">
          <h2 className="text-3xl font-semibold mb-2">สมัครสมาชิก</h2>
          <p className="text-sm text-gray-500 mb-8">
            สมัครสมาชิกของคุณเพื่อสัมผัสประสบการณ์อันเหนือชั้น
          </p>

          <form onSubmit={handleRegister} className="space-y-3">
            {/* full name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                ชื่อ–นามสกุล
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="เช่น สมชาย ใจดี"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ฟิลด์อื่น ๆ ตามเดิม ... */}
            {/* Citizen ID */}
            <div>
              <label className="block text-sm font-medium mb-1">
                บัตรประชาชน
              </label>
              <input
                name="citizenId"
                value={form.citizenId}
                onChange={handleChange}
                placeholder="xxxxxxxxxxxxx"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* เบอร์โทร */}
            <div>
              <label className="block text-sm font-medium mb-1">
                เบอร์โทรศัพท์
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="0812345678"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">อีเมล</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">ชื่อผู้ใช้</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                ยืนยันรหัสผ่าน
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              สมัครสมาชิก
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">© 2025, Made with …</p>
          </div>
        </div>
      </div>

      {/* right ~40 % */}
      <div
        className="hidden lg:flex lg:col-span-2 items-center justify-center bg-gray-800"
        style={{
          backgroundImage: "url('../assets/image/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-white text-5xl font-bold">LOGO</h1>
      </div>
    </div>
  );
}
