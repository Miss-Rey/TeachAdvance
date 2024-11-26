
import { Carousel, Avatar } from 'flowbite-react';


function CustomerReview() {
    return (
        <div className="w-full h-[500px] md:h-96 lg:h-96 xl:h-96 2xl:h-96 text-black my-10">
            <h2 className='font-bold text-2xl text-center p-3'>Success Stories</h2>
            <h2 className='text-lg text-center'>Lorem ipsum dolor sit.</h2>
            <Carousel>
                <span className='w-full h-full overflow-hidden bg-slate-100'>
                    <span className='w-full flex justify-center m-5'>
                        <img className='w-28 h-28 rounded-full border-4 border-red-500' src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" />
                    </span>
                    <span>
                        <p className='text-center text-xl p-5'>I’ve been using TeachAdvance for my online courses, and it’s made my learning experience so much easier. The platform is simple to navigate, and I can access all my materials in one place. I love how organized everything is, which makes studying more straightforward. The clear structure of the lessons has helped me stay on top of my coursework, and the design of the platform is clean and user-friendly. It's truly enhanced the way I learn!</p>
                    </span>
                    
                    <span className='flex justify-center items-center'>
                        <p>Mathew M. - Student</p>
                    </span>
                </span>

                <span className='w-full h-full bg-slate-100'>
                    <span className='w-full flex justify-center m-5'>
                        <img className='w-28 h-28 rounded-full border-4 border-red-500' src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="" />
                    </span>
                    <span>
                        <p className='text-center text-xl p-5'>TeachAdvance is an excellent learning platform. I appreciate how easy it is to find all my course materials and access them anytime. The interface is simple and well-organized, so I never feel lost trying to navigate between lessons. The platform's straightforward approach allows me to focus more on the content rather than struggling with technical issues. I highly recommend it to anyone looking for a hassle-free learning experience</p>
                    </span>
                    
                    <span className='flex justify-center items-center'>
                        <p>Emily T. - Trainer</p>
                    </span>
                </span>
                <span className='w-full h-full bg-slate-100'>
                    <span className='w-full flex justify-center m-5'>
                        <img className='w-28 h-28 rounded-full border-4 border-red-500' src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="" />
                    </span>
                    <span>
                        <p className='text-center text-xl p-5'>As a trainer, TeachAdvance has been fantastic for organizing and delivering my lessons. The platform is incredibly easy to use, and I can structure my courses exactly the way I want. It's been great to have a central hub where everything is available to my students, which has streamlined my teaching process. The simplicity and efficiency of the platform make it a great tool for both me and my learners</p>
                    </span>
                    
                    <span className='flex justify-center items-center'>
                        <p>John D. - Student</p>
                    </span>
                </span>
                
                
            </Carousel>
        </div>
    );
}

export default CustomerReview;
