import React, { useState, useEffect } from 'react';
import { Dropdown, Modal, TextInput, Label, Button } from 'flowbite-react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AddClassForm = ({ createClass, setCreateClass, classes, instructorId }) => {
    const endpoint = import.meta.env.VITE_ENDPOINT;
    const keystone_endpoint = import.meta.env.VITE_KEYSTONE;
    const { enqueueSnackbar} = useSnackbar()
    const [courses, setCourses] = useState([]);
    const [titles, setTitles] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null); // Track selected course
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        classCode: '', // Manually entered by instructor
        endDate: '' // User-input field
    });

    useEffect(() => {
        fetchInstructorDetails()
    }, [])


    const fetchInstructorDetails = async () => {
        try {
            const email = localStorage.getItem('e')
            console.log(email)
            const response = await axios.get(`${endpoint}/api/getinstructors?email=${email}`)
            const data = response.data

            if (data?.courses) {
                setCourses(data.courses)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Fetch course titles on component mount
    useEffect(() => {
        const fetchClassName = async () => {
            try {
                const coursesId = courses.map(course => `"${course}"`).join(",");
                const query = `
                    query {
                        courses(where: { id: { in: [${coursesId}] }}) {
                            id
                            title
                        }
                    }
                `;

                const response = await fetch(`${keystone_endpoint}`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ query })
                });

                const data = await response.json();
                console.log(data)
                if (data.data && data.data.courses) {
                    setTitles(data.data.courses);
                } else {
                    setError('No courses found');
                }
            } catch (error) {
                console.error(error);
                setError('Failed to fetch courses');
            }
        };

        fetchClassName();
    }, [courses]);

    // Handle course selection from the dropdown
    const handleCourseSelect = (course) => {
        setSelectedCourse(course); // Update selected course
    };

    // Handle form field changes (classCode and endDate)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Automatically pick instructorId
            if (!selectedCourse) {
                alert("Please select a course.");
                return;
            }

            const requestBody = {
                courseId: selectedCourse.id, // Selected course ID
                instructorId, // Automatically picked from instructor prop
                courseName: selectedCourse.title,
                classCode: formData.classCode, // Entered by the instructor
                endDate: formData.endDate
            };
            console.log(requestBody)

            const response = await axios.post(`${endpoint}/api/addclass`, requestBody);
            enqueueSnackbar('Class added successfully', {variant: 'success'})
            window.location.reload()
            setFormData({ classCode: '', endDate: '' });
            setSelectedCourse(null);
        } catch (error) {
            console.error('Error adding class:', error);
            enqueueSnackbar('Error adding class', {variant: 'error'})

        }
    };

    return (
        <div>
            <Modal show={createClass} size="lg" popup onClose={() => setCreateClass(false)}>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="courseId">Course:</Label>
                            <Dropdown label={selectedCourse ? selectedCourse.title : "Select a Course"} inline>
                                {titles.map((title) => (
                                    <Dropdown.Item
                                        key={title.id}
                                        onClick={() => handleCourseSelect(title)}
                                    >
                                        {title.title}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </div>
                        <div>
                            <Label htmlFor="classCode">Class Code:</Label>
                            <TextInput
                                type="text"
                                id="classCode"
                                name="classCode"
                                value={formData.classCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* <div>
                            <Label htmlFor="courseName">Course Name:</Label>
                            <TextInput
                                type="text"
                                id="courseName"
                                name="courseName" // Matches the formData key
                                value={formData.courseName} // Binds to the courseName state
                                onChange={handleChange}
                                required
                            />
                        </div> */}

                        <div>
                            <Label htmlFor="endDate">End Date (Timestamp):</Label>
                            <TextInput
                                type="number"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit">Add Class</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddClassForm;
