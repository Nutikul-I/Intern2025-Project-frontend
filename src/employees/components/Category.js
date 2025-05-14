import React, { useState, Fragment } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Swal from "sweetalert2";
import { Dialog, Transition } from "@headlessui/react";

const mockCategories = Array.from({ length: 85 }, (_, i) => ({
  id: i.toString().padStart(7, "0"),
  name: `หมวดหมู่ที่ ${i + 1}`,
}));

const itemsPerPage = 10;

export default function CategoryList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null); // null หรือ object

  const totalPages = Math.ceil(mockCategories.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = mockCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSave = () => {
    handleCloseModal();

    Swal.fire({
      icon: "success",
      title: isEditMode ? "อัปเดตข้อมูลสำเร็จ" : "บันทึกข้อมูลสำเร็จ",
      confirmButtonText: "ตกลง",
      customClass: {
        confirmButton: "bg-black text-white px-6 py-2 rounded-full",
      },
      buttonsStyling: false,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategoryName("");
    setIsEditMode(false);
  };

  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 sm:px-4 py-2 sm:py-3">
            <h2 className="text-lg sm:text-xl font-semibold">หมวดหมู่</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl"
            >
              <span className="text-sm sm:text-base">เพิ่มหมวดหมู่</span>
            </button>
          </div>
          
          {/* Table */}
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-left w-16">
                  รหัส
                </th>
                <th className="px-2 sm:px-12 py-1 sm:py-3 text-left">
                  ชื่อหมวดหมู่
                </th>
                <th className="px-2 sm:px-4 py-1 sm:py-3 text-center w-24">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((cat) => (
                <tr key={cat.id} className="border-t hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-1 sm:py-3">{cat.id}</td>
                  <td className="px-2 sm:px-12 py-1 sm:py-3">{cat.name}</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-3">
                    <div className="flex items-center justify-center gap-2 text-base">
                      <button
                        className="text-yellow-500 mr-2 hover:opacity-80"
                        onClick={() => {
                          setIsEditMode(true);
                          setNewCategoryName(cat.name);
                          setIsModalOpen(true);
                        }}
                      >
                        <FaPencilAlt />
                      </button>
                      <button className="text-red-500 hover:opacity-80">
                        <FaTrash />
                      </button>
                    </div>
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
          {Math.min(startIndex + itemsPerPage, mockCategories.length)}{" "}
          จากทั้งหมด {mockCategories.length} รายการ
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
            <div className="w-full max-w-xl p-4">
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
                  <Dialog.Title className="text-2xl mb-6">
                    หมวดหมู่
                  </Dialog.Title>
                  <div className="flex items-center gap-4 mb-6">
                    <label className="whitespace-nowrap font-medium">
                      ชื่อหมวดหมู่
                    </label>
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-1 p-2 border rounded-md"
                      placeholder="placeholder"
                      required
                    />
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
