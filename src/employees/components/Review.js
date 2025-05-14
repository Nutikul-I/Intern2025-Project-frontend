import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import ReviewModal from "./ReviewModal";
import Pagination from "@mui/material/Pagination";

export default function ReviewPage() {
  const [allReviews, setAllReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const itemsPerPage = 10;
  const totalItems = 85;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0 flex justify-center overflow-hidden">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-sm p-4">
          <h2 className="text-lg sm:text-xl font-semibold">รีวิว</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-b-xl shadow-sm">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left w-16">
                  รหัส
                </th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">
                  ชื่อสินค้า
                </th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">เรต</th>
                <th className="hidden md:table-cell px-2 sm:px-4 py-1 sm:py-3 text-left">
                  ข้อความ
                </th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-center w-24">
                  รายละเอียด
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id} className="border-t hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{rev.id}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 truncate">
                    {rev.productName}
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">
                    {renderStars(rev.rating)}
                  </td>
                  <td className="hidden md:table-cell px-2 sm:px-4 py-1 sm:py-3 leading-tight line-clamp-2">
                    {rev.message}...
                  </td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedReview(rev);
                        setModalOpen(true);
                      }}
                      className="text-gray-600 hover:text-black"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary + MUI Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-xs sm:text-sm text-gray-600">
          <div>
            แสดง {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} จากทั้งหมด{" "}
            {totalItems} รายการ
          </div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        review={selectedReview}
      />
    </div>
  );
}
