
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
                        <p className='text-center text-xl p-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam non provident quia magni sunt. Dolores odio beatae accusamus eveniet corporis minus quod reprehenderit nemo animi recusandae molestias inventore, laborum deleniti.</p>
                    </span>
                    
                    <span className='flex justify-center items-center'>
                        <p>John Doe</p>
                    </span>
                </span>

                <span className='w-full h-full bg-slate-100'>
                    <span className='w-full flex justify-center m-5'>
                        <img className='w-28 h-28 rounded-full border-4 border-red-500' src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="" />
                    </span>
                    <span>
                        <p className='text-center text-xl p-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam non provident quia magni sunt. Dolores odio beatae accusamus eveniet corporis minus quod reprehenderit nemo animi recusandae molestias inventore, laborum deleniti.</p>
                    </span>
                    
                    <span className='flex justify-center items-center'>
                        <p>John Doe</p>
                    </span>
                </span>
                <span className='w-full h-full bg-slate-100'>
                    <span className='w-full flex justify-center m-5'>
                        <img className='w-28 h-28 rounded-full border-4 border-red-500' src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="" />
                    </span>
                    <span>
                        <p className='text-center text-xl p-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam non provident quia magni sunt. Dolores odio beatae accusamus eveniet corporis minus quod reprehenderit nemo animi recusandae molestias inventore, laborum deleniti.</p>
                    </span>
                    
                    <span className='flex justify-center items-center'>
                        <p>John Doe</p>
                    </span>
                </span>
                
                
            </Carousel>
        </div>
    );
}

export default CustomerReview;
