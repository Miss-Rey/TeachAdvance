import React from 'react'
import { Carousel } from "flowbite-react";


function Slider() {
    return (
        <>
            <div className="relative h-[500px] overflow-hidden ">

                <Carousel className='w-screen'>
                    <div className="h-full">
                        <img src="https://betsoftware.com/wp-content/uploads/sites/4/2022/08/ICT-In-Education-scaled.jpg" alt="Slide 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-full">
                        <img src="https://www.gumlet.com/learn/content/images/2022/07/Elearning_platform.jpg" alt="Slide 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-full bg-opacity-50">
                        <img src="https://www.thetechedvocate.org/wp-content/uploads/2018/05/pexels-photo-374016-660x400@2x.jpeg" alt="Slide 3" className="w-full h-full  object-cover" />
                    </div>
                </Carousel>
            </div>
        </>

    )
}

export default Slider