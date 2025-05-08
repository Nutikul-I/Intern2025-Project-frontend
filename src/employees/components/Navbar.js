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
        <>
            {/* Sidebar toggle (mobile) */}
            <button
                className="lg:hidden text-gray-600 hover:text-gray-900 mr-4"
                onClick={toggleSidebar}
            >
                <FaBars size={20} />
            </button>

            {/* Title */}

            {location.pathname === "/employee/dashboard" ?
                <h1 className="text-lg font-semibold text-gray-800">แดชบอร์ด</h1>
                : <h1 className="text-lg font-semibold text-gray-800"></h1>
            }

            {/* User Dropdown */}
            <div className="relative flex items-center gap-4 text-gray-600">
                <FaUser className="text-xl" />

                <button

                    className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                    นายทดสอบ
                </button>

                <FaCog
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-xl cursor-pointer hover:text-gray-900" />
                    
                <FaBell className="text-xl cursor-pointer hover:text-gray-900" />

                {/* Dropdown */}
                {dropdownOpen && (
                    <ul className="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <li>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                            >
                                <FaSignOutAlt />
                                ออกจากระบบ
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </>
    )
}

export default Navbar
