import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { AdminContext } from '../Contexts/AdminContext'

import { assets} from '../assets/assets.js'

const SideBar = () => {
    const { atoken, setAtoken } = useContext(AdminContext)

    
    return (
        <div className='min-h-screen min-w-[30vh] border-r-2 '>
            {atoken &&
                <ul className='mt-6 '>
                    <NavLink to={'/admin-dashboard'} className={({isActive})=>`flex items-center gap-3 cursor-pointer py-4 px-4 ${isActive ? 'border-r-4 border-blue-500 bg-[#f2f3ff]' :''}`}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink to={'/bookinglist'} className={({isActive})=>`flex items-center gap-3 cursor-pointer py-4 px-4 ${isActive ? 'border-r-4 border-blue-500 bg-[#f2f3ff]' :''}`}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Bookings</p>
                    </NavLink>

                    <NavLink to={'/addplace'} className={({isActive})=>`flex items-center gap-3 cursor-pointer py-4 px-4  ${isActive ? 'border-r-4 border-blue-500 bg-[#f2f3ff]' :''}`}>
                        <img src={assets.add_icon} alt="" />
                        <p className='whitespace-nowrap'>Add Place</p>
                    </NavLink>

                    <NavLink to={'/allplaces'} className={({isActive})=>`flex items-center gap-3  cursor-pointer py-4 px-4 ${isActive ? 'border-r-4 border-blue-500 bg-[#f2f3ff]' :''}`}>
                        <img src={assets.allplaceimg} alt="" className='w-7 h-7' />
                        <p>All Places</p>
                    </NavLink>

                </ul>


            }
        </div>
    )
}

export default SideBar