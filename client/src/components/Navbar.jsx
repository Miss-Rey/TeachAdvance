import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-bold">
                        <li><a className='font-bold '>Courses</a></li>
                        <li>
                            <a className='font-bold '>Certifications</a>
                            <ul className="p-2">
                                <li><a className='font-bold '>Career Certifications</a></li>
                                <li><a className='font-bold '>Specialist Certifications</a></li>
                            </ul>
                        </li>
                        <li><a className='font-bold '>Learning Partner</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Teach Advance</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a className='text-lg'>Courses</a></li>
                    <li>
                        <details className='z-10'>
                            <summary className='text-lg'>Certifications</summary>
                            <ul className="p-2">
                                <li><a className='text-lg'>Career Certifications</a></li>
                                <li><a className='text-lg'>Specialist Certifications</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a className='text-lg'>Learning Partner</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Login</a>
            </div>
        </div>
    )
}

export default Navbar