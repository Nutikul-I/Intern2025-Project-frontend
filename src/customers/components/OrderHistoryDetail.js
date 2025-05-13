import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FiCamera } from "react-icons/fi";

export default function OrderHistoryDetail() {
    const { id } = useParams();

    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [images, setImages] = useState([]);
    const [timestamp, setTimestamp] = useState(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            alert("อัปโหลดได้สูงสุด 5 รูปเท่านั้น");
            return;
        }
        setImages((prev) => [...prev, ...files]);
    };

    const handleReviewSubmit = () => {
        console.log("Rating:", rating);
        console.log("Review Text:", reviewText);
        console.log("Images:", images);
        const now = new Date().toLocaleString();
        setTimestamp(now);
        alert("ขอบคุณสำหรับการรีวิว!");
        setShowModal(false);
        // คุณสามารถส่งข้อมูลไป backend ที่นี่ได้
    };

    const urlImage1 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-3-202409?...';
    const urlImage2 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-4-202409?...';
    const urlImage3 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-5-202409?...';

    const mockOrderHistory = {
        id: "ORD‑240501",
        status: "กำลังดำเนินการ",
        items: [
            { id: 1, name: "Apple iPhone 14 Pro Max 128GB", image: urlImage1, price: 1399 },
            { id: 2, name: "AirPods Max Silver", image: urlImage2, price: 549 },
            { id: 3, name: "Apple Watch Series 9 GPS 41mm", image: urlImage3, price: 399 },
        ],
        address: "1131 Dusty Townline, Jacksonville, TX 40322",
        shippingCost: 0,
        discount: 50,
    };

    const subtotal = mockOrderHistory.items.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal - mockOrderHistory.discount + mockOrderHistory.shippingCost;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="text-xl font-bold mb-4">รายการสั่งซื้อ</div>

            <div className="bg-white rounded-md border border-gray-300 p-4 mb-4">
                <div className="flex justify-end mb-2">
                    <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm">
                        {mockOrderHistory.status}
                    </span>
                </div>

                <div className="space-y-2">
                    {mockOrderHistory.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-md object-cover" />
                                <div>{item.name}</div>
                            </div>
                            <div className="font-semibold">฿{item.price}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 space-y-2 text-sm text-gray-700">
                    <div className="block mb-5">
                        <span className="font-semibold text-gray-500 block mb-2">ที่อยู่</span>
                        <p>{mockOrderHistory.address}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-500 block mb-2">การจัดส่ง</span>
                        <p>{mockOrderHistory.shippingCost === 0 ? "ฟรี" : `฿${mockOrderHistory.shippingCost}`}</p>
                    </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span>ราคาสินค้า</span>
                        <span>฿{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>ส่วนลด</span>
                        <span>฿{mockOrderHistory.discount}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>ค่าจัดส่ง</span>
                        <span>฿{mockOrderHistory.shippingCost}</span>
                    </div>
                    <div className="flex justify-between text-base mt-2 pt-2 font-semibold">
                        <span>Total</span>
                        <span>฿{total}</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
                <button className="border border-black rounded-lg py-2 px-4 hover:bg-gray-100">
                    ยกเลิก/คืนเงิน
                </button>
                <button
                    className="bg-black text-white rounded-lg py-2 px-4 hover:opacity-90"
                    onClick={() => setShowModal(true)}
                >
                    ได้รับสินค้าแล้ว
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                        {/* ปุ่มปิดมุมขวาบน */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                        >
                            ×
                        </button>

                        <h2 className="text-lg font-semibold mb-4">รีวิวสินค้า</h2>

                        {/* ดาวให้คะแนน */}
                        <div className="flex mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`text-2xl cursor-pointer ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* กล่องข้อความรีวิว */}
                        <textarea
                            rows={4}
                            placeholder="เขียนรีวิวของคุณ..."
                            className="w-full border rounded p-2 mb-4"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>

                        {/* ปุ่มอัปโหลด + พรีวิวรูปในแถวเดียว */}
                        <div className="flex gap-2 items-center mb-4 flex-wrap">
                            {/* ปุ่มอัปโหลด (แสดงเฉพาะเมื่อ < 5 รูป) */}
                            {images.length < 5 && (
                                <>
                                    <label
                                        htmlFor="image-upload"
                                        className="w-16 h-16 border-2 border-dashed border-gray-400 rounded flex items-center justify-center text-gray-500 cursor-pointer hover:border-black"
                                    >
                                        <FiCamera size={24} />
                                    </label>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </>
                            )}

                            {/* พรีวิวรูป */}
                            {images.map((img, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`uploaded-${index}`}
                                        className="w-16 h-16 object-cover rounded border"
                                    />
                                </div>
                            ))}
                        </div>

                        <p className="text-sm text-gray-500 mb-4">อัปโหลดได้สูงสุด 5 รูป</p>

                        {/* ปุ่ม action */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="border border-black text-black px-4 py-2 rounded hover:bg-gray-100"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleReviewSubmit}
                            
                                className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
                            >
                                ยืนยัน
                            </button>
                        </div>

                        {/* timestamp */}
                        {timestamp && (
                            <p className="mt-4 text-xs text-gray-500">รีวิวเมื่อ: {timestamp}</p>
                        )}
                    </div>
                </div>
            )}



        </div>
    );
}
