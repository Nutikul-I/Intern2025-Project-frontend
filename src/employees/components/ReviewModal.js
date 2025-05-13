// ReviewModal.js
import { X } from "lucide-react";

export default function ReviewModal({ isOpen, onClose, review }) {
  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
      <div className="bg-white max-w-4xl w-full rounded-xl p-6 relative overflow-y-auto max-h-[90vh]">
        {/* ปุ่มปิด */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* หัวข้อ */}
        <h2 className="text-lg font-bold mb-4">รีวิว</h2>

        {/* ส่วนสินค้า */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <img
            //src={review.productImage}
            src={ 'https://media-cdn.bnn.in.th/234767/iPhone_14_Pro_Max_Deep_Purple_PDP_Image_Position-1A_Deep_Purple_1-square_medium.jpg'}
            alt="product"
            className="w-full sm:w-52 rounded-xl object-cover"
          />
          <div>
            <h3 className="text-2xl font-bold mb-1">{review.productName}</h3>
            <div className="text-xl font-semibold text-black">
              {review.price} บาท 
              <span className="line-through text-gray-400 ml-2">{review.originalPrice}</span>
            </div>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              {review.description}
            </p>
          </div>
        </div>

        {/* กล่องรีวิว */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img //src={review.userAvatar}
              src={'https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?strip=1'}
               alt="avatar" className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-semibold">{review.userName}</div>
                <div className="text-orange-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i}>{i <= review.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">{review.date}</div>
          </div>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">{review.message}</p>
          <div className="flex gap-2 mt-3">
            {review.images?.map((img, i) => (
              <img
                key={i}
                src={'https://www.tech-hangout.com/wp-content/uploads/2022/09/iPhone-14-Pro-Max-Review-44.jpg'}
                alt={`review-img-${i}`}
                className="w-20 h-20 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
