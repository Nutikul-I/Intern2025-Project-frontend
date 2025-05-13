import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  /* ───────── navigation links ───────── */
  const navLinks = [
    { name: "หน้าหลัก", to: "/home" },
    { name: "เกี่ยวกับเรา", to: "/about" },
    { name: "ติดต่อเรา", to: "/contact" },
    { name: "บล็อก", to: "/blog" },
  ];

  /* ───────── local state ───────── */
  const [openUser, setOpenUser] = useState(false); // dropdown (desktop-mobile)
  const [openMobile, setOpenMobile] = useState(false); // hamburger panel
  const [mobileTab, setMobileTab] = useState("menu"); // "menu" | "account"
  const userRef = useRef(null);

  /* ───────── click-outside: ปิด dropdown ───────── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setOpenUser(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ───────── sign-out (demo) ───────── */
  const handleSignOut = () => {
    console.log("Signing out…");
    window.location.href = "/login";
  };

  /* ───────── helpers ───────── */
  const navActive = "text-gray-900 font-semibold";
  const navNormal = "text-gray-600 hover:text-gray-900";

  const closeMobile = () => {
    setOpenMobile(false);
    setMobileTab("menu");
  };

  return (
    <nav className="bg-white shadow-sm">
      {/* ===== top bar / container ===== */}
      <div
        className="relative  /* ให้ dropdown ตำแหน่งอิงได้ */
                   container mx-auto
                   px-6 md:px-10 lg:px-24 xl:px-40 2xl:px-80
                   py-4 flex items-center justify-between"
      >
        {/* ---- brand + hamburger ---- */}
        <div className="flex items-center">
          <button
            className="md:hidden p-2 mr-2 text-gray-600 hover:text-gray-900"
            onClick={() => setOpenMobile((p) => !p)}
          >
            {openMobile ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <NavLink to="/home" className="text-2xl font-bold">
            PAYZ
          </NavLink>
        </div>

        {/* ---- desktop search ---- */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-3 top-7 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* ---- desktop nav links ---- */}
        <ul className="hidden md:flex flex-1 items-center justify-evenly md:gap-8 md:mr-10 whitespace-nowrap text-sm">
          {navLinks.map(({ name, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => (isActive ? navActive : navNormal)}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ---- desktop icons + user ---- */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart icon */}
          <NavLink to="/cart" className="text-gray-600 hover:text-gray-900">
            <FiShoppingCart size={24} />
          </NavLink>

          {/* User dropdown wrapper */}
          <div className="relative inline-block" ref={userRef}>
            <button
              onClick={() => setOpenUser((p) => !p)}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <FiUser size={24} />
            </button>

            {openUser && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-32 ml-16 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========== MOBILE PANEL ========== */}
      {openMobile && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4">
          {/* --- TAB HEADER (icon row) --- */}
          <div className="flex items-center space-x-6 mb-4">
            <button
              className={`flex-1 text-center py-1 rounded
                ${mobileTab === "menu" ? "bg-gray-100 font-semibold" : ""}`}
              onClick={() => setMobileTab("menu")}
            >
              เมนู
            </button>
            <button
              className={`flex-1 text-center py-1 rounded flex items-center justify-center gap-1
                ${mobileTab === "account" ? "bg-gray-100 font-semibold" : ""}`}
              onClick={() => setMobileTab("account")}
            >
              <FiUser />
              บัญชี
            </button>
          </div>

          {/* --- TAB CONTENTS --- */}
          {mobileTab === "menu" && (
            <>
              {/* search */}
              <div className="mb-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-7 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* links */}
              <ul className="space-y-2 mb-4">
                {[
                  { name: "หน้าหลัก", to: "/" },
                  { name: "เกี่ยวกับเรา", to: "/about" },
                  { name: "ติดต่อเรา", to: "/contact" },
                  { name: "บล็อก", to: "/blog" },
                ].map(({ name, to }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={closeMobile}
                      className="block py-2 text-gray-700 hover:text-gray-900"
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* cart icon */}
              <NavLink
                to="/cart"
                onClick={closeMobile}
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FiShoppingCart size={24} />
                <span>ตะกร้า</span>
              </NavLink>
            </>
          )}

          {mobileTab === "account" && (
            <div className="space-y-2">
              <button
                onClick={() => {
                  closeMobile();
                  handleSignOut();
                }}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
