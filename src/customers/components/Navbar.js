import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Navbar() {
  const navLinks = [
    { name: "หน้าหลัก", to: "/" },
    { name: "เกี่ยวกับเรา", to: "/about" },
    { name: "ติดต่อเรา", to: "/contact" },
    { name: "บล็อก", to: "/blog" },
  ];

  const [openUser, setOpenUser] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const userRef = useRef(null);

  // ปิดเมนู User เมื่อคลิกนอก
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setOpenUser(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    console.log("Signing out...");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-8 lg:px-64 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="md:hidden p-2 mr-2 text-gray-600 hover:text-gray-900"
            onClick={() => setOpenMobile(!openMobile)}
          >
            {openMobile ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <NavLink to="/" className="text-2xl font-bold">
            PAYZ
          </NavLink>
        </div>

        <div className="hidden md:flex flex-1 mx-6">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex md:mr-10 items-center justify-evenly flex-1">
          {navLinks.map(({ name, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-900 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Icons + User */}
        <div
          className="hidden md:flex items-center space-x-4 px-10"
          ref={userRef}
        >
          <NavLink
            to="/cart"
            className="text-gray-600 hover:text-gray-900"
          >
            <FiShoppingCart size={24} />
          </NavLink>
          <button
            onClick={() => setOpenUser(!openUser)}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FiUser size={24} />
          </button>
          {openUser && (
            <div className="absolute right-4 top-16 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
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

      {/* Mobile Menu */}
      {openMobile && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4">
          {/* Search on mobile */}
          <div className="mb-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-7 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Links */}
          <ul className="space-y-2 mb-4">
            {navLinks.map(({ name, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setOpenMobile(false)}
                  className="block py-2 text-gray-700 hover:text-gray-900"
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Icons + Sign Out on mobile */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/cart"
              onClick={() => setOpenMobile(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FiShoppingCart size={24} />
            </NavLink>
            <button
              onClick={() => {
                setOpenMobile(false);
                handleSignOut();
              }}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <FiUser size={24} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}