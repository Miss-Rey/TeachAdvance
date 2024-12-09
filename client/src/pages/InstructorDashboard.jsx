import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Dropdown } from 'flowbite-react';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import TopNav from '../components/Navbar';
import InvitationModal from '../components/InvitationModal';
import ManageCourseModal from '../components/ManageCourseModal';
import CreateClass from '../components/CreateClass';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import FooterContainer from '../components/Footer';

const InstructorDashboard = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClassCode, setSelectedClassCode] = useState(''); 
    const [selectedClassName, setSelectedClassName] = useState(''); 
    const [instructor, setInstructor] = useState({});
    const [loading, setLoading] = useState(false);
    // const endpoint = import.meta.env.VITE_ENDPOINT;
    const endpoint = 'https://teachadvance.onrender.com'
    const instructorId = localStorage.getItem('UID');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar} = useSnackbar()
    const [openModal, setOpenModal] = useState(false);
    const [manageClass, setManageClassModal] = useState(false);
    const [createClass, setCreateClass] = useState(false);

    useEffect(() => {
        fetchClasses();
    }, [instructorId]);

    useEffect(() => {
        const uid = localStorage.getItem('UID');
        if (uid) {
            setLoggedIn(true);
        } else {
            navigate('/instructorlogin');
        }
    }, [navigate]);

    const fetchClasses = async () => {
        try {
            const [classesResponse, instructorResponse] = await Promise.all([
                axios.get(`${endpoint}/api/getclasses?instructorId=${instructorId}`),
                axios.get(`${endpoint}/api/instructorProfile?instructorId=${instructorId}`),
            ]);
            if (classesResponse.status === 200) {
                setClasses(classesResponse.data);
            }
            if (instructorResponse.status === 200) {
                setInstructor(instructorResponse.data);
            }
            setLoading(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loggedIn ? (
                <div>
                    <TopNav />
                    <InvitationModal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        classCode={selectedClassCode} // Pass the selected class code
                        className={selectedClassName} // Pass the selected class name
                    />
                    <ManageCourseModal
                        manageClass={manageClass}
                        setManageClassModal={setManageClassModal}
                        classes={classes}
                    />
                    <CreateClass
                        createClass={createClass}
                        setCreateClass={setCreateClass}
                        instructorId={instructorId}
                    />
                    <h2 className="font-bold text-2xl py-10 px-5">My Classes</h2>
                    <div className="">
                        <Button className="m-5" onClick={() => setCreateClass(true)}>
                            Create New Class
                        </Button>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>Class</Table.HeadCell>
                                <Table.HeadCell>Date</Table.HeadCell>
                                <Table.HeadCell>Type</Table.HeadCell>
                                <Table.HeadCell>Instructor</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {classes.map((Class) => (
                                    <Table.Row
                                        key={Class.classCode}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <div>{Class.classCode}</div>
                                            <div>{Class.courseName}</div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className="font-medium text-md">10/2/2024 - </span>
                                            <span className="font-medium text-md">{Class.endDate}</span>
                                        </Table.Cell>
                                        <Table.Cell className="font-medium text-md">
                                            Instructor-Led
                                        </Table.Cell>
                                        <Table.Cell className="font-medium text-md">
                                            {instructor?.firstname && instructor?.lastname ? (
                                                <span>
                                                    {instructor.firstname} {instructor.lastname}
                                                </span>
                                            ) : (
                                                'No Instructor Assigned'
                                            )}
                                        </Table.Cell>
                                        <Table.Cell className="flex justify-between">
                                            <Button
                                                className="bg-transparent border-blue-600 border-2 text-black rounded-lg hover:bg-blue-300 hover:text-white duration-75 ease-in"
                                                onClick={() => {
                                                    setSelectedClassCode(Class.classCode); // Set selected class code
                                                    setSelectedClassName(Class.courseName); // Set selected class name
                                                    setOpenModal(true);
                                                }}
                                            >
                                                Invite Student
                                            </Button>
                                            <Dropdown
                                                label=""
                                                placement="left"
                                                renderTrigger={() => (
                                                    <span className="flex justify-center items-center">
                                                        <PiDotsThreeOutlineFill className="text-3xl text-blue-600 cursor-pointer hover:text-blue-500 duration-75 ease-in" />
                                                    </span>
                                                )}
                                            >
                                                <Dropdown.Item onClick={() => setManageClassModal(true)}>
                                                    Manage Course
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item>
                                                    <Link
                                                        to={`/${encodeURIComponent(
                                                            Class.classCode
                                                        )}/managelearners`}
                                                        state={{ val: 'welcome to my website' }}
                                                    >
                                                        Manage Learners
                                                    </Link>
                                                </Dropdown.Item>
                                            </Dropdown>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            ) : (
                <div>Please Login</div>
            )}
            <FooterContainer />
        </>
    );
};

export default InstructorDashboard;
