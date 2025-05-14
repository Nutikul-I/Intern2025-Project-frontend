import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";

export default function ProductFormModal({
  open,
  onClose,
  onSave,
  editingData,
}) {
  // form state
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    unit: "",
    category: "",
  });

  // image previews stored in localStorage
  const [images, setImages] = useState([]);

  // colors list
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("#ff0000");
  const [colors, setColors] = useState([]);

  // details list
  const [detailTitle, setDetailTitle] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (editingData) {
      setForm(editingData);
      // load from editingData... images/colors/details if exist
    }
    // load temp images from localStorage
    const tmp = JSON.parse(localStorage.getItem("tmpProductImages") || "[]");
    setImages(tmp);
  }, [editingData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((base64s) => {
      const next = [...images, ...base64s].slice(0, 5);
      setImages(next);
      localStorage.setItem("tmpProductImages", JSON.stringify(next));
    });
  };

  const removeImage = (idx) => {
    const next = images.filter((_, i) => i !== idx);
    setImages(next);
    localStorage.setItem("tmpProductImages", JSON.stringify(next));
  };

  const addColor = () => {
    if (colorName.trim()) {
      setColors([...colors, { name: colorName, code: colorCode }]);
      setColorName("");
    }
  };

  const removeColor = (i) => setColors(colors.filter((_, idx) => idx !== i));

  const addDetail = () => {
    if (detailTitle.trim()) {
      setDetails([...details, { title: detailTitle, value: detailValue }]);
      setDetailTitle("");
      setDetailValue("");
    }
  };

  const removeDetail = (i) => setDetails(details.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.price) {
      Swal.fire("กรุณากรอกชื่อและราคาสินค้า", "", "warning");
      return;
    }
    const payload = {
      ...form,
      images,
      colors,
      details,
    };
    onSave(payload);
    Swal.fire({ icon: "success", title: "บันทึกข้อมูลสำเร็จ" }).then(onClose);
    localStorage.removeItem("tmpProductImages");
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg p-6 mx-2"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {editingData ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
          </h2>
          <button type="button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block text-sm mb-2">รูปสินค้า</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={handleImageUpload}
          />
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {images.map((src, idx) => (
              <div key={idx} className="relative">
                <img
                  src={src}
                  alt={idx}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            รองรับไฟล์ png, jpg, jpeg ขนาดไม่เกิน 10 mb, สูงสุด 5 ภาพ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left side fields */}
          <div className="space-y-3">
            {[
              { label: "ชื่อสินค้า", name: "name", type: "text" },
              {
                label: "รายละเอียดสินค้า",
                name: "description",
                type: "textarea",
              },
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
                    className="w-full border rounded px-3 py-2"
                    placeholder={label}
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder={label}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right side: Colors & Details */}
          <div className="space-y-6">
            {/* Colors */}
            <div className="border rounded p-3 space-y-2">
              <div className="flex gap-2 items-end">
                <div>
                  <label className="block text-xs">สี</label>
                  <input
                    type="text"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    className="border rounded px-2 py-1"
                    placeholder="ชื่อสี"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs">โค้ดสี</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={colorCode}
                      onChange={(e) => setColorCode(e.target.value)}
                      className="w-8 h-8 p-0 border-0"
                    />
                    <input
                      type="text"
                      value={colorCode}
                      readOnly
                      className="border rounded px-2 py-1 w-20"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addColor}
                  className="bg-gray-900 text-white px-3 py-1 rounded"
                >
                  เพิ่ม
                </button>
              </div>
              {/* Color list */}
              <div className="space-y-1">
                {colors.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-100 rounded px-3 py-1"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: c.code }}
                      />
                      <span className="text-sm">{c.name}</span>
                    </div>
                    <button type="button" onClick={() => removeColor(i)}>
                      <FaTimes className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="border rounded p-3 space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={detailTitle}
                  onChange={(e) => setDetailTitle(e.target.value)}
                  className="border rounded px-2 py-1 flex-1"
                  placeholder="หัวข้อ"
                  required
                />
                <input
                  type="text"
                  value={detailValue}
                  onChange={(e) => setDetailValue(e.target.value)}
                  className="border rounded px-2 py-1 flex-1"
                  placeholder="ข้อมูลเพิ่มเติม"
                />
                <button
                  type="button"
                  onClick={addDetail}
                  className="bg-gray-900 text-white px-3 py-1 rounded"
                >
                  เพิ่ม
                </button>
              </div>
              {/* Detail list */}
              <div className="space-y-1">
                {details.map((d, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-gray-100 rounded px-3 py-1"
                  >
                    <span className="text-sm">
                      {d.title}: {d.value}
                    </span>
                    <button type="button" onClick={() => removeDetail(i)}>
                      <FaTimes className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="border px-6 py-2 rounded"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded"
          >
            ยืนยัน
          </button>
        </div>
      </form>
    </div>
  );
}
