import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // auth logic…
    if (email === "admin@gmail.com" && password === "password") {
      localStorage.setItem("ez-acc-tk", "your-token-here");
      window.location.href = "/home";
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5">
      {/* left: ~60% on lg */}
      <div className="col-span-1 lg:col-span-3 flex flex-col justify-center px-8 py-12 bg-white">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-semibold mb-2">ยินดีต้อนรับ</h2>
          <p className="text-sm text-gray-500 mb-8">
            กรุณากรอกอีเมลและรหัสผ่านเพื่อเข้าใช้งานระบบ
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">อีเมล</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
              <input
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <label
                htmlFor="rememberMe"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:bg-gray-400 peer-checked:bg-gray-900 transition-all"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-2.5 transition-transform"></div>
              </label>
              <span className="ml-3 text-sm select-none">จดจำฉัน</span>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            version 1.0.0
          </p>
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              © 2025, Made with .....
            </p>
          </div>
        </div>
      </div>

      {/* right: ~40% on lg */}
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
