import React, { useState, useEffect, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Dropdown } from 'flowbite-react'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import TopNav from '../components/Navbar';
import axios from 'axios'
import FooterContainer from '../components/Footer';
import AdminDrawer from '../components/AdminDrawer'
import ReportGeneration from '../hooks/ReportGeneration';


const ManageLearners = () => {
    const endpoint = import.meta.env.VITE_ENDPOINT
    const [instructors, setInstructors] = useState([])
    const [loggedIn, setLoggin] = useState(false)
    const navigate = useNavigate()
    const {exportInstructortData} = ReportGeneration()

    useEffect(() => {
        fetchInstructors()
    }, [])

    const fetchInstructors = async () => {
        const response = await axios.get(`${endpoint}/api/manageinstructors`)
        const data = response.data
        setInstructors(data)
    }

    useEffect(() => {
        const uid = localStorage.getItem('UID')
        if (uid) {
            setLoggin(true)
        } else {
            navigate('/adminlogin')
        }
    }, [navigate])


    const deleteInstructor = (email) => {
        try {
            const response = axios.delete(`${endpoint}/api/deleteinstructor?email=${email}`)
            console.log('Instructor removed successfully')
            fetchInstructors()
            window.location.reload()
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <>
            <TopNav />
            <AdminDrawer />
            {loggedIn ? (
                <div className='flex flex-col'>
                    <div className='flex justify-between items-center px-10'>
                        <h1 className='text-2xl font-bold px-10 py-10'>Associated Instructors</h1>
                        <Button onClick={() => exportInstructortData(instructors)} className=''>Export PDF</Button>
                    </div>
                    <div className='py-7 px-10 pt-0 h-screen overflow-y-scroll'>
                        <Table hoverable >
                            <Table.Head>
                                <Table.HeadCell>Firstname</Table.HeadCell>
                                <Table.HeadCell>Lastname</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Phone Number</Table.HeadCell>
                                <Table.HeadCell>Action</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {instructors.map((instrctor) => (
                                    <Table.Row key={instrctor._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>{instrctor.firstName}</Table.Cell>
                                        <Table.Cell>{instrctor.lastName}</Table.Cell>
                                        <Table.Cell>{instrctor.email}</Table.Cell>
                                        <Table.Cell>+254 {instrctor.phone}</Table.Cell>
                                        <Table.Cell>
                                            <Dropdown label='' placement="bottom" renderTrigger={() => <span className='flex justify-center items-center'><PiDotsThreeOutlineFill className='text-3xl text-blue-600 cursor-pointer hover:text-blue-500 duration-75 ease-in' /></span>}>
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={() => deleteInstructor(instrctor.email)}>Remove</Dropdown.Item>
                                            </Dropdown>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>

                    <FooterContainer />
                </div>
            ) : (
                <div>Please Login</div>
            )}
        </>
    )
}

export default ManageLearners