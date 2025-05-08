import React from 'react'
import { 
  FiPhone, 
  FiWatch, 
  FiCamera, 
  FiHeadphones, 
  FiMonitor 
} from 'react-icons/fi'
import { FaGamepad } from 'react-icons/fa'   // เปลี่ยนมาเอาไอคอนจาก FontAwesome

const categories = [
  { name: 'โทรศัพท์', icon: <FiPhone size={24} /> },
  { name: 'นาฬิกา', icon: <FiWatch size={24} /> },
  { name: 'กล้อง',   icon: <FiCamera size={24} /> },
  { name: 'หูฟัง',   icon: <FiHeadphones size={24} /> },
  { name: 'คอมพิวเตอร์', icon: <FiMonitor size={24} /> },
  { name: 'เกมมิ่ง',  icon: <FaGamepad size={24} /> },  // ใช้ FaGamepad แทน
]

export default function Homepage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 items-center bg-gray-900 text-white px-8 py-16">
        <div className="space-y-4 lg:pr-16">
          <p className="uppercase text-sm text-gray-400">
            ยินดีต้อนรับเข้าสู่เว็บไซต์ PAYZ
          </p>
          <h1 className="text-5xl font-extrabold">
            iPhone 17 <span className="text-white">Pro</span>
          </h1>
          <p className="text-lg text-gray-300">
            เป็นเจ้าของก่อนใครได้ที่นี่ ให้เราดูแลคุณสิ
          </p>
          <button className="mt-4 px-6 py-3 border border-white rounded hover:bg-white hover:text-gray-900 transition">
            ซื้อเลย
          </button>
        </div>
        <div className="mt-8 lg:mt-0 flex justify-center">
          <img
            src="https://www.macthai.com/wp-content/uploads/2025/04/iPhone-17-Pro-3_4ths-Perspective-Aluminum-Camera-Module-1.jpg"
            alt="iPhone 17 Pro"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>

      {/* Categories */}
      <section className="px-8 py-12">
        <h2 className="text-2xl font-semibold mb-6">ค้นหาด้วยหมวดหมู่</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ name, icon }) => (
            <div
              key={name}
              className="bg-gray-100 p-6 rounded-lg flex flex-col items-center justify-center space-y-2 hover:shadow-md cursor-pointer transition"
            >
              {icon}
              <span className="mt-1 text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
