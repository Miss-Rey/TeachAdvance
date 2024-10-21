import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Navbar from '../components/Navbar'
import { FcViewDetails } from "react-icons/fc";
import { useSnackbar } from 'notistack';
import '../styles.css'


const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEnrolled, setEnrolled] = useState(false)
    const [message, setMessage] = useState('');
    const endpoint = import.meta.env.VITE_KEYSTONE;
    const node_endpoint = import.meta.env.VITE_ENDPOINT
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        fetchCourseDetails(id);
    }, [id]);

    useEffect(() => {
        checkIfLoggedIn()
    })

    const checkIfLoggedIn = () => {
        const token = localStorage.getItem('at')

        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
            navigateTo('/login')
        }
    }

    const fetchCourseDetails = async (courseId) => {
        const query = `
            query {
                courses(where: { id: { equals: "${courseId}" } }) {
                    id
                    title
                    description
                    author
                    language
                    duration
                    objectives {
                        document
                    }
                    audience { 
                        document
                    }
                    thumbnail {
                        url
                    }
                    chapter {
                        id
                        title
                        submodules {
                            id
                            title
                        }
                    }
                }
            }
        `;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            const data = await response.json();
            console.log(data);

            // Check for errors in the response
            if (data.errors) {
                setError(data.errors);
                console.error("GraphQL Errors:", data.errors);
                return;  // Exit the function if there's an error
            }

            // Set the course data, assuming courses returns an array
            setCourse(data.data.courses[0]); // Get the first course

        } catch (error) {
            console.error('Error fetching data', error);
            setError(error); // Set the error state
        } finally {
            setLoading(false); // Stop loading regardless of the outcome
        }
    };

    useEffect(() => {
        checkEnrollment(id)
    }, [id])

    const userId = localStorage.getItem('UID')

    const checkEnrollment = async (courseId) => {
        try {
            const response = await fetch(`${node_endpoint}/api/enrolled?couseId=${courseId}&userId=${userId}`)
            const data = await response.json();
            if (!response.ok) {
                enqueueSnackbar('Already enrolled to course', { variant: 'error' })

            } 
            console.log(data)
            setEnrolled(data.isEnrolled)
        } catch (error) {
            console.error(error)
            enqueueSnackbar('Error checking enrollment', { variant: 'error' });
        }
    }

    const handleEnroll = async () => {
        if (!userId) {
            setMessage('Please login to enroll')
            enqueueSnackbar('Please login to enroll', { variant: 'error' })
            return;
        }
        setLoading(true)

        try {
            const response = await fetch(`${node_endpoint}/api/enroll`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ courseId: id, userId })
            })

            const result = await response.json();
            console.log(result)

            if (response.ok && result.success) {
                setEnrolled(true)
                setMessage('Successfully enrolled to the course')
                enqueueSnackbar('Successfully enrolled to the course', { variant: 'success' })
            } else {
                setMessage('Failed to enroll');
                enqueueSnackbar('Failed to enroll', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error enrolling', error)
            setMessage('Failed to enroll')
            enqueueSnackbar('Failed to enrolled', { variant: 'error' })
        } finally {
            setLoading(false)
        }
    }

    // Handle loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading course details</div>;
    if (!course) return <div>No course found</div>; // Handle case where no course is returned


    const renderRichText = (document) => {
        if (!document || !Array.isArray(document)) {
            console.log('Invalid document structure:', document);
            return null;
        }

        return document.map((node, index) => {
            switch (node.type) {
                case 'paragraph':
                    return <p key={index}>{node.children?.map(child => renderText(child)).join(' ')}</p>;

                case 'unordered-list':
                    return (
                        <ul key={index} className='list-disc'>
                            {node.children?.map((listItem, listItemIndex) => (
                                <li key={listItemIndex}>
                                    {listItem.children?.map(listItemContent =>
                                        listItemContent.children?.map(subChild => renderText(subChild)).join(' ')
                                    )}
                                </li>
                            ))}
                        </ul>
                    );

                case 'ordered-list':
                    return (
                        <ol key={index} className='list-decimal'>
                            {node.children?.map((listItem, listItemIndex) => (
                                <li key={listItemIndex}>
                                    {listItem.children?.map(listItemContent =>
                                        listItemContent.children?.map(subChild => renderText(subChild)).join(' ')
                                    )}
                                </li>
                            ))}
                        </ol>
                    );

                case 'list-item':
                    return (
                        <li key={index}>
                            {node.children?.map(listItemContent =>
                                listItemContent.children?.map(subChild => renderText(subChild)).join(' ')
                            )}
                        </li>
                    );

                default:
                    return <div key={index}>Unknown node type: {node.type}</div>;
            }
        });
    };

    // Helper function to handle formatting within the text
    const renderText = (textNode) => {
        if (!textNode.text) return null;

        let formattedText = textNode.text;

        // Apply bold
        if (textNode.bold) {
            formattedText = <strong>{formattedText}</strong>;
        }

        // Apply italic
        if (textNode.italic) {
            formattedText = <em>{formattedText}</em>;
        }

        return formattedText;
    };


    return (
        <>
            <Navbar />
            <div className='flex flex-col w-full h-auto bg-blue-200 gap-10 items-center md:flex-row lg:flex-row xl:flex-row'>
                <div className='p-20'>
                    {course.thumbnail && <img className='h-44 w-70 rounded-md' src={course.thumbnail.url} alt={course.title} />} {/* Render thumbnail only if it exists */}
                </div>
                <div className='flex flex-col gap-4 justify-between'>
                    <h1 className='font-bold text-2xl'>{course.title}</h1>
                    <span><strong>Duration:</strong> {course.duration}</span>
                    <span><strong>Language:</strong> {course.language}</span>
                    <span><strong>Author:</strong> {course.author}</span>

                </div>
                <div>
                    <button onClick={handleEnroll} disabled={loading || isEnrolled} className={`px-4 py-2 font-bold text-white rounded ${
                    isEnrolled ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                }`}>{loading ? 'Enrolling...' : isEnrolled ? 'Enrolled' : 'Enroll Now'}</button>

                </div>


            </div>


            <Tabs aria-label="Tabs with underline" variant="underline" className='px-10 py-3'>
                <Tabs.Item active title="Course Details" icon={FcViewDetails} >
                    <div className='p'>
                        <h2 className='font-bold text-xl'>Introduction</h2>
                        <p className='py-3'>{course.description}</p> {/* Fixed the spelling here */}
                        <h2 className='font-bold text-xl'>Audience</h2>
                        <span className='p-3 list-decimal'>
                            <ul className='list-decimal'>
                                <li>
                                    {course.audience && course.audience.document && renderRichText(course.audience.document)}

                                </li>

                            </ul>

                        </span>

                        <h2 className='font-bold text-xl'>Objectives</h2>
                        <span className='lists p-3'>
                            {course.objectives && course.objectives.document && renderRichText(course.objectives.document)}

                        </span>
                    </div>

                </Tabs.Item>
                <Tabs.Item title="Course Content" icon={MdDashboard}>
                    {course.chapter.map((chapter) => (
                        <div key={chapter.id} className='lists my-4'>
                            <h3 className='font-semibold'>{chapter.title}</h3>
                            <ul className='py-3 px-4 list-decimal'>
                                {chapter.submodules && chapter.submodules.map((submodule) => (
                                    <li key={submodule.id}>
                                        {submodule.title} {/* Display submodule title */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </Tabs.Item>

            </Tabs>
        </>
    );
}

export default CourseDetails;
