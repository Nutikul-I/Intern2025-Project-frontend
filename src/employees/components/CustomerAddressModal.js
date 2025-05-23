import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

import { fetchAddresses, saveAddresses } from "../../Services/customerService.js";

/* ==================================================================
   props
   ─────
   open      : boolean  – เปิด/ปิด modal
   onClose   : () => void
   customer  : { ID: number, ... }   ต้องมี ID!
   onSaved   : (addresses[]) => void (optional)  – callback หลังบันทึกสำเร็จ
================================================================== */
export default function CustomerAddressModal({ open, onClose, customer, onSaved }) {
  /* ────────────── local state ────────────── */
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error,   setError]       = useState(null);

  const [editing, setEditing] = useState(null);
  const empty = {
    title: "", addressLine: "", province: "",
    district: "", subDistrict: "", postalCode: "", phone: "",
  };

  /* ── โหลดที่อยู่เมื่อ modal เปิด ── */
  useEffect(() => {
    if (!open || !customer?.ID) return;

    setLoading(true);
    setError(null);
    fetchAddresses(customer.ID)
      .then((addresses) => {
        console.log('Addresses loaded:', addresses);
        setAddresses(addresses);
      })
      .catch((e) => {
        console.error(e);
        setError("โหลดที่อยู่ไม่สำเร็จ");
      })
      .finally(() => setLoading(false));
  }, [open, customer]);

  /* ────────────── helpers ────────────── */
  const startEdit = (addr, idx) => setEditing({ ...addr, idx });
  const cancelEdit = () => setEditing(null);

  const setField = (name, value) =>
    setEditing((prev) => ({ ...prev, [name]: value }));

  const confirmEdit = () => {
    const { idx, ...addr } = editing ?? {};
    const ok = Object.values(addr).every((v) => v.toString().trim());
    if (!ok) return Swal.fire("กรุณากรอกข้อมูลให้ครบ", "", "warning");

    const next = [...addresses];
    idx !== undefined ? (next[idx] = addr) : next.push(addr);
    setAddresses(next);
    setEditing(null);
  };

  const removeAddr = (idx) =>
    setAddresses(addresses.filter((_, i) => i !== idx));

  const handleSaveAll = async () => {
    try {
      await saveAddresses(customer.ID, addresses);
      Swal.fire("บันทึกสำเร็จ", "", "success");
      onSaved?.(addresses);
      onClose();
    } catch (e) {
      console.error('Error saving addresses:', e.response?.data || e);
      Swal.fire({
        icon: "error",
        title: "บันทึกไม่สำเร็จ",
        text: e.response?.data?.message || "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง"
      });
    }
  };

  /* ────────────── UI ────────────── */
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md max-h-[80vh] overflow-y-auto rounded-lg p-4">
        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">ที่อยู่ของลูกค้า</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* loading / error */}
        {loading && <p className="text-center py-6">กำลังโหลด...</p>}
        {error &&   <p className="text-center text-red-600 py-6">{error}</p>}

        {/* list */}
        {!loading && !error && !editing && (
          <>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {addresses.map((a, i) => (
                <div key={i} className="bg-gray-100 rounded p-4 text-sm relative pr-10">
                  <strong>{a.title}</strong>
                  <p>{a.addressLine}</p>
                  <p>
                    {a.subDistrict} {a.district} {a.province} {a.postalCode}
                  </p>
                  <p>{a.phone}</p>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <FaPencilAlt className="cursor-pointer"
                      onClick={() => startEdit(a, i)} />
                    <FaTimes className="cursor-pointer"
                      onClick={() => removeAddr(i)} />
                  </div>
                </div>
              ))}
              {addresses.length === 0 && (
                <p className="text-center text-gray-500">-- ยังไม่มีที่อยู่ --</p>
              )}
            </div>

            <button
              onClick={() => setEditing({ ...empty })}
              className="border px-3 py-1 rounded"
            >
              + เพิ่มที่อยู่
            </button>
          </>
        )}

        {/* form */}
        {editing && (
          <div className="space-y-3 border-t pt-3">
            {[
              ["title", "ชื่อที่อยู่"],
              ["addressLine", "ที่อยู่"],
              ["province", "จังหวัด"],
              ["district", "อำเภอ"],
              ["subDistrict", "ตำบล"],
              ["postalCode", "รหัสไปรษณีย์"],
              ["phone", "เบอร์ติดต่อ"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="text-xs">{label}</label>
                <input
                  className="mt-1 w-full border px-2 py-1 rounded"
                  value={editing[name] ?? ""}
                  onChange={(e) => setField(name, e.target.value)}
                  placeholder={label}
                />
              </div>
            ))}

            <div className="flex justify-end gap-2">
              <button onClick={cancelEdit} className="border px-3 py-1 rounded">
                ยกเลิก
              </button>
              <button
                onClick={confirmEdit}
                className="bg-gray-900 text-white px-3 py-1 rounded"
              >
                บันทึก
              </button>
            </div>
          </div>
        )}

        {/* footer */}
        {!editing && !loading && !error && (
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="border px-4 py-2 rounded">
              ปิด
            </button>
            <button
              onClick={handleSaveAll}
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
