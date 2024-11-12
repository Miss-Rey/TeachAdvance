import React, { useState, useEffect, } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Table, Button, Dropdown } from 'flowbite-react'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import TopNav from '../components/Navbar';
import axios from 'axios'
import FooterContainer from '../components/Footer';

const ManageLearners = () => {
    const endpoint = import.meta.env.VITE_ENDPOINT
    const [instructors, setInstructors] = useState([])

    useEffect(() => {
        fetchInstructors()
    }, [])

    const fetchInstructors = async () => {
        const response = await axios.get(`${endpoint}/api/getinstructors`)
        const data = response.data
        setInstructors(data)
    }
    return (
        <div className='flex flex-col'>
            <TopNav />
            <div className='p-10 pb-0'>
                
            </div>
            <h1 className='text-2xl font-bold px-10 py-10'>Enrolled Learners</h1>
            <div className='py-7 px-10 pt-0 h-screen overflow-y-scroll'>
                <Table hoverable >
                    <Table.Head>
                        <Table.HeadCell>Firstname</Table.HeadCell>
                        <Table.HeadCell>Lastname</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {instructors.map((instrctor) => (
                            <Table.Row key={instrctor._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{instrctor.firstName}</Table.Cell>
                                <Table.Cell>{instrctor.lastName}</Table.Cell>
                                <Table.Cell>{instrctor.email}</Table.Cell>
                                <Table.Cell>
                                    <Dropdown label='' placement="bottom" renderTrigger={() => <span className='flex justify-center items-center'><PiDotsThreeOutlineFill className='text-3xl text-blue-600 cursor-pointer hover:text-blue-500 duration-75 ease-in' /></span>}>
                                        <Dropdown.Item>Suspend</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item>Remove</Dropdown.Item>
                                    </Dropdown>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            <FooterContainer />
        </div>
    )
}

export default ManageLearners