import React, { useState, Fragment, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Swal from "sweetalert2";
import { Dialog, Transition } from "@headlessui/react";

const itemsPerPage = 10;

export default function Discount() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, code: "", amount: 0, totalQuantity: 0, remainingQuantity: 0 });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/discount/discount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const result = await response.json();

        setDiscounts(result.data);
      } else {
        console.error("Fetch failed", response.status);
      }
    } catch (err) {
      console.error("Failed to fetch discounts", err);
    }
  };



  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSave = async () => {
    const payload = formData;

    try {
      if (isEditMode && editingDiscount) {
        await fetch(`http://localhost:8080/api/discount/update-discount`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: editingDiscount.id,
            ...payload,
          }),
        });
      } else {
        await fetch(`http://localhost:8080/api/discount/create-discount`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      Swal.fire({
        icon: "success",
        title: isEditMode ? "อัปเดตข้อมูลสำเร็จ" : "บันทึกข้อมูลสำเร็จ",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "bg-black text-white px-6 py-2 rounded-full",
        },
        buttonsStyling: false,
      });

      fetchDiscounts();
      handleCloseModal();
    } catch (error) {
      Swal.fire("เกิดข้อผิดพลาด", "", "error");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "ข้อมูลจะถูกลบถาวร",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:8080/api/discount/delete-discount?id=${id}`, {
          method: "DELETE",
          headers: {
            // "Authorization": `Bearer ${token}`,
          }
        });
        fetchDiscounts();
        Swal.fire("ลบแล้ว", "", "success");
      } catch (error) {
        Swal.fire("เกิดข้อผิดพลาด", "", "error");
        console.error(error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingDiscount(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" || name === "totalQuantity" || name === "remainingQuantity"
        ? Number(value)
        : value,
    });
  };

  const totalPages = Math.ceil(discounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = discounts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 sm:px-4 py-2 sm:py-3">
            <h2 className="text-lg sm:text-xl font-semibold">ส่วนลด</h2>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsEditMode(false);
                setFormData({ id: 0, code: "", amount: 0, totalQuantity: 0, remainingQuantity: 0 });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl"
            >
              <span className="text-sm sm:text-base">เพิ่มข้อมูล</span>
            </button>
          </div>

          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left w-16">
                  รหัส
                </th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">
                  โค้ดส่วนลด
                </th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">
                  ส่วนลด (บาท)
                </th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left">
                  จำนวนคงเหลือ
                </th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-center w-24">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((discount) => (
                <tr key={discount.id} className="border-t hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{discount.id}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{discount.code}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{discount.amount}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{discount.remainingQuantity} / {discount.totalQuantity}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3 ">
                    <button
                      className="text-yellow-500 mr-2 hover:opacity-80 text-base"
                      onClick={() => {
                        setIsEditMode(true);
                        setEditingDiscount(discount);
                        setIsModalOpen(true);
                        setFormData({
                          id: discount.id,
                          code: discount.code,
                          amount: discount.amount,
                          totalQuantity: discount.totalQuantity,
                          remainingQuantity: discount.remainingQuantity
                        })
                      }}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="text-red-500 hover:opacity-80 text-base"
                      onClick={() => handleDelete(discount.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>
          แสดง {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, discounts.length)} จากทั้งหมด{" "}
          {discounts.length} รายการ
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
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => handleCloseModal()}
        >
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
                      <label className="whitespace-nowrap font-medium w-28">
                        โค้ดส่วนลด
                      </label>
                      <input
                        name="code"
                        type="text"
                        value={formData.code}
                        onChange={handleChange}
                        className="flex-1 p-2 border rounded-md"
                        placeholder="เช่น DISCOUNT100"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="whitespace-nowrap font-medium w-28">
                        ส่วนลด (บาท)
                      </label>
                      <input
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        className="flex-1 p-2 border rounded-md"
                        placeholder="เช่น 100"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="whitespace-nowrap font-medium w-28">
                        จำนวนโค้ด
                      </label>
                      <input
                        name="totalQuantity"
                        type="number"
                        value={formData.totalQuantity}
                        onChange={handleChange}
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
    </>
  );
}
