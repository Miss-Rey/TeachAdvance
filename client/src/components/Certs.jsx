import React from 'react'
import { FaUsers } from "react-icons/fa6";
import { Carousel } from 'flowbite-react';


const Certs = () => {
    return (
        <>
            <section className='recommendation hidden lg:flex xl:flex 2xl:flex flex-col gap-3 justify-center items-center'>
                <h2 className='font-bold text-2xl text-center'>Popular Certification</h2>
                <h2 className='text-lg'>TeachAdvance certification, a new start for career</h2>
                <div className='flex justify-end w-full mr-10 text-red-600 hover:text-red-400 ease-in duration-75 cursor-pointer'><a href="">View More</a></div>
                <div className='flex gap-5 mb-10'>
                    <div className='course flex flex-col h-[450px] justify-center items-center lg:bg-slate-100 w-72 rounded-md'>
                        <div className='h-1/2 w-full'>
                            <img className='w-full h-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp_2tPTAAxTNhNJHiuzu8xrTV4IRJg0qU2Wg&s" alt="" />
                        </div>
                        <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                            <div className='font-bold text-xl'>AI Fundamentals</div>
                            <div className='flex flex-col h-full justify-center'>
                                <ul className='list-disc px-5'>
                                    <li>AI Fundamentals.</li>
                                    <li>Generative AI for Software Development</li>
                                    <li>AI for Business</li>
                                    <li>AI for Everyone</li>

                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='course flex flex-col h-[450px] justify-center items-center lg:bg-slate-100 w-72 rounded-md'>
                        <div className='h-1/2 w-full'>
                            <img className='w-full h-full' src="https://www.logsign.com/uploads/ensuring_network_security_e34d6ce4bb.png" alt='' />
                        </div>
                        <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                            <div className='font-bold text-xl'>Network Security</div>
                            <div className='flex flex-col h-full justify-center'>
                                <ul className='list-disc px-5'>
                                    <li>Managing Netwok Security</li>
                                    <li>Advanced Network Security</li>
                                    <li>Network Security</li>
                                    <li>Endpoint Security</li>

                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='course flex flex-col h-[450px] justify-center items-center lg:bg-slate-100 w-72 rounded-md'>
                        <div className='h-1/2 w-full'>
                            <img className='w-full h-full' src="data:image/jpeg;base64,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" alt="" />
                        </div>
                        <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                            <div className='font-bold text-xl'>Machine Learning Certification</div>
                            <div className='flex flex-col h-full justify-center'>
                                <ul className='list-disc px-5'>
                                    <li>Introduction to Machine Learning.</li>
                                    <li>Machine Learning with Python</li>
                                    <li>Regression and Classification</li>
                                    <li>Mathematics for Machine Learning</li>

                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='course flex flex-col h-[450px] justify-center items-center lg:bg-slate-100 w-72 rounded-md'>
                        <div className='h-1/2 w-full'>
                            <img className='w-full h-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqeg9CXkXf6K7F8yULTIdiwSSJtLyyYS_yMA&s" alt="" />
                        </div>
                        <div className='flex flex-col w-full h-1/2 p-3 gap-3'>
                            <div className='font-bold text-xl'>AI Fundamentals</div>
                            <div className='flex flex-col h-full justify-center'>
                                <ul className='list-disc px-5'>
                                    <li>Introduction to IoT</li>
                                    <li>Industrial IoT</li>
                                    <li>IoT and Embeded Systems</li>
                                    <li>Lorem, ipsum dolor.</li>

                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
            <section className='lg:hidden xl:hidden 2xl:hidden'>
                <h2 className='font-bold text-xl text-center text-black'>Popular Certification</h2>
                <h2 className='text-md m-3 text-center text-black'>TeachAdvance certification, a new start for career</h2>

                <div className=' overflow-auto text-black'>
                    <div className="carousel carousel-end mx-2 gap-2 overflow-auto">
                        <div className="carousel-item">
                            <div className='course flex flex-col justify-center items-center bg-slate-100 w-72 rounded-md h-[450px]'>
                                <div className='h-1/2 w-full'>
                                    <img className='w-full h-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp_2tPTAAxTNhNJHiuzu8xrTV4IRJg0qU2Wg&s" alt="" />
                                </div>
                                <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                                    <div className='font-bold text-xl'>AI Fundamentals</div>
                                    <div className='flex flex-col h-full justify-center'>
                                        <ul className='list-disc px-5'>
                                            <li>AI Fundamentals.</li>
                                            <li>Generative AI for Software Development</li>
                                            <li>AI for Business</li>
                                            <li>AI for Everyone</li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='course flex flex-col justify-center items-center bg-slate-100 w-72 rounded-md h-[450px]'>
                                <div className='h-1/2 w-full'>
                                    <img className='w-full h-full' src="https://www.logsign.com/uploads/ensuring_network_security_e34d6ce4bb.png" alt='' />
                                </div>
                                <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                                    <div className='font-bold text-xl'>Network Security</div>
                                    <div className='flex flex-col h-full justify-center'>
                                        <ul className='list-disc px-5'>
                                            <li>Managing Netwok Security</li>
                                            <li>Advanced Network Security</li>
                                            <li>Network Security</li>
                                            <li>Endpoint Security</li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='course flex flex-col justify-center items-center bg-slate-100 w-72 rounded-md h-[450px]'>
                                <div className='h-1/2 w-full'>
                                    <img className='w-full h-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqeg9CXkXf6K7F8yULTIdiwSSJtLyyYS_yMA&s" alt="" />
                                </div>
                                <div className='flex flex-col w-full h-1/2 p-3 gap-3'>
                                    <div className='font-bold text-xl'>AI Fundamentals</div>
                                    <div className='flex flex-col h-full justify-center'>
                                        <ul className='list-disc px-5'>
                                            <li>Introduction to IoT</li>
                                            <li>Industrial IoT</li>
                                            <li>IoT and Embeded Systems</li>
                                            <li>Lorem, ipsum dolor.</li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}

export default Certs