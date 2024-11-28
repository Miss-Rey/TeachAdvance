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

  // Effect to fetch enrolled courses
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!userId) {
        setErrorMessage('Please login');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${node_endpoint}/api/mycourses?userId=${userId}`);
        const data = await response.json();
        console.log('Enrolled Courses:', data); // Debugging line

        if (data.courseIds && data.courseIds.length > 0) {
          const extractedIds = data.courseIds.map(course => course.courseIds)
          localStorage.setItem('courseIds', JSON.stringify(extractedIds)); // Store IDs in localStorage
          fetchMyCourses(extractedIds); // Fetch courses right after getting the IDs
        } else {
          setErrorMessage('No courses found');
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
  const fetchMyCourses = async (courseIds) => {
    const query = `
      query {
        courses(where: { id: { in: [${courseIds.map(id => `"${id}"`).join(',')}] } }) {
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
      console.log('Fetched Courses:', data); // Debugging line
      
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
    return <div>
      <TopNav />
      <div className='text-2xl font-bold flex item-center px-14 py-10 w-full border-b-[1px] border-slate-300'>My Courses</div>
      <div className='flex justify-center items-center h-screen'>
        {errorMessage}
      </div>
    </div>;
  }

  return (
    <>
      <TopNav />
      <div className='text-2xl font-bold flex item-center px-14 py-10 w-full border-b-[1px] border-slate-300'>My Courses</div>
      <div className='flex flex-col md:grid lg:grid xl:grid 2xl:grid grid-cols-4 gap-5 m-5 md:m-10 lg:m-10 xl:m-10 2xl:m-10'>
        {enrolledCourses.length === 0 ? (
          <div>
            <TopNav />
          </div>
        ) : (
          enrolledCourses.map((course) => (
            <div key={course.id} className='flex flex-col bg-slate-100 rounded-md'>
              <div className='h-3/4'>
                {course.thumbnail && course.thumbnail.url ? (
                  <img src={course.thumbnail.url} alt={course.title} className='w-full h-full'/>
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <h1 className='text-xl font-semibold p-4'>{course.title}</h1>
              <div className='flex items-center gap-1 p-3 border-t-[1px] border-slate-300 text-sm text-blue-300'>
                <Link to={`/courses/${course.id}/notes`}>Start Learning</Link>
                <FaArrowRight />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyCourses;
