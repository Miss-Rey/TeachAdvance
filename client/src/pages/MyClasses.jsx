import { React, useState, useEffect } from 'react';
import TopNav from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import Loading from '../components/Loading';

const MyCourses = () => {
    const node_endpoint = import.meta.env.VITE_ENDPOINT;
    const endpoint = import.meta.env.VITE_KEYSTONE;
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('UID');
    const [errorMessage, setErrorMessage] = useState('');
    const [classCode, setClassCode] = useState('')

    // Effect to fetch enrolled courses
    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            if (!userId) {
                setErrorMessage('Please login');
                setLoading(false);
                return;
            }

            try {
                const userInfo = await fetch(`${node_endpoint}/api/profile?userId=${userId}`)
                const info = await userInfo.json()
                const response = await fetch(`${node_endpoint}/api/getStudentClasses?email=${info.email}`);
                const data = await response.json();
                setClassCode(data)

                if (data && data.length > 0) {
                    const classNames = data.map((classItem) => classItem.className)
                    localStorage.setItem('classname', JSON.stringify(classNames)); // Store IDs in localStorage
                    fetchMyCourses(classNames); // Fetch courses right after getting the IDs
                } else {
                    setErrorMessage('No Classes Found');
                }
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
                setErrorMessage('Failed to fetch enrolled courses');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, [userId]);

    // Function to fetch course details based on course IDs
    const fetchMyCourses = async (classNames) => {
        const query = `
      query {
        courses(where: { title: { in: [${classNames.map(name => `"${name}"`).join(',')}] } }) {
          id
          title
          description
          author
          thumbnail {
            url
          }
        }
      }
    `;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            const data = await response.json();
            console.log('Fetched Courses:', data); 

            if (data.data && data.data.courses) {
                setEnrolledCourses(data.data.courses); // Update state with fetched courses
            } else {
                setErrorMessage('No courses found');
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
            setErrorMessage('Failed to fetch course details');
        }
    };

    // Render loading state or error message
    if (loading) {
        return <Loading />;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    return (
        <>
            <TopNav />
            <div className=''>
                {enrolledCourses.length === 0 ? (
                    <div>No enrolled courses available.</div>
                ) : (
                    enrolledCourses.map((course) => (
                        <div key={course.id} className=' flex flex-col h-auto md:grid lg:grid xl:grid 2xl:grid grid-cols-4 gap-5 m-5 md:m-10 lg:m-10 xl:m-10 2xl:m-10'>
                            {classCode.map((code) => (
                                <div className='h-auto'>
                                    <div className='h-[200px]'>
                                        {course.thumbnail && course.thumbnail.url ? (
                                            <img src={course.thumbnail.url} alt={course.title} className='w-full h-full' />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                    </div>
                                    <div className='h-1/4'>
                                        <h1 className='text-md px-4 pt-4 '>{code.classCode}</h1>
                                        <h1 className='text-xl font-semibold p-4'>{course.title}</h1>
                                        <div className='flex items-center gap-1 p-3 border-t-[1px] border-slate-300 text-sm text-blue-300'>
                                            <Link to={`/courses/${course.id}/notes`}>Continue Learning</Link>
                                            <FaArrowRight />
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default MyCourses;