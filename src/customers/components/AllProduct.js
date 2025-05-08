import React, { useState } from 'react';
import { FaGamepad, FaSearch } from 'react-icons/fa';

const AllProduct = () => {
    const [product] = useState([
        {
            id: "1",
            productName: "Apple iPhone 14 Pro 512GB Gold (MQ233)",
            price: "1437",
            image: "https://media.studio7thailand.com/153361/iPhone_15_Pink.png",
        },
        {
            id: "2",
            productName: "Apple iPhone 11 128GB White (MQ223)",
            price: "510",
            image: "https://media.studio7thailand.com/153361/iPhone_15_Pink.png",
        },
        {
            id: "3",
            productName: "Apple iPhone 11 128GB White (MQ223)",
            price: "550",
            image: "https://media.studio7thailand.com/153361/iPhone_15_Pink.png",
        },
        {
            id: "4",
            productName: "Apple iPhone 14 Pro 1TB Gold (MQ293)",
            price: "1499",
            image: "https://media.studio7thailand.com/153361/iPhone_15_Pink.png",
        },
        {
            id: "5",
            productName: "Apple iPhone 14 Pro 1TB Gold (MQ293)",
            price: "1399",
            image: "https://media.studio7thailand.com/153361/iPhone_15_Pink.png",
        },
        {
            id: "6",
            productName: "Apple iPhone 14 Pro 128GB Deep Purple (MQ603)",
            price: "1600",
            image: "https://media.studio7thailand.com/153361/iPhone_15_Pink.png",
        },
        {
            id: "7",
            productName: "Apple iPhone 13 mini 128GB Pink (MLK23J)",
            price: "850",
            image: "https://media.studio7thailand.com/153361/iPhone_15_Pink.png",
        },
        {
            id: "8",
            productName: "Apple iPhone 14 Pro 256GB Space Black (MQ073)",
            price: "1399",
            image: "https://media.studio7thailand.com/153361/iPhone_15_Pink.png",
        },
        {
            id: "9",
            productName: "Apple iPhone 14 Pro 256GB Silver (MQ103)",
            price: "1399",
            image: "https://media.studio7thailand.com/153361/iPhone_15_Pink.png",
        },
    ]);

    const brandList = [
        'Apple',
        'Samsung',
        'Xiaomi',
        'Poco',
        'OPPO',
        'Honor',
        'Motorola',
        'Nokia',
        'Realme',
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 p-6 max-w-[1280px] mx-auto">
            {/* Sidebar */}
            <aside className="bg-white rounded p-4 text-sm hidden md:block">
                <div className="flex items-center gap-2 font-semibold text-base mb-3">
                    <span>หมวดหมู่</span>
                </div>
                <input
                    type="text"
                    placeholder="ค้นหา"
                    className="w-full px-3 py-1 mb-4 border border-gray-300 rounded text-sm"
                />
                <ul className="space-y-1 text-sm">
                    {brandList.map((brand) => (
                        <li key={brand} className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox h-4 w-4" />
                            <span>{brand}</span>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Product Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-10 justify-items-center">
                {product.map((item) => (
                    <div
                        key={item.id}
                        className="w-full sm:w-[240px] min-h-[340px] bg-[#f7f7f7] rounded-lg p-4 shadow-[0_1px_4px_rgba(0,0,0,0.1)] hover:shadow-md transition-all mx-auto flex flex-col items-center"
                    >
                        <img
                            src={item.image}
                            alt={item.productName}
                            className="w-[180px] h-[180px] object-contain mb-4"
                        />
                        <h3 className="text-sm text-center font-medium leading-snug mb-2 line-clamp-2">
                            {item.productName}
                        </h3>
                        <p className="text-lg font-bold text-black mb-4">฿{item.price}</p>
                        <button className="w-full bg-black text-white text-sm py-1.5 rounded-md">
                            ซื้อเลย
                        </button>
                    </div>
                ))}
            </section>

            {/* Pagination */}
            <div className="col-span-full flex justify-center mt-8 text-sm">
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border rounded hover:bg-gray-100">&lt;</button>
                    {[1, 2, 3, '...', 12].map((n) => (
                        <button
                            key={n}
                            className={`px-3 py-1 border rounded ${n === 1 ? 'bg-black text-white' : 'hover:bg-gray-100'
                                }`}
                        >
                            {n}
                        </button>
                    ))}
                    <button className="px-3 py-1 border rounded hover:bg-gray-100">&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default AllProduct;
