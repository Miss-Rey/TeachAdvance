import React, { useState, useEffect, } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Table, Button, Dropdown } from 'flowbite-react'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import TopNav from '../components/Navbar';
import axios from 'axios'

const ManageLearners = () => {
    const { classCode } = useParams()
    const location = useLocation()
    console.log(location)
    const endpoint = import.meta.env.VITE_ENDPOINT
    const [learners, setLearners] = useState([])
    const [className, setClass] = useState('')

    useEffect(() => {
        fetchLearners()
    }, [classCode])

    const fetchLearners = async () => {
        const response = await axios.get(`${endpoint}/api/getlearners?classCode=${classCode}`)
        const data = response.data
        setLearners(data)
        const className = data[0].className
        setClass(className)
        console.log(className)
    }
    return (
        <div className='flex flex-col'>
            <TopNav />
            <div className='p-10 pb-0'>
                <span className='text-2xl font-md'>{classCode}: </span>
                <span className='text-2xl font-md'>{className}</span>
            </div>
            <h1 className='text-2xl font-bold px-10 py-10'>Enrolled Learners</h1>
            <div className='py-7 px-10 pt-0'>
                <Table hoverable >
                    <Table.Head>
                        <Table.HeadCell>Firstname</Table.HeadCell>
                        <Table.HeadCell>Lastname</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {learners.map((learner) => (
                            <Table.Row key={learner._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{learner.firstName}</Table.Cell>
                                <Table.Cell>{learner.lastName}</Table.Cell>
                                <Table.Cell>{learner.email}</Table.Cell>
                                <Table.Cell>{learner.status}</Table.Cell>
                                <Table.Cell>
                                    <Dropdown label='' placement="bottom" renderTrigger={() => <span className='flex justify-center items-center'><PiDotsThreeOutlineFill className='text-3xl text-blue-600 cursor-pointer hover:text-blue-500 duration-75 ease-in' /></span>}>
                                        <Dropdown.Item>Suspend</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item>Unenroll</Dropdown.Item>
                                    </Dropdown>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>


        </div>
    )
}

export default ManageLearners