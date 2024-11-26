import {React, useState} from 'react'
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import {
    HiChartPie,
    HiClipboard,
    HiCollection,
    HiInformationCircle,
    HiLogin,
    HiPencil,
    HiSearch,
    HiShoppingBag,
    HiUsers,
    HiMenuAlt2
} from "react-icons/hi";
import TopNav from './Navbar';
import { PiChalkboardTeacher } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";


const AdminDashboard = () => {

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);

    const signout = () => {
        localStorage.clear()
        window.location.href = '/login'
    }

    return (
        <div>
            <div className="flex h-auto items-start">
                <Button onClick={() => setIsOpen(true)} className='bg-slate-200'>
                    <HiMenuAlt2 className='text-xl text-bold text-black' />
                </Button>
            </div>
            <Drawer open={isOpen} onClose={handleClose}>
                <Drawer.Header title="MENU" titleIcon={() => <></>} />
                <Drawer.Items>
                    <Sidebar
                        aria-label="Sidebar with multi-level dropdown example"
                        className="[&>div]:bg-transparent [&>div]:p-0"
                    >
                        <div className="flex h-full flex-col justify-between py-2">
                            <div>
                                
                                <Sidebar.Items>
                                    <Sidebar.ItemGroup>
                                        {/* <Sidebar.Item href="/admindashboard" icon={HiChartPie}>
                                            Dashboard
                                        </Sidebar.Item> */}
                                        <Sidebar.Item href="http://localhost:3000/signup" icon={PiChalkboardTeacher}>
                                            Add Course
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admindashboard/addinstructor" icon={PiChalkboardTeacher}>
                                            Add Instructor
                                        </Sidebar.Item>
                                        
                                        <Sidebar.Item href="/admindashboard/addadmin" icon={RiAdminLine}>
                                            Add Admin
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admindashboard/manageinstructors" icon={RiShieldUserFill}>
                                            Manage Instructors
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/admindashboard/manageadmin" icon={MdOutlineAdminPanelSettings}>
                                            Manange Admins
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item className='cursor-pointer' onClick={() => signout()} icon={CiLogout}>
                                            Sign Out
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                            </div>
                        </div>
                    </Sidebar>
                </Drawer.Items>
            </Drawer>
        </div>
    )
}

export default AdminDashboard