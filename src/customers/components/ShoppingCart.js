//ตะกร้าสินค้า
import React, { useState } from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Apple iPhone 14 Pro Max Deep Purple',
      price: 13990,
      quantity: 1,
      image: 'https://media.studio7thailand.com/154748/iPhone_16_Pro_White_Titanium_PDP_Image_Position_1a_Natural_Titanium_Color__TH-TH-square_medium.png',
      code: '#23198526913894',
    },
    {
      id: 2,
      name: 'AirPods Max Silver',
      price: 5490,
      quantity: 1,
      image: 'https://media.studio7thailand.com/154748/iPhone_16_Pro_White_Titanium_PDP_Image_Position_1a_Natural_Titanium_Color__TH-TH-square_medium.png',
      code: '#53495358345',
    },
    {
      id: 3,
      name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium',
      price: 3990,
      quantity: 1,
      image: 'https://media.studio7thailand.com/154748/iPhone_16_Pro_White_Titanium_PDP_Image_Position_1a_Natural_Titanium_Color__TH-TH-square_medium.png',
      code: '#68332224',
    },
  ]);

  const [discount, setDiscount] = useState(500);
  const [promoCode, setPromoCode] = useState('');

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const finalPrice = totalPrice - discount;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Cart Items */}
      <div className="flex-1 bg-white p-6 rounded-lg ">
        <h2 className="text-xl font-bold mb-4">ตะกร้าสินค้า</h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4 mb-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.code}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className="px-2 py-1 bg-white-200 rounded"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="px-2 py-1 bg-white-200 rounded"
              >
                +
              </button>
            </div>
            <p className="w-20 text-right">{`฿${item.price * item.quantity}`}</p>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-black-500 ml-4"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="w-full md:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-bold mb-4">สรุปคำสั่งซื้อ</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">โค้ดส่วนลด</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full sm:flex-1 px-4 py-2 border rounded"
              placeholder="กรอกโค้ดส่วนลด"
            />
            <button className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded">
              ยืนยัน
            </button>
          </div>
        </div>

        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>ราคาสุทธิ</span>
          <span>{`฿${totalPrice}`}</span>
        </div>

        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>ส่วนลด</span>
          <span>{`฿${discount}`}</span>
        </div>

        <div className="flex justify-between font-bold text-base sm:text-lg mb-4">
          <span>ราคารวมทั้งสิ้น</span>
          <span>{`฿${finalPrice}`}</span>
        </div>

        <button className="w-full bg-black text-white py-2 rounded text-sm sm:text-base">
          ยืนยันคำสั่งซื้อ
        </button>
      </div>

    </div>
  );
};

export default ShoppingCart;
