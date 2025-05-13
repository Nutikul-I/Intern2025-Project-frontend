import React from "react";
import { useParams } from "react-router-dom";

export default function OrderHistoryDetail() {
    const { id } = useParams();

    // ในกรณีนี้ mock เดียว ยังไม่ต้อง filter ด้วย id ก็ได้
    const urlImage1 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-3-202409?wid=728&hei=666&fmt=p-jpg&qlt=95&.v=VWJuckJvbkZqeTMwRFJZSHhSVnN1K2tBbTY2NGE0RXZvM3VONU9MVlluajBVMUIwNFV6MXNoZGhsYWgvZGlmdEJnNER5bEtzeFpoMTlNVnpVcXBTR0NDaXNCSFl3ajdkc3ZBMkZreEM2YjArdUxKZmY1NUtWbjl2NkdEREpaOVo';
    const urlImage2 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-4-202409?wid=728&hei=666&fmt=p-jpg&qlt=95&.v=VWJuckJvbkZqeTMwRFJZSHhSVnN1MkFHWWpDb2ppck82bmpENkNWZUM0NzBVMUIwNFV6MXNoZGhsYWgvZGlmdEJnNER5bEtzeFpoMTlNVnpVcXBTR0NDaXNCSFl3ajdkc3ZBMkZreEM2YjI0NE5IR1RUbnBUQTJGS1ZGNEhUQXQ'
    const urlImage3 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-5-202409?wid=728&hei=666&fmt=p-jpg&qlt=95&.v=VWJuckJvbkZqeTMwRFJZSHhSVnN1MTI4R01NYzQ5TmlRamcxYlliTzlWWDBVMUIwNFV6MXNoZGhsYWgvZGlmdEJnNER5bEtzeFpoMTlNVnpVcXBTR0NDaXNCSFl3ajdkc3ZBMkZreEM2YjNnVnBiQ2pQUjBvUDRldVRhMUpoaE8'

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
                        <span >ราคาสินค้า</span>
                        <span>฿{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">ส่วนลด</span>
                        <span>฿{mockOrderHistory.discount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">ค่าจัดส่ง</span>
                        <span>฿{mockOrderHistory.shippingCost}</span>
                    </div>
                    <div className="flex justify-between text-base mt-2  pt-2">
                        <span>Total</span>
                        <span>฿{total}</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
                <button className="border border-black rounded-lg py-2 px-4 hover:bg-gray-100">
                    ยกเลิก/คืนเงิน
                </button>
                <button className="bg-black text-white rounded-lg py-2 px-4 hover:opacity-90">
                    ได้รับสินค้าแล้ว
                </button>
            </div>
        </div>
    );
}
