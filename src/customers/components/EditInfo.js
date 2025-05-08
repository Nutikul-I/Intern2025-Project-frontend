import React, { useState } from 'react';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

const EditInfo = () => {
  const [addresses, setAddresses] = useState([
    {
        id: 1,
        name: 'บ้านแม่',
        full: '22 หมู่ 5',
        province: 'เชียงใหม่',
        district: 'แม่ริม',
        subDistrict: 'ริมใต้',
        postalCode: '50180',
        phone: '089-111-2233',
      },
      {
        id: 2,
        name: 'คอนโดกรุงเทพ',
        full: '99/1 ซอยสุขุมวิท 31',
        province: 'กรุงเทพมหานคร',
        district: 'วัฒนา',
        subDistrict: 'คลองตันเหนือ',
        postalCode: '10110',
        phone: '087-333-4455',
      },
      {
        id: 3,
        name: 'บ้านสวน',
        full: '18 หมู่ 3',
        province: 'จันทบุรี',
        district: 'มะขาม',
        subDistrict: 'ท่าหลวง',
        postalCode: '22150',
        phone: '081-777-8899',
      },
  ]);

  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    name: '',
    full: '',
    province: '',
    district: '',
    subDistrict: '',
    postalCode: '',
    phone: '',
  });

  const openEditModal = (index) => {
    const address = addresses[index];
    setForm({ ...address, province: '', district: '', subDistrict: '', postalCode: '' });
    setEditIndex(index);
    setEditing(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const closeModal = () => {
    setEditing(false);
    setEditIndex(null);
  };

  const saveAddress = () => {
    const updated = [...addresses];
    updated[editIndex] = {
      ...updated[editIndex],
      name: form.name,
      full: form.full,
      phone: form.phone,
    };
    setAddresses(updated);
    closeModal();
  };

  const deleteAddress = (index) => {
    setAddresses((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold">แก้ไขข้อมูลผู้ใช้</h2>
      <div className="grid  gap-4">
        <input className="border px-4 py-2 rounded w-full" placeholder="ชื่อ-นามสกุล" />
        <input className="border px-4 py-2 rounded w-full" placeholder="บัตรประชาชน" />
        <input className="border px-4 py-2 rounded w-full" placeholder="เบอร์โทรศัพท์" />
        <input className="border px-4 py-2 rounded w-full" placeholder="อีเมล" />
      </div>

      <h3 className="text-lg font-semibold mt-8">ที่อยู่</h3>
      <div className="space-y-3">
        {addresses.map((address, index) => (
          <div
            key={address.id}
            className="bg-gray-100 p-4 rounded flex justify-between items-start"
          >
            <div>
              <p className="font-medium">{address.name}</p>
              <p>{address.full}</p>
              <p>{address.phone}</p>
            </div>
            <div className="flex gap-3 text-lg mt-1">
              <button onClick={() => openEditModal(index)} className="text-black hover:text-blue-600">
                <FaPencilAlt />
              </button>
              <button onClick={() => deleteAddress(index)} className="text-black hover:text-red-600">
                <FaTimes />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button className="px-6 py-2 border rounded hover:bg-gray-100">ยกเลิก</button>
        <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">บันทึก</button>
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <h3 className="text-lg font-semibold mb-4">ที่อยู่</h3>
            <button onClick={closeModal} className="absolute right-4 top-4 text-gray-500 hover:text-black">
              <FaTimes />
            </button>
            <div className="space-y-3">
              <input className="w-full border px-4 py-2 rounded" placeholder="ชื่อที่อยู่" name="name" value={form.name} onChange={handleChange} />
              <input className="w-full border px-4 py-2 rounded" placeholder="ที่อยู่" name="full" value={form.full} onChange={handleChange} />
              <input className="w-full border px-4 py-2 rounded" placeholder="จังหวัด" name="province" value={form.province} onChange={handleChange} />
              <input className="w-full border px-4 py-2 rounded" placeholder="อำเภอ" name="district" value={form.district} onChange={handleChange} />
              <input className="w-full border px-4 py-2 rounded" placeholder="ตำบล" name="subDistrict" value={form.subDistrict} onChange={handleChange} />
              <input className="w-full border px-4 py-2 rounded" placeholder="รหัสไปรษณีย์" name="postalCode" value={form.postalCode} onChange={handleChange} />
              <input className="w-full border px-4 py-2 rounded" placeholder="เบอร์มือถือ" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button onClick={closeModal} className="px-6 py-2 border rounded hover:bg-gray-100">ยกเลิก</button>
              <button onClick={saveAddress} className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditInfo;
