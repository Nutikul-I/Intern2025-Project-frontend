import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMobileAlt,
  FaCamera,
  FaHeadphonesAlt,
  FaDesktop,
  FaGamepad,
  FaChevronLeft,
  FaChevronRight,
  FaRegClock,
} from "react-icons/fa";

export default function Home() {
  /* ---------- ตัวอย่างสินค้า -------------- */
  const allItems = [
    {
      id: 1,
      title: "Apple iPhone 14 Pro Max 128GB Deep Purple",
      price: 8900,
      img: "https://compasia.co.th/cdn/shop/files/iphone-14-pro-800237_600x.png?v=1746160884",
      category: "โทรศัพท์",
    },
    {
      id: 2,
      title: "Blackmagic Pocket Cinema Camera 6k",
      price: 2535,
      img: "https://compasia.co.th/cdn/shop/files/iphone-14-pro-800237_600x.png?v=1746160884",
      category: "กล้อง",
    },
    {
      id: 3,
      title: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
      price: 399,
      img: "https://compasia.co.th/cdn/shop/files/iphone-14-pro-800237_600x.png?v=1746160884",
      category: "นาฬิกา",
    },
    {
      id: 4,
      title: "AirPods Max Silver Starlight Aluminium",
      price: 549,
      img: "https://compasia.co.th/cdn/shop/files/iphone-14-pro-800237_600x.png?v=1746160884",
      category: "หูฟัง",
    },
    {
      id: 5,
      title: "Samsung Galaxy Watch6 Classic 47mm Black",
      price: 369,
      img: "https://compasia.co.th/cdn/shop/files/iphone-14-pro-800237_600x.png?v=1746160884",
      category: "นาฬิกา",
    },
    {
      id: 6,
      title: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
      price: 1799,
      img: "https://compasia.co.th/cdn/shop/files/iphone-14-pro-800237_600x.png?v=1746160884",
      category: "โทรศัพท์",
    },
    {
      id: 7,
      title: "Galaxy Buds FE Graphite | 256GB | Phantom Black",
      price: 99.99,
      img: "https://compasia.co.th/cdn/shop/files/iphone-14-pro-800237_600x.png?v=1746160884",
      category: "หูฟัง",
    },
    {
      id: 8,
      title: "Apple iPad 9 10.2'' 64GB Wi-Fi Silver (MK2L3) 2021",
      price: 398,
      img: "https://compasia.co.th/cdn/shop/files/iphone-14-pro-800237_600x.png?v=1746160884",
      category: "โทรศัพท์",
    },
    {
      id: 9,
      title: "Computer Gaming PC Intel Core i7 12700K",
      price: 398,
      img: "https://compasia.co.th/cdn/shop/files/iphone-14-pro-800237_600x.png?v=1746160884",
      category: "คอมพิวเตอร์",
    },
    {
      id: 10,
      title: "Gaming Mouse Razer Viper Ultimate",
      price: 398,
      img: "https://compasia.co.th/cdn/shop/files/iphone-14-pro-800237_600x.png?v=1746160884",
      category: "เกมมิ่ง",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const filteredItems = selectedCategory
    ? allItems.filter((it) => it.category === selectedCategory)
    : allItems;

  const canViewMore = visibleCount < filteredItems.length;
  const itemsToShow = filteredItems.slice(0, visibleCount);

  const categories = [
    { icon: FaMobileAlt, label: "โทรศัพท์" },
    { icon: FaRegClock, label: "นาฬิกา" },
    { icon: FaCamera, label: "กล้อง" },
    { icon: FaHeadphonesAlt, label: "หูฟัง" },
    { icon: FaDesktop, label: "คอมพิวเตอร์" },
    { icon: FaGamepad, label: "เกมมิ่ง" },
  ];

  const navigate = useNavigate();
  const tabs = ["สินค้ามาใหม่", "ขายดี", "แนะนำ", "สินค้าทั้งหมด"];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (idx) => {
    if (tabs[idx] === "สินค้าทั้งหมด") {
      // ถ้าเป็น tab สินค้าทั้งหมด ก็ไปหน้า /allproduct
      navigate("/allproduct");
    } else {
      // มิฉะนั้นเปลี่ยน active tab ตามปกติ
      setActiveTab(idx);
    }
  };

  /* ---------- render -------------- */
  return (
    <div className="font-sans">
      {/* ---------- HERO ---------- */}
      <section
        className="
    relative w-full 
    h-[210px] sm:h-[380px] md:h-[420px] lg:h-[600px] 
    flex items-center
    justify-center sm:justify-start
  "
        style={{
          backgroundImage: "url('https://img2.pic.in.th/pic/bggg-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" />

        <div
          className="
      relative z-10 
      px-4 lg:ml-24 sm:px-8 
      text-white 
      max-w-full sm:max-w-lg 
      text-center sm:text-left
    "
        >
          <p className="uppercase text-xs sm:text-sm lg:text-xl text-gray-400">
            ยินดีต้อนรับเข้าสู่เว็บไซต์ PAYZ
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
            IPhone 17 <span className="text-white font-extrabold">Pro</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-300">
            เป็นเจ้าของก่อนใครได้ที่นี่ ให้เราดูแลคุณสิ
          </p>
          <button className="mt-4 sm:mt-6 px-4 sm:px-8 py-2 sm:py-3 border border-white rounded hover:bg-white hover:text-gray-900 transition">
            ซื้อเลย
          </button>
        </div>
      </section>

      {/* ---------- CATEGORY CAROUSEL ---------- */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
          <h2 className="text-xl font-semibold">ค้นหาด้วยหมวดหมู่</h2>
          <div className="flex gap-3 text-2xl">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <FaChevronLeft />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:justify-center sm:gap-6 sm:overflow-x-auto sm:pb-3">
          {categories.map(({ icon: Icon, label }) => (
            <div
              key={label}
              onClick={() =>
                setSelectedCategory((c) => (c === label ? null : label))
              }
              className={`
              flex-shrink-0 min-w-[120px] flex flex-col items-center justify-center gap-3 
              rounded-lg py-6 transition cursor-pointer 
              ${
                selectedCategory === label
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 hover:bg-gray-300"
              }
            `}
            >
              <Icon className="text-3xl" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PRODUCTS TABS ---------- */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        {/* tabs */}
        <div className="flex gap-6 border-b">
          {tabs.map((t, idx) => (
            <button
              key={t}
              onClick={() => handleTabClick(idx)}
              className={`py-2 text-sm font-medium ${
                activeTab === idx
                  ? "border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {itemsToShow.map((it) => (
            <div
              key={it.id}
              className="bg-gray-100 rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={it.img}
                alt={it.title}
                className="w-32 h-32 object-contain mb-4"
              />
              <p className="text-center text-sm mb-2 line-clamp-2">
                {it.title}
              </p>
              <p className="font-semibold text-lg mb-3">
                ฿{Intl.NumberFormat().format(it.price)}
              </p>
              <button className="w-full py-2 bg-black text-white rounded hover:opacity-90 transition">
                ซื้อเลย
              </button>
            </div>
          ))}
        </div>

        {/* View More button */}
        {canViewMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + 8, filteredItems.length)
                )
              }
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition"
            >
              View More
            </button>
          </div>
        )}
      </section>

      {/* ---------- DISCOUNT BANNER ---------- */}
      <section
        className="
    relative w-full 
    h-[260px] sm:h-[320px] md:h-[340px] lg:h-[450px] 
    flex items-center justify-center text-center text-white 
    bg-cover bg-center
  "
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/wTrZbj3H/942b063efe4f8cf2ecc828f4183bd3b7d2d0cac5.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-screen-md mx-auto">
          <h2 className="font-bold mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            ลดราคา ครั้งใหญ่ในฤดูร้อน
          </h2>
          <p className="text-gray-400 mb-6 text-sm sm:text-base md:text-lg">
            แจกหนักจัดเต็มด้วยโปรสุดคุ้มให้คุณเป็นเจ้าของก่อนใคร
          </p>
          <button
            className="
      px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 
      border border-white rounded 
      hover:bg-white hover:text-gray-900 
      transition
    "
          >
            ซื้อเลย
          </button>
        </div>
      </section>
    </div>
  );
}
