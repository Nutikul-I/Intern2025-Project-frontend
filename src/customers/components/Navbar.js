import React from "react";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

export default function Navbar() {
  const navLinks = [
    { name: "หน้าหลัก", to: "/" },
    { name: "เกี่ยวกับเรา", to: "/about" },
    { name: "ติดต่อเรา", to: "/contact" },
    { name: "บล็อก", to: "/blog" },
  ];

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    console.log("Signing out...");
    //localStorage.removeItem("token");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-50 py-4 flex items-center">
        <NavLink to="/" className="text-2xl text-left">
          PAYZ
        </NavLink>

        {/* Search */}
        <div className="flex-1 mx-6">
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Nav links */}
        <ul className="hidden md:flex items-center space-x-6">
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

        {/* Icons */}
        <div className="flex items-center space-x-4 ml-6">
          <NavLink to="/cart" className="text-gray-600 hover:text-gray-900">
            <FiShoppingCart size={24} />
          </NavLink>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FiUser size={24} />
          </button>

          {open && (
            <div className="origin-top-full absolute top-1/12 mt-2 w-30 bg-gray-100 border border-gray-200 rounded-md shadow-lg z-20">
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
    </nav>
  );
}
