import { useState } from "react";
import {
    FaPencilAlt,
    FaTrash,
    FaPlus,
    FaUpload,
} from "react-icons/fa";

export default function AddProduct() {
    const [products, setProducts] = useState([
        {
            id: 1,
            code: "0000001",
            documentNumber: "AS1234567890",
            product: "IPHONE 14 PRO",
            importer: "นายทดสอบ",
            quantity: 100,
            createdAt: "24/12/2568 11:22น.",
        },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        product: "",
        quantity: "",
        documentNumber: "",
        importer: "",
        note: "",
        files: [],
    });

    const [editingProduct, setEditingProduct] = useState(null);

    const openAdd = () => {
        setEditingProduct(null);
        setFormData({
            product: "",
            quantity: "",
            documentNumber: "",
            importer: "",
            note: "",
            files: [],
        });
        setShowForm(true);
    };

    const openEdit = (item) => {
        setEditingProduct(item);
        setFormData({
            product: item.product,
            quantity: item.quantity,
            documentNumber: item.documentNumber,
            importer: item.importer,
            note: item.note || "",
            files: item.files || [],
        });
        setShowForm(true);
    };

    const handleDelete = (item) => {
        setProducts((prev) => prev.filter((p) => p.id !== item.id));
    };

    const handleCloseForm = () => {
        formData.files.forEach((f) => URL.revokeObjectURL(f.url));
        setFormData({
            product: "",
            quantity: "",
            documentNumber: "",
            importer: "",
            note: "",
            files: [],
        });
        setShowForm(false);
    };

    const handleSave = () => {
        const now = new Date();
        const formattedDate =
            now.toLocaleDateString("th-TH") +
            " " +
            now.toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
            }) +
            "น.";

        if (editingProduct) {
            setProducts((prev) =>
                prev.map((p) =>
                    p.id === editingProduct.id
                        ? { ...p, ...formData }
                        : p
                )
            );
        } else {
            const maxCode = products.reduce((max, p) => {
                const num = parseInt(p.code, 10);
                return num > max ? num : max;
            }, 0);
            const nextCode = String(maxCode + 1).padStart(7, "0");

            const newProduct = {
                id: now.getTime(),
                code: nextCode,
                createdAt: formattedDate,
                ...formData,
                quantity: parseInt(formData.quantity),
            };

            setProducts((prev) => [...prev, newProduct]);
        }

        setShowForm(false);
        setShowSuccess(true);
    };

    return (
        <div className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-0">
            {/* Header */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3">
                    <h1 className="text-lg sm:text-xl font-semibold">นำเข้าสินค้า</h1>
                    <button
                        onClick={openAdd}
                        className="mt-2 sm:mt-0 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl"
                    >
                        <FaPlus />
                        <span className="text-sm sm:text-base">เพิ่มข้อมูล</span>
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left hidden sm:table-cell">รหัส</th>
                                <th className="px-4 py-3 text-left">เลขเอกสาร</th>
                                <th className="px-4 py-3 text-left">วันที่นำเข้า</th>
                                <th className="px-4 py-3 text-left">สินค้า</th>
                                <th className="px-4 py-3 text-left">จำนวนนำเข้า</th>
                                <th className="px-4 py-3 text-left hidden sm:table-cell">ผู้นำเข้า</th>
                                <th className="px-4 py-3 text-center hidden sm:table-cell">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-2 hidden sm:table-cell">{item.code}</td>
                                    <td className="px-4 py-2">{item.documentNumber}</td>
                                    <td className="px-4 py-2">{item.createdAt}</td>
                                    <td className="px-4 py-2">{item.product}</td>
                                    <td className="px-4 py-2">{item.quantity}</td>
                                    <td className="px-4 py-2 hidden sm:table-cell">{item.importer}</td>
                                    <td className="px-4 py-2 text-center hidden sm:table-cell">
                                        <div className="flex justify-center gap-2">
                                            <FaPencilAlt
                                                className="text-yellow-500 cursor-pointer"
                                                onClick={() => openEdit(item)}
                                            />
                                            <FaTrash
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => handleDelete(item)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm">
                <p>แสดง 51–60 จากทั้งหมด 85 รายการ</p>
                <div className="flex gap-1 items-center">
                    <button className="px-2 py-1 rounded hover:bg-gray-100">{"<<"}</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-100">1</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-100">...</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-100">4</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-100">5</button>
                    <button className="px-2 py-1 bg-gray-900 text-white rounded">6</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-100">7</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-100">8</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-100">20</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-100">{">>"}</button>
                </div>
            </div>
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-xl relative shadow-xl">
                        {/* ปุ่มปิด */}
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>

                        {/* หัวข้อ */}
                        <h2 className="text-xl font-semibold mb-6 text-gray-700">นำเข้าสินค้า</h2>

                        {/* ฟอร์ม */}
                        <div className="space-y-5 text-base text-gray-700">
                            {/* สินค้า */}
                            <div>
                                <label className="block mb-1 font-medium">สินค้า</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    value={formData.product}
                                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                >
                                    <option value="">เลือกสินค้า</option>
                                    <option value="IPHONE 14 PRO">IPHONE 14 PRO</option>
                                    <option value="Samsung Galaxy S23 Ultra">Samsung Galaxy S23 Ultra</option>
                                </select>
                            </div>

                            {/* จำนวนที่นำเข้า */}
                            <div>
                                <label className="block mb-1 font-medium">จำนวนที่นำเข้า</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="placeholder"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                />
                            </div>

                            {/* เลขเอกสารนำเข้า */}
                            <div>
                                <label className="block mb-1 font-medium">เลขเอกสารนำเข้า</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="placeholder"
                                    value={formData.documentNumber}
                                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                                />
                            </div>

                            {/* อัปโหลดไฟล์พร้อมพรีวิว */}
                            <div>
                                <label className="block mb-1 font-medium">เอกสารประกอบ (สูงสุด 5 รูป) ไม่เกิน 10 mb</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {formData.files.map((f, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={f.url}
                                                alt={`preview-${index}`}
                                                className="w-full h-20 object-cover rounded"
                                            />
                                            <button
                                                onClick={() => {
                                                    const newFiles = [...formData.files];
                                                    URL.revokeObjectURL(newFiles[index].url);
                                                    newFiles.splice(index, 1);
                                                    setFormData({ ...formData, files: newFiles });
                                                }}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}

                                    {formData.files.length < 5 && (
                                        <label className="w-full h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 cursor-pointer hover:border-gray-400">
                                            <FaUpload />
                                            <input
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                multiple
                                                className="hidden"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files);
                                                    const oversizedFiles = files.filter((file) => file.size > 10 * 1024 * 1024);

                                                    if (oversizedFiles.length > 0) {
                                                        alert("ไม่สามารถอัปโหลดไฟล์ที่มีขนาดเกิน 10MB ได้");
                                                    }

                                                    const validFiles = files.filter(
                                                        (file) =>
                                                            ["image/jpeg", "image/png"].includes(file.type) &&
                                                            file.size <= 10 * 1024 * 1024
                                                    );

                                                    const remainingSlots = 5 - formData.files.length;
                                                    const filesToAdd = validFiles.slice(0, remainingSlots);

                                                    const newPreviews = filesToAdd.map((file) => ({
                                                        file,
                                                        url: URL.createObjectURL(file),
                                                    }));

                                                    setFormData({
                                                        ...formData,
                                                        files: [...formData.files, ...newPreviews],
                                                    });
                                                }}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* หมายเหตุ */}
                            <div>
                                <label className="block mb-1 font-medium">หมายเหตุ</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    rows={3}
                                    placeholder="placeholder"
                                    value={formData.note || ""}
                                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        {/* ปุ่ม */}
                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-5 py-2 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-100"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                            >
                                บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            )}




            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80 text-center">
                        <div className="text-green-500 text-5xl mb-2">✓</div>
                        <div className="text-sm font-semibold mb-4">บันทึกข้อมูลสำเร็จ</div>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="px-4 py-2 bg-gray-900 text-white rounded text-sm w-full"
                        >
                            ตกลง
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
