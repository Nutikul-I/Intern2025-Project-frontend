import { useState } from "react";
import Swal from "sweetalert2";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function AddressModal({ open, onClose, customer, onSave }) {
  const [addresses, setAddresses] = useState(customer.addresses || []);
  const emptyAddr = {
    title: "",
    addressLine: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    phone: "",
  };
  const [editing, setEditing] = useState(null);

  const handleEdit = (addr, idx) => {
    setEditing({ ...addr, idx });
  };

  const handleSaveAddr = () => {
    const isValid = Object.values(editing).every((v) => v?.toString().trim());
    if (!isValid) {
      Swal.fire("กรุณากรอกข้อมูลให้ครบทุกช่อง", "", "warning");
      return;
    }

    const next = [...addresses];
    if (editing.idx !== undefined) next[editing.idx] = editing;
    else next.push(editing);

    setAddresses(next);
    setEditing(null);
    Swal.fire("บันทึกสำเร็จ", "", "success");
  };

  const handleDelete = (idx) =>
    setAddresses(addresses.filter((_, i) => i !== idx));

  const handleFinish = () => {
    onSave(addresses);
    Swal.fire({
      icon: "success",
      title: "บันทึกข้อมูลสำเร็จ",
      confirmButtonText: "ตกลง",
    }).then(onClose);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md max-h-[80vh] overflow-y-auto rounded-lg p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">ที่อยู่</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* ===== รายการที่อยู่ ===== */}
        {!editing && (
          <>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {addresses.map((addr, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 rounded p-4 text-sm relative pr-10"
                >
                  <strong>{addr.title}</strong>
                  <p>{addr.addressLine}</p>
                  <p>
                    {addr.subDistrict} {addr.district} {addr.province}{" "}
                    {addr.postalCode}
                  </p>
                  <p>{addr.phone}</p>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <FaPencilAlt
                      className="cursor-pointer"
                      onClick={() => handleEdit(addr, idx)}
                    />
                    <FaTimes
                      className="cursor-pointer"
                      onClick={() => handleDelete(idx)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ปุ่มเพิ่ม */}
            <div className="border-t pt-3">
              <button
                onClick={() => setEditing({ ...emptyAddr })}
                className="mb-3 border px-3 py-1 rounded"
              >
                + เพิ่มที่อยู่
              </button>
            </div>
          </>
        )}

        {/* ===== ฟอร์ม เพิ่ม/แก้ไข ===== */}
        {editing && (
          <div className="space-y-3 border-t pt-3">
            {[
              { label: "ชื่อที่อยู่", name: "title" },
              { label: "ที่อยู่", name: "addressLine" },
              { label: "จังหวัด", name: "province" },
              { label: "อำเภอ", name: "district" },
              { label: "ตำบล", name: "subDistrict" },
              { label: "รหัสไปรษณีย์", name: "postalCode" },
              { label: "เบอร์ติดต่อ", name: "phone" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="text-xs">{label}</label>
                <input
                  className="mt-1 w-full border px-2 py-1 rounded"
                  value={editing[name] ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, [name]: e.target.value })
                  }
                  required
                  placeholder="placeholder"
                />
              </div>
            ))}

            <div className="flex justify-end gap-2">
              <button
                className="border px-3 py-1 rounded"
                onClick={() => setEditing(null)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-gray-900 text-white px-3 py-1 rounded"
                onClick={handleSaveAddr}
              >
                บันทึก
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        {!editing && (
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              ปิด
            </button>
            <button
              onClick={handleFinish}
              className="bg-gray-900 text-white px-4 py-2 rounded"
            >
              บันทึก
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
