import React from 'react'
import {assets} from '../assets/assets'
const Footer = () => {
  return (
    <div className='md:mx-13'>
        <div className='flex flex-col sm:flex-row justify-between gap-20 m-10 mt-40 text-sm'>
    <div className="flex-2">
        <img className='mb-5 w-40' src={assets.redlogo} alt="" />
        {/* <p className='w-full md:w-2/3.2 leading-5 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex tempore nesciunt hic! Eaque enim consectetur nam, nemo adipisci culpa consequatur corrupti? Atque!</p> */}
    </div>
    <div className="flex-1">
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className=''>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
        </ul>
    </div>
    <div className="flex-1">
        <p  className='text-xl font-medium mb-5'>Get in touch</p>
        <ul>
            <li>+92 3362024682</li>
            <li>mamoonkaleem57@gmail.com</li>
        </ul>
    </div>
</div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>© 2024 Your Website Name. All rights reserved.
            </p>
        </div>
    </div>
    
  )
}

export default Footer