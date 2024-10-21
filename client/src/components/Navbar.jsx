import React from 'react'
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';


const TopNav = () => {
    return (
        // <div className="navbar bg-base-100">
        //     <div className="navbar-start">
        //         <div className="dropdown">
        //             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        //                 <svg
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     className="h-5 w-5"
        //                     fill="none"
        //                     viewBox="0 0 24 24"
        //                     stroke="currentColor">
        //                     <path
        //                         strokeLinecap="round"
        //                         strokeLinejoin="round"
        //                         strokeWidth="2"
        //                         d="M4 6h16M4 12h8m-8 6h16" />
        //                 </svg>
        //             </div>
        //             <ul
        //                 tabIndex={0}
        //                 className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-bold">
        //                 <li><Link to={'/courses'} className='font-bold '>Courses</Link></li>
        //                 <li>
        //                     <a className='font-bold '>Certifications</a>
        //                     <ul className="p-2">
        //                         <li><a className='font-bold '>Career Certifications</a></li>
        //                         <li><a className='font-bold '>Specialist Certifications</a></li>
        //                     </ul>
        //                 </li>
        //                 <li><a className='font-bold '>Learning Partner</a></li>
        //             </ul>
        //         </div>
        //         <a className="btn btn-ghost text-xl">Teach Advance</a>
        //     </div>
        //     <div className="navbar-center hidden lg:flex">
        //         <ul className="menu menu-horizontal px-1">
        //             <li><Link to={'/courses'} className='text-lg'>Courses</Link></li>
        //             <li>
        //                 <details className='z-10'>
        //                     <summary className='text-lg'>Certifications</summary>
        //                     <ul className="p-2">
        //                         <li><a className='text-lg'>Career Certifications</a></li>
        //                         <li><a className='text-lg'>Specialist Certifications</a></li>
        //                     </ul>
        //                 </details>
        //             </li>
        //             <li><a className='text-lg'>Learning Partner</a></li>
        //         </ul>
        //     </div>
        //     <div className="navbar-end">
        //         <a className="btn">Login</a>
        //     </div>
        // </div>

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
                >                <Dropdown.Header>

                        <span className="block text-sm">User</span>
                        <span className="block truncate text-sm font-medium">email</span>

                    </Dropdown.Header>

                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item><Link to={'/mycourses'}>My Courses</Link></Dropdown.Item>
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