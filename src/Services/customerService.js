import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});

/* ───── Customers ─────────────────────────────────────────────── */
export const listCustomers = (page = 1, row = 10) =>
  api.get("/customer/customers", { 
    params: { 
      page, 
      row,
      sort: "ID",
      order: "asc"
    } 
  });

export const getCustomer = (id) =>
  api.get("/customer/customer", { params: { id } });

export const fetchAddresses = async (id) => {
  const { data } = await getCustomer(id);
  console.log('Customer data from API:', data);
  
  // ถ้า Addresses เป็น null ให้ return array ว่าง
  const addresses = data.Addresses || data.addresses || [];
  
  // แปลงชื่อ field ให้ตรงกับที่ใช้ใน CustomerAddressModal
  return addresses.map(addr => ({
    title: addr.Name || '',
    addressLine: addr.Address || '',
    province: addr.City || '',
    district: addr.District || '',
    subDistrict: addr.SubDistrict || '',
    postalCode: addr.PostalCode || '',
    phone: addr.Phone || ''
  }));
};

export const saveAddresses = async (id, addresses) => {
  // 1. ดึงข้อมูล customer ปัจจุบันก่อน
  const { data: currentCustomer } = await getCustomer(id);

  // 2. แปลง format ของ addresses และกรอง null/undefined
  const transformedAddresses = addresses.map(addr => ({
    Name: addr.title || '',
    Address: addr.addressLine || '',
    City: addr.province || '',
    District: addr.district || '',
    SubDistrict: addr.subDistrict || '',
    PostalCode: addr.postalCode || '',
    Phone: addr.phone || ''
  }));

  // 3. สร้าง payload สำหรับ update โดยใช้ค่าเดิมถ้าไม่มีค่าใหม่
  const updateData = {
    FirstName: currentCustomer.FirstName || '',
    LastName: currentCustomer.LastName || '',
    NationalID: currentCustomer.NationalID || '',
    Phone: currentCustomer.Phone || '',
    Email: currentCustomer.Email || '',
    UserName: currentCustomer.UserName || currentCustomer.Email || '', // ใช้ email ถ้าไม่มี username
    Password: currentCustomer.Password || '', // ส่งค่าเดิมไปด้วยถ้ามี
    Addresses: transformedAddresses
  };

  // 4. ตรวจสอบว่ามีข้อมูลจำเป็นครบไหม
  const requiredFields = ['FirstName', 'LastName', 'NationalID', 'Phone', 'Email'];
  const missingFields = requiredFields.filter(field => !updateData[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`ข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
  }

  console.log('Updating customer with:', updateData);

  // 5. ส่งข้อมูลไป API
  return api.put(
    "/customer/update-customer",
    updateData,
    { params: { id } }
  );
};

export const createCustomer = (data) =>
  api.post("/customer/create-customer", data);

export const updateCustomer = (id, data) =>
  api.put("/customer/update-customer", data, { params: { id } });

export const deleteCustomer = (id) =>
  api.delete("/customer/delete-customer", { params: { id } });
