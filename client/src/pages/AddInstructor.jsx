import { React, useState, useEffect } from 'react'
import AdminDrawer from '../components/AdminDrawer'
import { Tabs } from 'flowbite-react'
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import TopNav from '../components/Navbar';
import FooterContainer from '../components/Footer';
import { MdDashboard } from "react-icons/md";
import { ManualAddInstructor } from '../components/ManualAddInstructor';
import InviteInstructor from '../components/InviteInstructor';

const AddInstructor = () => {

    

    return (
        <div>
            <TopNav />
            <AdminDrawer />
            <div className='px-10 py-5 w-full flex flex-col'>
                <h2 className='text-3xl font-bold py-10'>Add Instructor</h2>
                <Tabs aria-label="Default tabs" variant="default" className=''>
                    <Tabs.Item active title="Manual" icon={HiUserCircle}>
                        <ManualAddInstructor />
                    </Tabs.Item>
                    <Tabs.Item title="Invite" icon={MdDashboard}>
                        <InviteInstructor />
                    </Tabs.Item>

                </Tabs>
            </div>
            <FooterContainer />
        </div>
    )
}

export default AddInstructor