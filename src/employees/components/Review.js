import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import ReviewModal from "./ReviewModal";

export default function ReviewPage() {
  const [allReviews, setAllReviews] = useState([]); // ✅ เก็บข้อมูลทั้งหมด
  const [reviews, setReviews] = useState([]);       // ✅ เฉพาะหน้านี้
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const itemsPerPage = 10;
  const totalItems = 85;

  // ✅ Fake data 85 รายการ
  useEffect(() => {
    const fakeData = Array.from({ length: totalItems }, (_, i) => ({
      id: String(i + 1).padStart(7, "0"),
      productName: `สินค้า ${i + 1}`,
      productImage: "/iphone14.jpg",
      price: "฿1399",
      originalPrice: "฿1499",
      description: "รายละเอียดสินค้าจำลอง...",
      userName: `ผู้ใช้ ${i + 1}`,
      userAvatar: "/avatar.jpg",
      rating: (i % 5) + 1,
      date: "24 January, 2023",
      message: `ข้อความรีวิวจำลองของผู้ใช้หมายเลข ${i + 1}`,
      images: ["/review1.jpg", "/review2.jpg"],
    }));
    setAllReviews(fakeData);
  }, []);

  // ✅ Slice ข้อมูลให้แสดงตามหน้า
  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setReviews(allReviews.slice(start, end));
  }, [allReviews, currentPage]);

  const renderStars = (count) => (
    <div className="flex gap-0.5 sm:gap-1 text-orange-400 text-[10px] sm:text-base">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= count ? "★" : "☆"}</span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 flex justify-center overflow-hidden">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-sm p-4">
          <h2 className="text-base sm:text-lg font-bold">รีวิว</h2>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-xl shadow-sm">
          <table className="w-full text-sm text-center table-fixed">
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <thead className="text-gray-600 border-b bg-white text-center sm:text-center">
              <tr>
                <th className="px-4 py-3 sm:text-center">รหัส</th>
                <th className="px-4 py-3 sm:text-center">ชื่อสินค้า</th>
                <th className="px-4 py-3 sm:text-center">เรต</th>
                <th className="px-4 py-3 hidden sm:table-cell">ข้อความ</th>
                <th className="px-4 py-3 sm:text-center">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-gray-50 border-b items-center">
                  <td className="px-4 py-3 truncate">{rev.id}</td>
                  <td className="px-4 py-3 truncate">{rev.productName}</td>
                  <td className="px-4 py-3">{renderStars(rev.rating)}</td>
                  <td className="px-3 py-3 text-xs hidden sm:table-cell leading-tight line-clamp-2 truncate break-words max-w-[250px]">
                    {rev.message + "..."}
                  </td>
                  <td className="px-4 py-3 text-right align-top">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => {
                          setSelectedReview(rev);
                          setModalOpen(true);
                        }}
                        className="text-gray-600 hover:text-black"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="text-xs sm:text-sm text-gray-600 flex flex-col md:flex-row justify-between md:items-center items-start gap-3 mt-6">
          <div>
            แสดง {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} จากทั้งหมด {totalItems} รายการ
          </div>
          <div className="flex flex-wrap items-center gap-0.5 sm:gap-1 ml-auto">
            {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded border text-xs sm:text-sm flex items-center justify-center transition ${
                  num === currentPage
                    ? "bg-black text-white border-black"
                    : "hover:bg-gray-200 border border-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Review Modal */}
        <ReviewModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          review={selectedReview}
        />
      </div>
    </div>
  );
}
