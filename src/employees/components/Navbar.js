import React, { useState } from "react"
import { FaUser, FaSignOutAlt, FaBars, FaBell, FaCog } from "react-icons/fa"
import { useLocation } from "react-router-dom"

const Navbar = ({ toggleSidebar }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const location = useLocation()

    const handleLogout = () => {
        localStorage.removeItem("ez-acc-tk")
        window.location.href = "/login"
    }

    return (
        <div className="flex items-center justify-between w-full">
            {/* Sidebar toggle (mobile) */}
            <div className="flex items-center gap-4">
                <button
                    className="lg:hidden text-gray-600 hover:text-gray-900"
                    onClick={toggleSidebar}
                >
                    <FaBars size={22} />
                </button>

                {/* Title */}
                {location.pathname === "/employee/dashboard" && (
                    <h1 className="text-lg font-semibold text-gray-800">
                        แดชบอร์ด
                    </h1>
                )}
            </div>

            {/* User section */}
            <div className="relative flex items-center gap-4">
                {/* User */}
                <div className="flex items-center gap-2 cursor-pointer group">
                    <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                        นายทดสอบ
                    </span>
                    <FaUser className="text-gray-600 group-hover:text-gray-900" />
                </div>
                
                {/* Notification & Settings */}
                <FaBell className="text-xl text-gray-600 hover:text-gray-900 cursor-pointer transition" />

                <FaCog
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-xl text-gray-600 hover:text-gray-900 cursor-pointer transition"
                />

                {/* Dropdown */}
                {dropdownOpen && (
                    <ul className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-xl z-50 animate-fade-in">
                        <li>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2 transition"
                            >
                                <FaSignOutAlt />
                                ออกจากระบบ
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Navbar
