import { React, useState, useEffect } from 'react';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';


const TopNav = () => {

    const [user, setUser] = useState(null);
    const endpoint = import.meta.env.VITE_ENDPOINT;
    const userId = localStorage.getItem('UID');
    const i = localStorage.getItem('i')

    useEffect(() => {
        if (userId) {
            fetchUserData(userId);
        } else {
            setError('Please login');
        }
    }, [userId]);

    const fetchUserData = async (userId) => {
        try {
            // const response = await fetch(`${endpoint}/api/profile?userId=${userId}` || `${endpoint}/api/instructorProfile?instroctorId=${userId}`);
            const data = await response.json();

            if (!response.ok) {
                setError('Error fetching userdata');
                return;
            }

            setUser(data);
            console.log(data); // Debugging
        } catch (error) {
            console.error(error);
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };
    return (

        <Navbar fluid rounded className='border-b-2 list-none'>
            <Navbar.Brand href="#">
                <span className="self-center whitespace-nowrap text-sm lg:text-xl xl:text-xl md:text-xl text-black font-semibold "><Link to={'/'}>TeachAdvance</Link></span>
            </Navbar.Brand>
            <div className="flex md:order-2 gap-1 justify-bottom items-bottom">

                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&usqp=CAUhttps://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg" rounded />
                    }
                >
                    {user && (
                        <Dropdown.Header>
                            <div className='flex gap-1'>
                                <span className="block text-sm">{user.firstname}</span>
                                <span className="block text-sm">{user.lastname}</span>
                            </div>
                            <span className="block truncate text-sm font-medium">{user.email}</span>

                        </Dropdown.Header>
                    )}


                    <Dropdown.Item><Link to={'/profile'}>Profile</Link></Dropdown.Item>
                    {i !== '1' ? <Dropdown.Item><Link to={'/mycourses'}>My Courses</Link></Dropdown.Item> : <Dropdown.Item><Link to={'/instructordashboard'}>Dashboard</Link></Dropdown.Item> }
                    <Dropdown.Item>Certificates</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />

            </div>

            <Navbar.Collapse className=''>
                <Navbar.Link href="/" className='text-black'>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/courses" className='text-black'>Courses</Navbar.Link>
                {/* <Navbar.Link href="/about" className='text-black'>About</Navbar.Link> */}
                {/* <Navbar.Link href="/reservation" className='text-black'>Reservation</Navbar.Link> */}
                {/* <Navbar.Link href="/gallery" className='text-black'>Gallery</Navbar.Link> */}
                {/* <Navbar.Link href="/contacts" className='text-black'>Contacts</Navbar.Link> */}

            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopNav