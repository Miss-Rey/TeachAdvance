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
                        <img src="https://www.pexels.com/photo/man-using-a-laptop-5198239/" alt="Slide 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-full bg-opacity-50">
                        <img src="https://www.safefood.net/getmedia/94101697-3c3f-4fe1-8ae8-5b595d3814ba/medium-rare-steak.jpg?w=2000&h=1333&ext=.jpg&width=1360&resizemode=force" alt="Slide 3" className="w-full h-full  object-cover" />
                    </div>
                </Carousel>
            </div>
        </>

    )
}

export default Slider