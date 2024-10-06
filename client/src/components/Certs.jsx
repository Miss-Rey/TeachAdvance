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
                            <img className='w-full h-full' src="https://imageio.forbes.com/specials-images/imageserve/645b3eca0059191fb09c02fa/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" alt="" />
                        </div>
                        <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                            <div className='font-bold text-xl'>AI Fundamentals</div>
                            <div className='flex flex-col h-full justify-center'>
                                <ul>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>

                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='course flex flex-col h-[450px] justify-center items-center lg:bg-slate-100 w-72 rounded-md'>
                        <div className='h-1/2 w-full'>
                            <img className='w-full h-full' src="https://imageio.forbes.com/specials-images/imageserve/645b3eca0059191fb09c02fa/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" alt="" />
                        </div>
                        <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                            <div className='font-bold text-xl'>AI Fundamentals</div>
                            <div className='flex flex-col h-full justify-center'>
                                <ul>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>

                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='course flex flex-col h-[450px] justify-center items-center lg:bg-slate-100 w-72 rounded-md'>
                        <div className='h-1/2 w-full'>
                            <img className='w-full h-full' src="https://imageio.forbes.com/specials-images/imageserve/645b3eca0059191fb09c02fa/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" alt="" />
                        </div>
                        <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                            <div className='font-bold text-xl'>AI Fundamentals</div>
                            <div className='flex flex-col h-full justify-center'>
                                <ul>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>

                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='course flex flex-col h-[450px] justify-center items-center lg:bg-slate-100 w-72 rounded-md'>
                        <div className='h-1/2 w-full'>
                            <img className='w-full h-full' src="https://imageio.forbes.com/specials-images/imageserve/645b3eca0059191fb09c02fa/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" alt="" />
                        </div>
                        <div className='flex flex-col w-full h-1/2 p-3 gap-3'>
                            <div className='font-bold text-xl'>AI Fundamentals</div>
                            <div className='flex flex-col h-full justify-center'>
                                <ul>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>
                                    <li>Lorem, ipsum dolor.</li>
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
                                    <img className='w-full h-full' src="https://imageio.forbes.com/specials-images/imageserve/645b3eca0059191fb09c02fa/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" alt="AI Fundamentals" />
                                </div>
                                <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                                    <div className='font-bold text-xl'>AI Fundamentals</div>
                                    <div className='flex flex-col h-full justify-center'>
                                        <ul>
                                            <li>Lorem, ipsum dolor.</li>
                                            <li>Lorem, ipsum dolor.</li>
                                            <li>Lorem, ipsum dolor.</li>
                                            <li>Lorem, ipsum dolor.</li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='course flex flex-col justify-center items-center bg-slate-100 w-72 rounded-md h-[450px]'>
                                <div className='h-1/2 w-full'>
                                    <img className='w-full h-full' src="https://imageio.forbes.com/specials-images/imageserve/645b3eca0059191fb09c02fa/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" alt="AI Fundamentals" />
                                </div>
                                <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                                    <div className='font-bold text-xl'>AI Fundamentals</div>
                                    <div className='flex flex-col h-full justify-center'>
                                        <ul>
                                            <li>Lorem, ipsum dolor.</li>
                                            <li>Lorem, ipsum dolor.</li>
                                            <li>Lorem, ipsum dolor.</li>
                                            <li>Lorem, ipsum dolor.</li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='course flex flex-col justify-center items-center bg-slate-100 w-72 rounded-md h-[450px]'>
                                <div className='h-1/2 w-full'>
                                    <img className='w-full h-full' src="https://imageio.forbes.com/specials-images/imageserve/645b3eca0059191fb09c02fa/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" alt="AI Fundamentals" />
                                </div>
                                <div className='flex flex-col justify-between w-full h-1/2 p-3 gap-3'>
                                    <div className='font-bold text-xl'>AI Fundamentals</div>
                                    <div className='flex flex-col h-full justify-center'>
                                        <ul>
                                            <li>Lorem, ipsum dolor.</li>
                                            <li>Lorem, ipsum dolor.</li>
                                            <li>Lorem, ipsum dolor.</li>
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