import React from 'react'
import { FaBell } from 'react-icons/fa'

export default function Dashboard() {
    const summaryCards = [
        { title: "ลูกค้า (คน)", value: "53,000", change: "+55%" },
        { title: "พนักงาน (คน)", value: "53,000", change: "+55%" },
        { title: "สินค้า", value: "53,000", change: "+55%" },
        { title: "รายการสั่งซื้อ", value: "53,000", change: "+55%" }
    ]

    const latestOrders = [
        {
            id: 1,
            customer: "นายทดสอบ",
            date: "24/12/2568 11:22น.",
            discount: 500,
            total: 15900
        }
    ]

    const topProducts = [
        {
            id: 1,
            name: "IPHONE 14 Pro",
            category: "โทรศัพท์",
            price: 15900,
            sold: 1000,
            stock: 200
        }
    ]

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card, index) => (
                    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                        <div>
                            <div className="text-xs sm:text-sm text-gray-500">{card.title}</div>
                            <div className="flex flex-row items-start">
                                <div className="text-lg sm:text-xl md:text-2xl font-semibold">{card.value}</div>
                                <div className="text-xs sm:text-sm text-green-600 font-medium ml-2 translate-y-1">{card.change}</div>
                            </div>
                        </div>
                        <div className="bg-black/90 text-white w-10 h-10 flex items-center justify-center rounded-md">
                            <FaBell className="text-base sm:text-lg md:text-xl" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Latest Orders */}
                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-3">รายการสั่งซื้อล่าสุด</h2>
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-gray-400 border-b">
                                <th className="pb-2">รหัส</th>
                                <th>ชื่อ-นามสกุลผู้ซื้อ</th>
                                <th>วันที่สั่งซื้อ</th>
                                <th>ส่วนลด</th>
                                <th>จำนวนเงิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestOrders.map((order) => (
                                <tr key={order.id} className="border-t text-gray-700">
                                    <td className="py-2">{order.id}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.date}</td>
                                    <td>{order.discount}</td>
                                    <td>{order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Top Products */}
                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-3">สินค้าขายดี</h2>
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-gray-400 border-b">
                                <th className="pb-2">รหัส</th>
                                <th>ชื่อสินค้า</th>
                                <th>หมวดหมู่</th>
                                <th>ราคา</th>
                                <th>จำนวนที่ขายแล้ว</th>
                                <th>จำนวนคงเหลือ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topProducts.map((product) => (
                                <tr key={product.id} className="border-t text-gray-700">
                                    <td className="py-2">{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.sold}</td>
                                    <td>{product.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-xs text-gray-400 text-center py-4">
                © 2025, Made with SmartCanePro
            </footer>
        </div>
    )
}
