import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { FaTimes, FaPlus } from "react-icons/fa";
import { FiImage } from "react-icons/fi";

export default function ProductFormModal({ open, onClose, onSave, editingData }) {
  /* ------------------------------ state ------------------------------ */
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    unit: "",
    category: "",
  });

  const [images, setImages] = useState([]); // base64 previews
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("#ff0000");
  const [colors, setColors] = useState([]); // [{ name, code }]
  const [detailTitle, setDetailTitle] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [details, setDetails] = useState([]); // [{ title, value }]

  const fileInputRef = useRef(null);

  /* --------------------------- lifecycle ---------------------------- */
  useEffect(() => {
    if (editingData) {
      setForm(editingData);
      // TODO: load images / colors / details when editing
    }
    const tmp = JSON.parse(localStorage.getItem("tmpProductImages") || "[]");
    setImages(tmp);
  }, [editingData]);

  /* -------------------------- handlers ----------------------------- */
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - images.length);
    const readers = files.map((file) =>
      new Promise((res) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.readAsDataURL(file);
      })
    );
    Promise.all(readers).then((base64s) => {
      const next = [...images, ...base64s];
      setImages(next);
      localStorage.setItem("tmpProductImages", JSON.stringify(next));
    });
  };

  const removeImage = (i) => {
    const next = images.filter((_, idx) => idx !== i);
    setImages(next);
    localStorage.setItem("tmpProductImages", JSON.stringify(next));
  };

  const addColor = () => {
    if (!colorName.trim()) return;
    setColors((c) => [...c, { name: colorName, code: colorCode }]);
    setColorName("");
  };
  const removeColor = (i) => setColors(colors.filter((_, idx) => idx !== i));

  const addDetail = () => {
    if (!detailTitle.trim()) return;
    setDetails((d) => [...d, { title: detailTitle, value: detailValue }]);
    setDetailTitle("");
    setDetailValue("");
  };
  const removeDetail = (i) => setDetails(details.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      Swal.fire("กรุณากรอกชื่อและราคาสินค้า", "", "warning");
      return;
    }
    onSave({ ...form, images, colors, details });
    Swal.fire({ icon: "success", title: "บันทึกข้อมูลสำเร็จ" }).then(onClose);
    localStorage.removeItem("tmpProductImages");
  };

  /* ---------------------------- render ----------------------------- */
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 sm:px-4">
      {/* ------------------------- modal container ------------------------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg sm:max-w-2xl lg:max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg"
      >
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">
            {editingData ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
          </h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        {/* --------------------------- image uploader -------------------------- */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">รูปสินค้า</label>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {images.map((src, idx) => (
              <div key={idx} className="relative group shrink-0">
                <img
                  src={src}
                  alt="preview"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-90 group-hover:opacity-100"
                >
                  <FaTimes size={10} />
                </button>
              </div>
            ))}

            {/* placeholder button */}
            {images.length < 5 && (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-indigo-50 border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center text-indigo-300 hover:bg-indigo-100 shrink-0"
              >
                <FiImage size={24} />
                <span className="text-[10px] mt-1">เพิ่มรูป</span>
              </button>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
            รองรับไฟล์ png, jpg, jpeg ขนาดไม่เกิน 10&nbsp;mb, สูงสุด 5 ภาพ
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            multiple
            hidden
            onChange={handleImageUpload}
          />
        </div>

        {/* ----------------------------- main grid ----------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* ------------------ left: basic product fields ----------------- */}
          <div className="space-y-4">
            {[
              { label: "ชื่อสินค้า", name: "name", type: "text" },
              { label: "รายละเอียดสินค้า", name: "description", type: "textarea" },
              { label: "ราคาขาย", name: "price", type: "number" },
              { label: "หน่วยนับ", name: "unit", type: "text" },
              { label: "หมวดหมู่", name: "category", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm mb-1">{label}</label>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder={label}
                    rows={4}
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder={label}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ------------------ right: colors & details -------------------- */}
          <div className="space-y-8">
            {/* ------------- colors ------------- */}
            <div className="border rounded-2xl p-4 space-y-3">
              <h3 className="font-medium">สี</h3>

              {/* form เพิ่มสี */}
              <div className="grid grid-cols-12 gap-2">
                {/* ชื่อสี */}
                <input
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  placeholder="ชื่อสี"
                  className="col-span-12 sm:col-span-5 h-10 rounded-lg border px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />

                {/* โค้ดสี + preview */}
                <div className="col-span-12 sm:col-span-5 relative h-10 rounded-lg border overflow-hidden mt-2 sm:mt-0">
                  <input
                    type="color"
                    value={colorCode}
                    onChange={(e) => setColorCode(e.target.value)}
                    className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                  />
                  <span
                    className="absolute left-3 top-1/2 -translate-y-2 w-8 h-8 rounded-lg border"
                    style={{ backgroundColor: colorCode }}
                  />
                  <input
                    type="text"
                    value={colorCode}
                    onChange={(e) => setColorCode(e.target.value)}
                    className="h-full w-full pl-14 pr-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="#ffffff"
                  />
                </div>

                {/* ปุ่มเพิ่ม */}
                <button
                  type="button"
                  onClick={addColor}
                  className="col-span-12 sm:col-span-2 h-10 flex items-center justify-center rounded-lg bg-gray-900 text-white hover:bg-gray-800 mt-2 sm:mt-0"
                >
                  <FaPlus className="mr-1" size={12} /> เพิ่ม
                </button>
              </div>

              <ul className="space-y-1 max-h-40 overflow-y-auto pr-1">
                {colors.map((c, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded" style={{ background: c.code }} />
                      <span className="text-sm truncate max-w-[8rem] sm:max-w-[9rem]">{c.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeColor(idx)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTimes size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ------------- details ------------- */}
            <div className="border rounded-2xl p-4 space-y-3">
              <h3 className="font-medium">รายละเอียดเพิ่มเติม</h3>

              <div className="grid grid-cols-12 gap-2">
                <input
                  value={detailTitle}
                  onChange={(e) => setDetailTitle(e.target.value)}
                  placeholder="หัวข้อ"
                  className="col-span-12 sm:col-span-5 h-10 rounded-lg border px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <input
                  value={detailValue}
                  onChange={(e) => setDetailValue(e.target.value)}
                  placeholder="ข้อมูลเพิ่มเติม"
                  className="col-span-12 sm:col-span-5 h-10 rounded-lg border px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 mt-2 sm:mt-0"
                />
                <button
                  type="button"
                  onClick={addDetail}
                  className="col-span-12 sm:col-span-2 h-10 flex items-center justify-center rounded-lg bg-gray-900 text-white hover:bg-gray-800 mt-2 sm:mt-0"
                >
                  <FaPlus className="mr-1" size={12} /> เพิ่ม
                </button>
              </div>

              <ul className="space-y-1 max-h-40 overflow-y-auto pr-1">
                {details.map((d, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1"
                  >
                    <span className="text-sm truncate max-w-[12rem] sm:max-w-[14rem]">
                      {d.title}: {d.value}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDetail(idx)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTimes size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ----------------------------- actions ----------------------------- */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 mt-8 lg:mt-10">
          <button
            type="button"
            onClick={onClose}
            className="h-11 w-full sm:w-auto px-6 sm:px-8 rounded-lg border border-gray-400 hover:bg-gray-100"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="h-11 w-full sm:w-auto px-6 sm:px-8 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
          >
            ยืนยัน
          </button>
        </div>
      </form>
    </div>
  );
}
