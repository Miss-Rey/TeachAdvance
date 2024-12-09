import { React, useState, useEffect } from 'react'
import { FaUsers } from "react-icons/fa6";
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Recommendation = () => {

    const [courses, setCourses] = useState([]);
    // const endpoint = import.meta.env.VITE_KEYSTONE
    const endpoint = 'https://caea-102-0-15-152.ngrok-free.app/api/graphql/'
    useEffect(() => {
       fetchCourses();
    }, []);

    const fetchCourses = async () => {
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
            setCourses(data.data.courses);
        } catch (error) {
            console.error('Error fetching courses', error)
        }
    }

    // const renderDescription = (description) => {
    //     return description.map((desc, index) => (
    //         <div key={index}>
    //             {desc.children.map((child, childIndex) => (
    //                 <p key={childIndex}>{child.text}</p>
    //             ))}
    //         </div>
    //     ));
    // };

    return (
        <>
            <section className='recommendation hidden lg:flex xl:flex 2xl:flex flex-col gap-3 justify-center items-center'>
                <h2 className='font-bold text-2xl text-center'>Recommendation</h2>
                <h2 className='text-lg'>Learning mandatory ICT courses to achieve great transformation in the workplace</h2>
                <div className='flex justify-end w-full mr-10 text-red-600 hover:text-red-400 ease-in duration-75 cursor-pointer'><a href="/courses">View More</a></div>
                <div className='flex gap-5 mb-10'>
                    {courses.slice(0, 4).map((course) => (
                        <div key={course.id} className='course flex flex-col h-[450px] justify-center items-center lg:bg-slate-100 w-72 rounded-md'>
                            <div className='h-1/2 w-full'>
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

            </section>
            <section className='lg:hidden xl:hidden 2xl:hidden'>
                <h2 className='font-bold text-xl text-center text-black'>Recommendation</h2>
                <h2 className='text-md m-3 text-center text-black'>Learning mandatory ICT courses to achieve great transformation in the workplace</h2>

                <div className=' overflow-auto text-black'>
                    <div className="carousel carousel-end mx-2 gap-2 overflow-auto">
                        <div className="carousel-item gap-1">
                            {courses.map((course) => (
                                <div className='course flex flex-col justify-center items-center bg-slate-100 w-72 rounded-md h-[450px]'>
                                    <div className='h-1/2 w-full'>
                                        <img className='w-full h-full' src={course.thumbnail.url} alt={course.Name} />
                                    </div>
                                    <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                                        <div className='font-bold text-xl'>{course.Name}</div>
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
                       
                    </div>


                </div>
            </section>
        </>
    )
}

export default Recommendation