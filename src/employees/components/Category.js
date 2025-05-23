import React, { useState, Fragment, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Swal from "sweetalert2";
import { Dialog, Transition } from "@headlessui/react";

const itemsPerPage = 10;

export default function CategoryList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    // const token = localStorage.getItem("ez-acc-tk");
    // if (!token) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "ไม่พบ token",
    //     text: "กรุณาเข้าสู่ระบบใหม่",
    //   });
    //   return;
    // }
    try {
      const response = await fetch("http://127.0.0.1:8080/api/category/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();

        setCategoryData(result.data);
      } else {
        console.error("Fetch failed", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const deleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบหมวดหมู่นี้ใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/api/category/delete-category?id=${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}` // ถ้ามี auth
            },
          }
        );

        if (response.ok) {
          Swal.fire("ลบแล้ว!", "หมวดหมู่ถูกลบเรียบร้อย", "success");
          getCategory(); // โหลดข้อมูลใหม่
        } else {
          const errorData = await response.json();
          Swal.fire("เกิดข้อผิดพลาด", errorData.message || "ไม่สามารถลบได้", "error");
        }
      } catch (error) {
        Swal.fire("ข้อผิดพลาด", error.message, "error");
      }
    }
  };

  const handleSave = async () => {
    const url = isEditMode
      ? `http://127.0.0.1:8080/api/category/update-category`
      : `http://127.0.0.1:8080/api/category/create-category`;

    const method = isEditMode ? "PUT" : "POST";

    const body = isEditMode
      ? JSON.stringify({ id: selectedCategoryId, name: newCategoryName })
      : JSON.stringify({ name: newCategoryName });

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: isEditMode ? "อัปเดตข้อมูลสำเร็จ" : "บันทึกข้อมูลสำเร็จ",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "bg-black text-white px-6 py-2 rounded-full",
          },
          buttonsStyling: false,
        });

        handleCloseModal();
        getCategory(); // โหลดข้อมูลใหม่
      } else {
        const errorData = await response.json();
        Swal.fire("เกิดข้อผิดพลาด", errorData.message || "ไม่สามารถบันทึกได้", "error");
      }
    } catch (error) {
      Swal.fire("ข้อผิดพลาด", error.message, "error");
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };



  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategoryName("");
    setIsEditMode(false);
    setSelectedCategoryId(null);
  };

  const totalPages = Math.ceil(categoryData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = categoryData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
              <span className="text-sm sm:text-base">เพิ่มข้อมูล</span>
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
              {categoryData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    ไม่มีข้อมูลหมวดหมู่
                  </td>
                </tr>
              ) : (
                currentItems.map((cat) => (
                  <tr key={cat.id} className="border-t hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-1 sm:py-3">{cat.id}</td>
                    <td className="px-2 sm:px-12 py-1 sm:py-3">{cat.name}</td>
                    <td className="px-2 sm:px-4 py-1 sm:py-3">
                      <div className="flex items-center justify-center text-base">
                        <button
                          className="text-yellow-500 mr-2 hover:opacity-80"
                          onClick={() => {
                            setIsEditMode(true);
                            setNewCategoryName(cat.name);
                            setSelectedCategoryId(cat.id); // ตั้งค่า id สำหรับอัปเดต
                            setIsModalOpen(true);
                          }}
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          className="text-red-500 hover:opacity-80"
                          onClick={() => deleteCategory(cat.id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>
          แสดง {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, categoryData.length)}{" "}
          จากทั้งหมด {categoryData.length} รายการ
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
};
