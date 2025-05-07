//รายละเอียดสินค้า
import React, { useState, useEffect } from 'react';
import {
    FiCpu,
    FiSmartphone,
    FiBatteryCharging,
    FiCamera,
    FiBox,
    FiRefreshCcw,
    FiMaximize,
    FiTruck,
    FiChevronDown,
    FiChevronUp,
} from 'react-icons/fi';
import { FaWeightHanging } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { useMemo } from 'react';


const ProductDetail = ({ id }) => {
    const ratingLabels = ['ยอดเยี่ยม', 'ดี', 'ปานกลาง', 'น้อย', 'น้อยที่สุด'];
    const urlImage1 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-3-202409?wid=728&hei=666&fmt=p-jpg&qlt=95&.v=VWJuckJvbkZqeTMwRFJZSHhSVnN1K2tBbTY2NGE0RXZvM3VONU9MVlluajBVMUIwNFV6MXNoZGhsYWgvZGlmdEJnNER5bEtzeFpoMTlNVnpVcXBTR0NDaXNCSFl3ajdkc3ZBMkZreEM2YjArdUxKZmY1NUtWbjl2NkdEREpaOVo';
    const urlImage2 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-4-202409?wid=728&hei=666&fmt=p-jpg&qlt=95&.v=VWJuckJvbkZqeTMwRFJZSHhSVnN1MkFHWWpDb2ppck82bmpENkNWZUM0NzBVMUIwNFV6MXNoZGhsYWgvZGlmdEJnNER5bEtzeFpoMTlNVnpVcXBTR0NDaXNCSFl3ajdkc3ZBMkZreEM2YjI0NE5IR1RUbnBUQTJGS1ZGNEhUQXQ'
    const urlImage3 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-5-202409?wid=728&hei=666&fmt=p-jpg&qlt=95&.v=VWJuckJvbkZqeTMwRFJZSHhSVnN1MTI4R01NYzQ5TmlRamcxYlliTzlWWDBVMUIwNFV6MXNoZGhsYWgvZGlmdEJnNER5bEtzeFpoMTlNVnpVcXBTR0NDaXNCSFl3ajdkc3ZBMkZreEM2YjNnVnBiQ2pQUjBvUDRldVRhMUpoaE8'
    const urlImage4 = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone16pro-digitalmat-gallery-6-202409?wid=728&hei=666&fmt=p-jpg&qlt=95&.v=VWJuckJvbkZqeTMwRFJZSHhSVnN1MHBNenpFWXFNMi9za2Z0azRyVHRmYjBVMUIwNFV6MXNoZGhsYWgvZGlmdEJnNER5bEtzeFpoMTlNVnpVcXBTR0NDaXNCSFl3ajdkc3ZBMkZreEM2YjI3UDJPSGpmV2pyeTVpc1NnNCs1Vzg'

    const [ProductDetail, setProductDeProductDetail] = useState({
        id: 1,
        image: [
            {
                id: 1,
                image: urlImage1
            },
            {
                id: 2,
                image: urlImage2
            },
            {
                id: 3,
                image: urlImage3
            },
            {
                id: 4,
                image: urlImage4
            }
        ],
        name: 'Product Name',
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        price: 100,
        currencySymbol: '$',
        category: 'Category Name',
        color: [
            {
                id: 1,
                name: 'Red',
                hex: '#FF0000'
            },
            {
                id: 2,
                name: 'Blue',
                hex: '#0000FF'
            }
        ],
        detail: [
            {
                id: 1,
                icon: <FiSmartphone className="text-xl" />, // หน้าจอ
                name: 'Screen Size',
                description: '6.1"'
            },
            {
                id: 2,
                icon: <FiCpu className="text-xl" />, // CPU
                name: 'CPU',
                description: 'Apple A17 Pro'
            },
            {
                id: 3,
                icon: <FiRefreshCcw className="text-xl" />, // จำนวน Core
                name: 'Number of Cores',
                description: '6 Cores'
            },
            {
                id: 4,
                icon: <FiCamera className="text-xl" />, // กล้องหลัก
                name: 'Main Camera',
                description: '48-12-12 MP'
            },
            {
                id: 5,
                icon: <FiCamera className="text-xl" />, // กล้องหน้า
                name: 'Front Camera',
                description: '12 MP'
            },
            {
                id: 6,
                icon: <FiBatteryCharging className="text-xl" />, // แบตเตอรี่
                name: 'Battery',
                description: '3500 mAh'
            },
            {
                id: 7,
                icon: <FaWeightHanging className="text-xl" />, // น้ำหนัก
                name: 'Weight',
                description: '200 g'
            },
            {
                id: 8,
                icon: <FiMaximize className="text-xl" />, // ขนาด
                name: 'Dimensions',
                description: '147.6 x 71.6 x 7.8 mm'
            }
        ],
        review: [
            { id: 1, icon: urlImage1, name: 'คุณเอ', rating: 5, description: 'ดีมาก', updatedAt: '2023-10-01' },
            { id: 2, icon: urlImage1, name: 'คุณเอเอ', rating: 5, description: 'ดีมาก', updatedAt: '2023-10-01' },
            { id: 3, icon: urlImage1, name: 'คุณเอเอเอ', rating: 5, description: 'ดีมาก', updatedAt: '2023-10-01' },
            { id: 4, icon: urlImage1, name: 'คุณบี', rating: 4, description: 'โอเคครับ', updatedAt: '2023-10-02' },
            { id: 5, icon: urlImage1, name: 'คุณซี', rating: 5, description: 'คุ้มราคา', updatedAt: '2023-10-03' },
            { id: 6, icon: urlImage1, name: 'คุณดี', rating: 3, description: 'เฉยๆ', updatedAt: '2023-10-04' },
            { id: 7, icon: urlImage1, name: 'คุณดี', rating: 3, description: 'เฉยๆ', updatedAt: '2023-10-04' },
        ]
    }
    );
    const [products, setProducts] = useState([
        {
            id: 1,
            image: urlImage1,
            name: 'Product Name 1',
            price: 100,
            currencySymbol: '$',
        },
        {
            id: 2,
            image: urlImage2,
            name: 'Product Name 2',
            price: 150,
            currencySymbol: '$',
        },
        {
            id: 3,
            image: urlImage3,
            name: 'Product Name 3',
            price: 200,
            currencySymbol: '$',
        },
        {
            id: 4,
            image: urlImage4,
            name: 'Product Name 4',
            price: 250,
            currencySymbol: '$',
        },
        {
            id: 5,
            image: urlImage1,
            name: 'Product Name 5',
            price: 300,
            currencySymbol: '$',
        },
        {
            id: 6,
            image: urlImage2,
            name: 'Product Name 6',
            price: 350,
            currencySymbol: '$',
        },
        {
            id: 7,
            image: urlImage3,
            name: 'Product Name 7',
            price: 400,
            currencySymbol: '$',
        },
        {
            id: 8,
            image: urlImage4,
            name: 'Product Name 8',
            price: 450,
            currencySymbol: '$',
        }
    ]);

    const [selectedImage, setSelectedImage] = useState(ProductDetail.image[0].image);

    useEffect(() => {

    }, []);

    const [expanded, setExpanded] = useState(false);

    const maxLength = 150;
    const description = ProductDetail.description;
    const isLong = description.length > maxLength;

    const displayedText = expanded || !isLong
        ? description
        : description.slice(0, maxLength).trim() + '...';

    const [showAll, setShowAll] = useState(false);
    const visibleDetails = showAll ? ProductDetail.detail : ProductDetail.detail.slice(0, 6);

    const reviews = ProductDetail.review;

    // คำนวณคะแนนเฉลี่ยและจำนวนในแต่ละระดับ
    const { average, ratingCounts } = useMemo(() => {
        const counts = [0, 0, 0, 0, 0]; // index 0 = 1 star, ..., index 4 = 5 stars
        let total = 0;

        reviews.forEach(({ rating }) => {
            counts[rating - 1]++;
            total += rating;
        });

        const average = reviews.length ? (total / reviews.length).toFixed(1) : 0;
        return { average, ratingCounts: counts };
    }, [reviews]);

    const renderStars = (score) => {
        const fullStars = Math.floor(score);
        const hasHalfStar = score % 1 >= 0.25 && score % 1 < 0.75;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex gap-0.5">
                {[...Array(fullStars)].map((_, i) => (
                    <AiFillStar key={`full-${i}`} className="text-yellow-500 w-5 h-5" />
                ))}
                {hasHalfStar && (
                    <AiTwotoneStar className="text-yellow-400 w-5 h-5" key="half" />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <AiOutlineStar key={`empty-${i}`} className="text-yellow-300 w-5 h-5" />
                ))}
            </div>
        );
    };

    const [showAllReview, setShowAllReview] = useState(false);

    const displayedReviews = showAllReview ? ProductDetail.review : ProductDetail.review.slice(0, 3);

    return (
        <div className="container mx-auto my-5 px-4">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Image Section */}
                <div className="flex flex-row justify-center lg:flex-row gap-4 w-full lg:w-1/2">
                    {/* Thumbnail List */}
                    <div className="flex flex-col lg:flex-col gap-4">
                        {ProductDetail.image.map((img, idx) => (
                            <img
                                key={idx}
                                src={img.image}
                                alt={`Thumbnail ${idx}`}
                                className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
                                onClick={() => setSelectedImage(img.image)}
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex justify-center items-start">
                        <img
                            src={selectedImage}
                            alt={ProductDetail.name}
                            className="w-80 h-auto rounded-xl object-contain"
                        />
                    </div>
                </div>

                {/* Right Info Section */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-2xl font-bold">{ProductDetail.name}</h1>

                    {/* Price */}
                    <div className="mt-2 flex items-center gap-4">
                        <span className="text-xl font-semibold text-black">
                            {ProductDetail.currencySymbol}
                            {ProductDetail.price}
                        </span>
                        <span className="text-gray-500 line-through">
                            {ProductDetail.currencySymbol}
                            {ProductDetail.price + 100}
                        </span>
                    </div>

                    {/* Color Options */}
                    <div className="mt-4">
                        <p className="text-base mb-2">เลือกสี :</p>
                        <div className="flex gap-2">
                            {ProductDetail.color.map((color, index) => (
                                <div
                                    key={index}
                                    className="w-6 h-6 rounded-full border border-gray-400"
                                    style={{ backgroundColor: color.hex }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Specs / Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {visibleDetails.map((item) => (
                            <div
                                key={item.id}
                                className="bg-gray-100 p-2 rounded-lg text-sm justify-center items-center"
                            >
                                <div className="grid grid-cols-3 items-center justify-center">
                                    {/* Left: Icon */}
                                    <div className="text-gray-500 text-xl justify-center items-center">
                                        {item.icon}
                                    </div>

                                    {/* Right: Text */}
                                    <div className="col-span-2 items-center">
                                        <p className="text-gray-500">{item.name}</p>
                                        <p className="text-gray-900">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="mt-6 text-gray-600 text-sm leading-relaxed">
                        <p>
                            {displayedText}
                            {isLong && !expanded && (
                                <button
                                    onClick={() => setExpanded(true)}
                                    className="text-gray-500 hover:underline ml-1"
                                >
                                    more
                                </button>
                            )}
                            {expanded && (
                                <button
                                    onClick={() => setExpanded(false)}
                                    className="text-gray-500 hover:underline ml-2"
                                >
                                    less
                                </button>
                            )}
                        </p>
                    </div>

                    {/* Add to cart */}
                    <button className="mt-6 bg-black text-white px-5 py-3 rounded-lg w-full">
                        เพิ่มเข้าตะกร้า
                    </button>

                    {/* Delivery Info */}


                    <div className="mt-6 flex flex-row justify-around text-center text-sm text-gray-500">
                        <div className="flex flex-row items-center">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                <FiTruck className="text-base" />
                            </div>
                            <div className="ml-2">
                                <p>ส่งฟรี</p>
                                <p className='text-gray-700'>1-2 วัน</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                <FiBox className="text-base" />
                            </div>
                            <div className="ml-2">
                                <p>มีสินค้าพร้อมส่ง</p>
                                <p className='text-gray-700'>Today</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                <FiRefreshCcw className="text-base" />
                            </div>
                            <div className="ml-2">
                                <p>การันตีหลังขาย</p>
                                <p className='text-gray-700'>1 ปี</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* detail */}
            <div className="mt-8 bg-white- p-5">

                <h2 className="text-xl font-semibold mb-4">รายละเอียดสินค้า</h2>
                <p className="text-sm text-gray-700">
                    {ProductDetail.description}
                </p>

                <div className="mt-4">
                    <div className="divide-y divide-gray-200">
                        {visibleDetails.map((item) => (
                            <div
                                key={item.id}
                                className="mt-2 flex flex-row items-center justify-between py-2"
                            >
                                <p className="text-gray-800">{item.name}</p>
                                <p className="text-gray-700">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* View More Button */}
                    {ProductDetail.detail.length > 6 && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="px-4 py-1 text-sm border border-gray-700 rounded-md text-gray-700 bg-white hover:bg-gray-100"
                            >
                                <div className="flex items-center justify-center gap-1">
                                    {showAll ? 'View less' : 'View more '}
                                    {showAll ? <FiChevronUp className="text-base" /> : <FiChevronDown className="text-base" />}
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Review */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 ">รีวิว</h2>
                <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
                    {/* คะแนนรวม */}
                    <div className="bg-gray-50 p-6 rounded-lg text-center w-full md:w-1/3 shadow-sm">
                        <p className="text-4xl font-bold text-gray-800">{average}</p>
                        <div className="my-3 flex justify-center">
                            {renderStars(average)}
                        </div>
                        <p className="text-sm text-gray-500">{reviews.length} รีวิวทั้งหมด</p>
                    </div>

                    {/* แยกระดับดาว */}
                    <div className="w-full md:w-2/3 space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div
                                key={star}
                                className="flex items-center gap-3 text-sm text-gray-700"
                            >
                                {/* ป้ายระดับ */}
                                <div className="w-24 text-gray-600">{ratingLabels[5 - star]}</div>

                                {/* แถบแสดงผล */}
                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-500 transition-all duration-300"
                                        style={{
                                            width: `${(ratingCounts[star - 1] / reviews.length) * 100}%`,
                                        }}
                                    />
                                </div>

                                {/* จำนวน */}
                                <div className="w-8 text-right text-gray-700">
                                    {ratingCounts[star - 1]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* รายการรีวิว */}
                {displayedReviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-gray-50 p-4 rounded-lg mb-4 text-sm flex gap-4"
                    >
                        <img
                            src={review.icon}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div className="flex flex-col w-full">
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-semibold text-gray-800">{review.name}</p>
                                <p className="text-xs text-gray-400">{review.updatedAt}</p>
                            </div>

                            <div className="mb-2">{renderStars(review.rating)}</div>

                            <p className="text-gray-600 leading-relaxed">
                                {review.description}
                            </p>
                        </div>
                    </div>
                ))}

                {reviews.length > 3 && (
                    <div className="text-center">
                        <button
                            onClick={() => setShowAllReview(!showAllReview)}
                            className="mt-2 px-4 py-1 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition"
                        >
                            <div className="flex items-center justify-center gap-1">
                                {showAll ? 'View less' : 'View more '}
                                {showAll ? <FiChevronUp className="text-base" /> : <FiChevronDown className="text-base" />}
                            </div>
                        </button>
                    </div>
                )}
            </div>

            {/* other products */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">สินค้าอื่นๆที่คุณอาจสนใจ</h2>
                <div className="flex overflow-x-auto gap-4 pb-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition flex-none w-60"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-32 object-cover rounded-lg mb-2"
                            />
                            <h3 className="text-sm font-semibold">{product.name}</h3>
                            <p className="text-gray-500">
                                {product.currencySymbol}
                                {product.price}
                            </p>
                            <button className="mt-2 bg-black text-white px-5 py-3 rounded-lg w-full">
                                ซื้อเลย
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ProductDetail;