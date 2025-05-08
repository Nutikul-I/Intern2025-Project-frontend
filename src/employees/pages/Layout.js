import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function LayoutEmployee() {
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024)

    // Toggle sidebar for small screens
    useEffect(() => {
        const handleResize = () => setSidebarOpen(window.innerWidth >= 1024)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Auto close sidebar on route change for small screens
    useEffect(() => {
        if (window.innerWidth < 1024) setSidebarOpen(false)
    }, [location.pathname])

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)


    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            {sidebarOpen && (
                <div className="fixed lg:static z-40 w-full lg:w-64 h-full">
                    <Sidebar currentPath={location.pathname} />
                </div>
            )}

            {/* Right side: Navbar + Content */}
            <div className="flex flex-col flex-1">
                {/* Navbar */}
                <header className="h-16 px-6 flex items-center justify-between">
                    <Navbar toggleSidebar={toggleSidebar} />
                </header>

                {/* Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
