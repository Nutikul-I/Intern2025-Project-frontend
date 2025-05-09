import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";

const ProcessOne = () => {
  const [address, setAddress] = useState([
    {
      id: 1,
      name: "2118 Thornridge",
      address: "2118 Thornridge Cir.",
      Province: "Connecticut",
      District: "Syracuse",
      Subdistrict: "-",
      Zipcode: "35624",
      phone: "(209) 555-0100",
    },
    {
      id: 2,
      name: "Headoffice",
      address: "2715 Ash Dr.",
      Province: "South Dakota",
      District: "San Jose",
      Subdistrict: "-",
      Zipcode: "83475",
      phone: "(704) 555-0127",
    },
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    address: "",
    Province: "",
    District: "",
    Subdistrict: "",
    Zipcode: "",
    phone: "",
  });

  const openModal = (editData = null) => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        id: null,
        name: "",
        address: "",
        Province: "",
        District: "",
        Subdistrict: "",
        Zipcode: "",
        phone: "",
      });
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData({
      id: null,
      name: "",
      address: "",
      Province: "",
      District: "",
      Subdistrict: "",
      Zipcode: "",
      phone: "",
    });
  };

  const handleDelete = (id) => {
    setAddress((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSave = () => {
    if (formData.id) {
      // Edit
      setAddress((prev) =>
        prev.map((a) => (a.id === formData.id ? formData : a))
      );
    } else {
      // Add
      const newId = Math.max(...address.map((a) => a.id)) + 1;
      setAddress((prev) => [...prev, { ...formData, id: newId }]);
    }

    closeModal();

    Swal.fire({
      icon: "success",
      title: "บันทึกข้อมูลสำเร็จ",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#000",
    });
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-xl font-bold mb-6 text-gray-900">เลือกที่อยู่</h1>

      <div className="flex flex-col w-full max-w-2xl space-y-4">
        {address.map((item) => (
          <label
            key={item.id}
            className={`flex justify-between items-start p-5 rounded-lg bg-gray-100 cursor-pointer transition-colors ${
              selectedId === item.id ? "ring-2 ring-black" : ""
            }`}
          >
            <div className="flex items-start gap-3 flex-1">
              <input
                type="radio"
                name="selectedAddress"
                className="mt-1"
                checked={selectedId === item.id}
                onChange={() => setSelectedId(item.id)}
              />
              <div className="text-sm text-gray-900">
                <p className="font-semibold text-base">{item.name}</p>
                <p>{item.address}</p>
                <p>
                  {item.District}, {item.Province}, {item.Subdistrict} {item.Zipcode}
                </p>
                <p>{item.phone}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <button onClick={() => openModal(item)} type="button">
                <Pencil size={16} className="text-black hover:text-gray-600" />
              </button>
              <button onClick={() => handleDelete(item.id)} type="button">
                <X size={16} className="text-black hover:text-gray-600" />
              </button>
            </div>
          </label>
        ))}
      </div>

      {/* Add New Address */}
      <div className="mt-10 text-center">
        <button
          onClick={() => openModal()}
          className="flex flex-col items-center text-sm hover:opacity-75"
        >
          <span className="text-xl border border-black bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
            +
          </span>
          <span className="mt-1">เพิ่มที่อยู่ใหม่</span>
        </button>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 space-y-4">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-lg font-bold">ที่อยู่</Dialog.Title>
              <button onClick={closeModal}>
                <X className="text-black" />
              </button>
            </div>

            {[
              { label: "ชื่อที่อยู่", key: "name" },
              { label: "ที่อยู่", key: "address" },
              { label: "จังหวัด", key: "Province" },
              { label: "อำเภอ", key: "District" },
              { label: "ตำบล", key: "Subdistrict" },
              { label: "รหัสไปรษณีย์", key: "Zipcode" },
              { label: "เบอร์ติดต่อ", key: "phone" },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center gap-4">
                <label className="w-24 text-sm">{label}</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-1 text-sm"
                  placeholder="placeholder"
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                />
              </div>
            ))}

            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={closeModal}
                className="border border-black px-4 py-1 rounded"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className="bg-black text-white px-4 py-1 rounded"
              >
                บันทึก
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProcessOne;
