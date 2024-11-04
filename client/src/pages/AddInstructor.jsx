import { React, useState, useEffect } from 'react'
import AdminDrawer from '../components/AdminDrawer'
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { Tabs, Button, Label, TextInput, } from 'flowbite-react'
import { MdDashboard } from "react-icons/md";
import axios from 'axios'
import { FaLandmarkDome } from 'react-icons/fa6';

const AddInstructor = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [courses, setCourses] = useState([])
    const [programs, setPrograms] = useState([])
    const [loading, setLoading] = useState(false)
    const endpoint = import.meta.env.VITE_ENDPOINT
    const keystone_endpoint = import.meta.env.VITE_KEYSTONE
    const handleFirstnameChange = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastnameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleCoursesChange = (e) => {
        const value = e.target.value;
        setCourses(value.split(',').map(course => course.trim())); // Trim spaces and convert to array
    };

    useEffect(() => {
        fetchCourse()
    }, [])

    const fetchCourse = async () => {
        const query = `
            query {
                courses {
                    id
                    title
                    description
                    author
                    thumbnail {
                        url
                    }
                    
                }
            }
        `
        try {
            const response = await fetch(`${keystone_endpoint}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    query: query
                })
            })

            const data = await response.json()
            console.log(data)
            setPrograms(data.data.courses)
            setLoading(true)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            firstName, lastName, email, phone, password, courses, isInvited: false
        }

        try {
            const response = await axios.post(`${endpoint}/api/addinstructor`, { firstName, lastName, email, phone, password, courses, isInvited: false })
            console.log(response.data)
            console.log(courses)

            if (response.status === 200) {
                console.log("Instructor added successfully")
            }

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <AdminDrawer />
            <div>
                <Tabs aria-label="Default tabs" variant="default">
                    <Tabs.Item active title="Manual" icon={HiUserCircle}>
                        <form className="flex max-w-md flex-col gap-4 mx-10">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="firstName" value="FirstName" />
                                </div>
                                <TextInput id="firstName" type="text" placeholder="John" value={firstName} onChange={handleFirstnameChange} required shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="lastName" value="LastName" />
                                </div>
                                <TextInput id="lastName" type="text" placeholder="Doe" value={lastName} onChange={handleLastnameChange} required shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value='Email' />
                                </div>
                                <TextInput id="email" type="eamil" placeholder="johndoe@example.com" value={email} onChange={handleEmailChange} required shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="phone" value='Phone Number' />
                                </div>
                                <TextInput id="phone" type="tel" placeholder="0712345678" value={phone} onChange={handlePhoneChange} required shadow />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="courses" value='Courses' />
                                </div>
                                <div id="courses" className="form-group">
                                    {programs.map((program) => (
                                        <div key={program.id} className="form-check">
                                            <input
                                                type="checkbox"
                                                id={`course-${program.id}`}
                                                value={program.id} // Send the ID, not the title
                                                onChange={(e) => {
                                                    const courseId = e.target.value;
                                                    if (e.target.checked) {
                                                        // Add the selected course ID to the state
                                                        setCourses((prevCourses) => [...prevCourses, courseId]);
                                                    } else {
                                                        // Remove the unselected course ID from the state
                                                        setCourses((prevCourses) => prevCourses.filter((id) => id !== courseId));
                                                    }
                                                }}
                                                className="form-check-input"
                                            />
                                            <label htmlFor={`course-${program.id}`} className="form-check-label">
                                                {program.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password2" value="Your password" />
                                </div>
                                <TextInput id="password2" type="password" value={password} onChange={handlePasswordChange} required shadow />
                            </div>
                            <Button onClick={handleSubmit} type="submit">Add Instructor</Button>
                        </form>
                    </Tabs.Item>
                    <Tabs.Item title="Invite" icon={MdDashboard}>
                        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                        control the content visibility and styling.
                    </Tabs.Item>

                </Tabs>
            </div>
        </div>
    )
}

export default AddInstructor