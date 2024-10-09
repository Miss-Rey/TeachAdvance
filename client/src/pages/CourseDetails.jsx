import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import axios from 'axios'

const CourseDetails = () => {

    const { id } = useParams();
    const [course, setCourse] = useState(null)
    // const [chapters, setChapters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const endpoint = import.meta.env.VITE_STRAPI

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                // const response = await fetch(`http://localhost:1337/api/courses?${id}?populate=chapters,chapters.submodules`);
                const response = await fetch(`${endpoint}/api/courses?populate=*`)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                setCourse(data.data[0]); // Assuming you're getting the course object in the first element
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id])

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!course) return <p>Course not found</p>;

    return (
        <div>
            <h1>{course.Name}</h1>
            <p>{course.Description.map((desc) => desc.children[0].text).join(' ')}</p>
            {/* <img src={`${endpoint}${course.Thumbnail.formats.thumbnail.url}`} alt={course.Name} /> */}

            <h2>Chapters</h2>
            {course.chapters.map((chapter) => (
                <div key={chapter.id}>
                    <h3>{chapter.Title}</h3>
                    <ul>
                        {chapter.submodules && chapter.submodules.map((submodule) => (
                            <li key={submodule.id}>
                                {submodule.Title} {/* Change to the correct field for the title */}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default CourseDetails