import React from 'react'
import { assets } from '../assets/assets'


const Header = () => {
  
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-blue-600 rounded-lg px-6 md:px-10 lg:px-20'>
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Travel And Explore <br />With Us
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm' > <img className='w-28' src={assets.group_profiles} alt="" />

            <p>Explore breathtaking destinations, handpicked travel packages,<br className='hidden sm:block' /> and unforgettable experiences tailored just for you. 
            </p>
            </div>
            <a href="#speciality" className="flex items-center space-x-4 bg-white text-black font-semibold py-2 px-4 rounded shadow transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
    <span>Book Now</span>
    <img src={assets.arrow_icon} alt="" className="w-4 h-4"/>
</a>


        </div>

        <div className='md:w-1/2 relative'>
              <img className='w-full md:absolute bottom-4 h-auto rounded-lg' src={assets.travel_logo} alt="" />
        </div>
    </div>
  )
}

export default Header