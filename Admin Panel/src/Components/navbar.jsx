import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminContext } from '../Contexts/AdminContext.jsx'
import { toast } from 'react-toastify'
import { assets } from '../../../front_end/src/assets/assets.js'
const Navbar = () => {

  const navigate= useNavigate()
  const {atoken,setAtoken}=useContext(AdminContext)
  const Logout=()=>{
    toast.success("Logout successfully")
    console.log(`Your Login Token Removed from localStorage : ${atoken}`);
    atoken && setAtoken('')
    atoken && localStorage.removeItem('aToken')
    navigate('/')

  }

  return (
    <div className='flex justify-between items-center px-5 sm:px-10 py-3 border-b-2'>
        <div className='flex items-center gap-3 text-xs max-h-14'>
            <img src={assets.redlogo} alt="" className='w-36 md:w-44 cursor-pointer'/>
            <p className='px-2.5 py-1 border rounded-full'>Admin <span className='text-blue-500 font-medium'>Logedin</span></p>
        </div>
        <button className='px-10 py-2 border rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-2000' onClick={Logout}>Logout</button>
    </div>
  )
}

export default Navbar