import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddClassForm = () => {
    const endpoint = import.meta.env.VITE_ENDPOINT
    const [courses, setCourses] = useState([])


    useEffect(() => {
        fetchInstructorDetails()
    }, [])


    const fetchInstructorDetails = async () => {
        try {
            const email = localStorage.getItem('e')
            console.log(email)
            const response = await axios.get(`${endpoint}/api/getinstructors?email=${email}`)
            const data = response.data

            if(data?.courses) {
                setCourses(data.courses)
                console.log({'courses': data.courses})
            }
        } catch (error) {
            console.error(error)
        }
    }
    const [formData, setFormData] = useState({
        courseId: '',
        courseName: '',
        endDate: '',
        classCode: '',
        instructorId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/add-class', formData);
            alert(response.data);  // success message from backend
            setFormData({
                courseId: '',
                courseName: '',
                endDate: '',
                classCode: '',
                instructorId: ''
            });  // Clear form after successful submission
        } catch (error) {
            console.error('Error adding class:', error);
            alert('Error adding class');
        }
    };

    return (
        <div>
            <h1>Add a New Class</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="courseId">Course ID:</label>
                    <input
                        type="text"
                        id="courseId"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="courseName">Course Name:</label>
                    <input
                        type="text"
                        id="courseName"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endDate">End Date (Timestamp):</label>
                    <input
                        type="number"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="classCode">Class Code:</label>
                    <input
                        type="text"
                        id="classCode"
                        name="classCode"
                        value={formData.classCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="instructorId">Instructor ID:</label>
                    <input
                        type="text"
                        id="instructorId"
                        name="instructorId"
                        value={formData.instructorId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Class</button>
            </form>
        </div>
    );
};

export default AddClassForm;
