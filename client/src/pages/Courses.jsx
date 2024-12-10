import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import TopNav from '../components/Navbar';
import { Pagination } from "flowbite-react";
import Loading from '../components/Loading';
import FooterContainer from '../components/Footer';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCourses, setTotalCourses] = useState(0);
    const [isEnrolled, setEnrolled] = useState(false);
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const endpoint = import.meta.env.VITE_KEYSTONE
    // const endpoint = 'https://caea-102-0-15-152.ngrok-free.app/api/graphql'
    const navigateTo = useNavigate()
    const coursePerPage = 12;
    useEffect(() => {
        fetchCourses(currentPage);
    }, [currentPage]);



    const fetchCourses = async (page) => {
        const offset = (page - 1) * coursePerPage
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
            const response = await fetch(`${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    query: query,
                })
            })

            const data = await response.json();
            console.log(data)
            setCourses(data.data.courses);
            setLoading(true)
            const totalCount = data.data._allCoursesMeta ? data.data._allCoursesMeta.count : 0;
            setTotalCourses(totalCount)
        } catch (error) {
            console.error('Error fetching courses', error)
        } finally {
            setLoading(false)
        }
    }

    const totalPages = Math.ceil(totalCourses / coursePerPage);
    const onPageChange = (page) => {
        setCurrentPage(page)
    }

    if (loading) return <Loading />;
    return (
        <>
            <TopNav />
            <h2 className='font-bold text-2xl px-5 md:px-10 lg:px-10 xl:px-10 2xl:px-10 py-5'>Course List</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-col-4 items-center justify-center gap-3 mb-10 py-3 px-10'>

                {courses.map((course) => (
                    <div key={course.id} className='course flex flex-col h-[450px] justify-center items-center lg:bg-slate-100 w-72 rounded-md'>
                        <div className='flex justify-center items-center h-1/2 w-full'>
                            <img className='w-full h-full' src={course.thumbnail.url} alt={course.Name} />
                        </div>
                        <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                            <div className='font-bold text-xl'>{course.title}</div>
                            <div>
                                {course.description}
                            </div>

                            <div className='flex items-center gap-2'>
                                <Link to={`/courses/${course.id}`} className='flex justify-center items-center text-center gap-2 text-blue-600 hover:text-blue-800 ease-in'><p>Explore</p> <FaArrowRight /></Link>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination layout="navigation" currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
            </div>
            <FooterContainer />
        </>
    )
}

export default Courses