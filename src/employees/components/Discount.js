import React, { useState, Fragment } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Pagination from '@mui/material/Pagination';
import Swal from 'sweetalert2';
import { Dialog, Transition } from '@headlessui/react';

// เปลี่ยนจาก mockCategories เป็น mockDiscounts
const mockDiscounts = Array.from({ length: 85 }, (_, i) => ({
    id: i.toString().padStart(7, '0'),
    code: `DISCOUNT${(i + 1).toString().padStart(3, '0')}`,
    amount: 50 + (i % 5) * 10, // ส่วนลดระหว่าง 50–90 บาท
    quantity: 100 - (i % 20),  // จำนวนคงเหลือ
}));

const itemsPerPage = 10;

export default function Discount() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDiscountCode, setNewDiscountCode] = useState('');
    const [newDiscountAmount, setNewDiscountAmount] = useState('');
    const [newDiscountQty, setNewDiscountQty] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingDiscount, setEditingDiscount] = useState(null);


    const totalPages = Math.ceil(mockDiscounts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = mockDiscounts.slice(startIndex, startIndex + itemsPerPage);


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSave = () => {
        if (isEditMode) {
            console.log('Updating discount:', editingDiscount.id, {
                code: newDiscountCode,
                amount: newDiscountAmount,
                quantity: newDiscountQty,
            });
        } else {
            console.log('Creating new discount:', {
                code: newDiscountCode,
                amount: newDiscountAmount,
                quantity: newDiscountQty,
            });
        }

        handleCloseModal();

        Swal.fire({
            icon: 'success',
            title: isEditMode ? 'อัปเดตข้อมูลสำเร็จ' : 'บันทึกข้อมูลสำเร็จ',
            confirmButtonText: 'ตกลง',
            customClass: {
                confirmButton: 'bg-black text-white px-6 py-2 rounded-full',
            },
            buttonsStyling: false,
        });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditingDiscount(null);
        setNewDiscountCode('');
        setNewDiscountAmount('');
        setNewDiscountQty('');
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">ส่วนลด</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white px-4 py-2 rounded-lg"
                >
                    เพิ่มข้อมูล
                </button>
            </div>

            <table className="w-full text-left border-t border-gray-200">
                <thead>
                    <tr className="text-gray-500">
                        <th className="py-2">รหัส</th>
                        <th className="py-2">โค้ดส่วนลด</th>
                        <th className="py-2">ส่วนลด(บาท)</th>
                        <th className="py-2">จำนวนคงเหลือ</th>
                        <th className="py-2">จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((discount) => (
                        <tr key={discount.id} className="border-t">
                            <td className="py-2">{discount.id}</td>
                            <td className="py-2">{discount.code}</td>
                            <td className="py-2">{discount.amount}</td>
                            <td className="py-2">{discount.quantity}</td>
                            <td className="py-2">
                                <button
                                    className="text-yellow-500 mr-2 hover:opacity-80"
                                    onClick={() => {
                                        setIsEditMode(true);
                                        setEditingDiscount(discount);
                                        setNewDiscountCode(discount.code);
                                        setNewDiscountAmount(discount.amount);
                                        setNewDiscountQty(discount.quantity);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <FiEdit />
                                </button>
                                <button className="text-red-500 hover:opacity-80">
                                    <FiTrash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <div>
                    แสดง {startIndex + 1}-{Math.min(startIndex + itemsPerPage, mockDiscounts.length)} จากทั้งหมด {mockDiscounts.length} รายการ
                </div>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                />
            </div>

            {/* Modal */}
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => handleCloseModal()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
                        <div className="w-full max-w-2xl p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="bg-white p-6 rounded-xl relative shadow-xl transition-all">
                                    <button
                                        onClick={() => handleCloseModal()}
                                        className="absolute top-3 right-4 text-xl text-gray-600 hover:text-black"
                                    >
                                        &times;
                                    </button>
                                    <Dialog.Title className="text-2xl mb-6">ส่วนลด</Dialog.Title>
                                    <div className="flex flex-col gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <label className="whitespace-nowrap font-medium w-28">โค้ดส่วนลด</label>
                                            <input
                                                type="text"
                                                value={newDiscountCode}
                                                onChange={(e) => setNewDiscountCode(e.target.value)}
                                                className="flex-1 p-2 border rounded-md"
                                                placeholder="เช่น DISCOUNT100"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className="whitespace-nowrap font-medium w-28">ส่วนลด (บาท)</label>
                                            <input
                                                type="number"
                                                value={newDiscountAmount}
                                                onChange={(e) => setNewDiscountAmount(e.target.value)}
                                                className="flex-1 p-2 border rounded-md"
                                                placeholder="เช่น 100"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className="whitespace-nowrap font-medium w-28">จำนวนโค้ด</label>
                                            <input
                                                type="number"
                                                value={newDiscountQty}
                                                onChange={(e) => setNewDiscountQty(e.target.value)}
                                                className="flex-1 p-2 border rounded-md"
                                                placeholder="เช่น 50"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleCloseModal()}
                                            className="px-4 py-2 border rounded-lg"
                                        >
                                            ยกเลิก
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="bg-black text-white px-6 py-2 rounded-lg"
                                        >
                                            บันทึก
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div >
    );
}
