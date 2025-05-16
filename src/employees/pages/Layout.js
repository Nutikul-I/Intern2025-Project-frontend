import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { FiX } from 'react-icons/fi'

export default function LayoutEmployee() {
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024)

    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth >= 1024)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false)
        }
    }, [location.pathname])

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar สำหรับ Desktop */}
            <div className="hidden lg:block lg:w-64 lg:shrink-0">
                <Sidebar currentPath={location.pathname} />
            </div>

            {/* Sidebar สำหรับ Mobile */}
            {sidebarOpen && window.innerWidth < 1024 && (
                <>
                    <div
                        className="fixed inset-0 z-30 bg-black/50"
                        onClick={toggleSidebar}
                    />
                    <div className="fixed z-40 w-64 h-full">
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-50"
                            onClick={toggleSidebar}
                        >
                            <FiX size={24} />
                        </button>
                        <Sidebar currentPath={location.pathname} />
                    </div>
                </>
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <header className="h-16 px-6 flex items-center justify-between">
                    <Navbar toggleSidebar={toggleSidebar} />
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
