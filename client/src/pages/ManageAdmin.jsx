import React, { useState, useEffect, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Dropdown } from 'flowbite-react'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import TopNav from '../components/Navbar';
import axios from 'axios'
import FooterContainer from '../components/Footer';
import { useSnackbar } from 'notistack';
import AdminDrawer from '../components/AdminDrawer'
const ManageAdmin = () => {
    const endpoint = import.meta.env.VITE_ENDPOINT
    const [admins, setAdmin] = useState([])
    const [loggedIn, setLoggin] = useState(false)
    const navigate = useNavigate()
    const { enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        fetchAdmin()
    }, [])

    const fetchAdmin = async () => {
        const response = await axios.get(`${endpoint}/api/manageadmin`)
        const data = response.data
        console.log(data)
        setAdmin(data)
    }

    useEffect(() => {
        const uid = localStorage.getItem('UID')
        if (uid) {
            setLoggin(true)
        } else {
            enqueueSnackbar('Session expired redirecting to login page', {variant: 'error'})
            navigate('/adminlogin')
        }
    }, [navigate])


    const deleteAdmin = (email) => {
        try {
            const response = axios.delete(`${endpoint}/api/deleteadmin?email=${email}`)
            console.log('Admin removed successfully')
            enqueueSnackbar('Admin removed successfully', {variant: 'success'})
            fetchAdmin()
            window.location.reload()
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <>
            <AdminDrawer />
            {loggedIn ? (
                <div className='flex flex-col'>
                    <div className='p-10 pb-0'>

                    </div>
                    <h1 className='text-2xl font-bold px-10 py-10'>Associated Instructors</h1>
                    <div className='py-7 px-10 pt-0 h-screen overflow-y-scroll'>
                        <Table hoverable >
                            <Table.Head>
                                <Table.HeadCell>Firstname</Table.HeadCell>
                                <Table.HeadCell>Lastname</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Action</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {admins.map((admin) => (
                                    <Table.Row key={admin._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>{admin.firstName}</Table.Cell>
                                        <Table.Cell>{admin.lastName}</Table.Cell>
                                        <Table.Cell>{admin.email}</Table.Cell>
                                        <Table.Cell>
                                            <Dropdown label='' placement="bottom" renderTrigger={() => <span className='flex justify-center items-center'><PiDotsThreeOutlineFill className='text-3xl text-blue-600 cursor-pointer hover:text-blue-500 duration-75 ease-in' /></span>}>
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={() => deleteAdmin(admin.email)}>Remove</Dropdown.Item>
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

export default ManageAdmin