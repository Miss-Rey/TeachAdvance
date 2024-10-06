import React from 'react'
import Slider from '../components/Carousel'
import Navbar from '../components/Navbar'
import Recommendation from '../components/Recommendation'
import Certs from '../components/Certs'
import CustomerReview from '../components/Review'
import FooterContainer from '../components/Footer'



const Home = () => {
    return (
        <>
            <div>
                <Navbar />
                <Slider />
            </div>
            <div className='my-10'>
                <Recommendation />
            </div>
            <div>
                <Certs />
            </div>
            <div className='mb-20'>
                <CustomerReview />
            </div>
            <div>
                <FooterContainer />
            </div>
        </>
    )
}

export default Home