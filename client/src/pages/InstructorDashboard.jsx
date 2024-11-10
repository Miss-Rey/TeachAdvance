import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from "flowbite-react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import TopNav from '../components/Navbar';


const InstructorDashboard = () => {
    const [classes, setClasses] = useState([])
    const [instrctor, setInstructor] = useState([])
    const [loading, setLoading] = useState(false)
    const endpoint = import.meta.env.VITE_ENDPOINT;
    const instructorId = localStorage.getItem('UID')

    useEffect(() => {
        fetchClasses()
    }, [instructorId])

    const fetchClasses = async () => {
        try {
            const [classesResponse, instructorResponse] = await Promise.all([
                axios.get(`${endpoint}/api/getclasses?instructorId=${instructorId}`),
                axios.get(`${endpoint}/api/instructorProfile?instructorId=${instructorId}`)
            ]);
            if (classesResponse.status === 200) {
                setClasses(classesResponse.data);
            }
            
            if (instructorResponse.status === 200) {
                setInstructor(instructorResponse.data);
            }
            setLoading(true)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <TopNav />
            <h2 className='font-bold text-2xl py-10 px-5'>My Classes</h2>
            <div className="overflow-x-auto">

                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Class</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Instructor</Table.HeadCell>
                        <Table.HeadCell>
                            Actions
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {classes.map((Class) => {
                            return (
                                <Table.Row key={Class._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        <div>{Class.classCode}</div>
                                        <div>{Class.className}</div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className='font-medium text-md'>10/2/2024 - </span>
                                        <span className='font-medium text-md'>{Class.endDate}</span>
                                    </Table.Cell>
                                    <Table.Cell className='font-medium text-md'>Instructor-Led</Table.Cell>
                                    <Table.Cell className='font-medium text-md'>{instrctor && (<span>{instrctor.firstname} {instrctor.lastname}</span>)}</Table.Cell>
                                    <Table.Cell className='flex justify-between'>
                                        <a href="" className='border-blue-500 border-2 px-2 py-1 font-semibold hover:bg-blue-600 hover:text-white duration-75 ease-in rounded-lg'>Invite Learners</a>
                                        <a href="#" className="font-medium text-3xl text-cyan-600 hover:underline dark:text-cyan-500">
                                            <PiDotsThreeOutlineFill />
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}

                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default InstructorDashboard