import React from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaUserTie, FaBriefcase } from "react-icons/fa";
// import logo from "../path/to/logo.png"; // Adjust the import to your actual path

const Sidebar = ({ currentPath }) => {
    const iconClass = (active) =>
        `text-[24px] p-1 rounded-full ${active ? "bg-gray-700 text-white" : "bg-white text-gray-700"}`;

    const itemClass = (active) =>
        `rounded-[10px] mb-2 p-2 ${active ? "bg-white text-gray-800 shadow-md" : "text-gray-400"
        }`;

    const sectionTitleClass = "px-4 py-2 font-bold text-gray-800 mt-4";

    return (
        <div className="flex">
            <ProSidebar
                className="h-screen bg-gray-100 p-2 w-[250px] relative"
            >
                <div className="text-center mb-5">
                    {/* <img src={logo} alt="Logo" className="w-[60px] h-[60px] mx-auto" /> */}
                    <p className="text-2xl font-bold text-gray-800">PAYZ</p>
                </div>

                <Menu>
                    <MenuItem
                        active={currentPath === "/employee/dashboard"}
                        icon={<FaHome className={iconClass(currentPath === "/employee/dashboard")} />}
                        component={<Link to="/employee/dashboard" />}
                        className={itemClass(currentPath === "/employee/dashboard")}
                    >
                        แดชบอร์ด
                    </MenuItem>

                    {/* user section*/}
                    <div className={sectionTitleClass}>ข้อมูลผู้ใช้</div>

                    <MenuItem
                        active={currentPath === "/employee/customer"}
                        icon={<FaUsers className={iconClass(currentPath === "/employee/customer")} />}
                        component={<Link to="/employee/customer" />}
                        className={itemClass(currentPath === "/employee/customer")}
                    >
                        ลูกค้า
                    </MenuItem>

                    <MenuItem
                        active={currentPath === "/employee/employee"}
                        icon={<FaUserTie className={iconClass(currentPath === "/employee/employee")} />}
                        component={<Link to="/employee/employee" />}
                        className={itemClass(currentPath === "/employee/employee")}
                    >
                        พนักงาน
                    </MenuItem>

                    {/* sell sectioin*/}
                    <div className={sectionTitleClass}>การขาย</div>

                    <MenuItem
                        active={currentPath === "/employee/"}
                        icon={<FaBriefcase className={iconClass(currentPath === "/employee/")} />}
                        component={<Link to="/employee/" />}
                        className={itemClass(currentPath === "/employee/")}
                    >
                        สินค้า
                    </MenuItem>

                    <MenuItem
                        active={currentPath === "/employee/"}
                        icon={<FaBriefcase className={iconClass(currentPath === "/employee/")} />}
                        component={<Link to="/employee/" />}
                        className={itemClass(currentPath === "/employee/")}
                    >
                        รายการสั่งซื้อ
                    </MenuItem>
                    
                    <MenuItem
                        active={currentPath === "/employee/"}
                        icon={<FaBriefcase className={iconClass(currentPath === "/employee/")} />}
                        component={<Link to="/employee/" />}
                        className={itemClass(currentPath === "/employee/")}
                    >
                        นำเข้าสินค้า
                    </MenuItem>

                    <MenuItem
                        active={currentPath === "/employee/"}
                        icon={<FaBriefcase className={iconClass(currentPath === "/employee/")} />}
                        component={<Link to="/employee/" />}
                        className={itemClass(currentPath === "/employee/")}
                    >
                        ปรับสต๊อก
                    </MenuItem>

                    {/* system section*/}
                    <div className={sectionTitleClass}>ตั้งค่าระบบ</div>
                    <MenuItem
                        active={currentPath === "/employee/"}
                        icon={<FaBriefcase className={iconClass(currentPath === "/employee/")} />}
                        component={<Link to="/employee/" />}
                        className={itemClass(currentPath === "/employee/")}
                    >
                        สิทธิ์ผู้ใช้งาน
                    </MenuItem>

                    <MenuItem
                        active={currentPath === "/employee/"}
                        icon={<FaBriefcase className={iconClass(currentPath === "/employee/")} />}
                        component={<Link to="/employee/" />}
                        className={itemClass(currentPath === "/employee/")}
                    >
                        หมวดหมู่
                    </MenuItem>
                    
                    <MenuItem
                        active={currentPath === "/employee/"}
                        icon={<FaBriefcase className={iconClass(currentPath === "/employee/")} />}
                        component={<Link to="/employee/" />}
                        className={itemClass(currentPath === "/employee/")}
                    >
                        หน่วยนับ
                    </MenuItem>


                </Menu>

                <div className="items-center justify-center flex flex-col mt-10">
                    <p className="text-gray-300">version 1.0.0</p>
                </div>
            </ProSidebar>
        </div>
    );
};

export default Sidebar;
