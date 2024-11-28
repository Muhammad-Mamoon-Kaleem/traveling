import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
const Speciality = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16'>
        <h1 className='text-3xl font-medium '>Travel where you want</h1>
        <p className='w-1/2.2 text-center text-sm'>Specialty travel offers tailored experiences, from romantic escapes and adventures <br />to cultural, eco-friendly, gourmet, and luxury trips for all travelers.</p>

        <div className='flex justify-center pt-6 gap-7'>
            {specialityData.map((v,i)=>(
                <Link onClick={()=>scrollTo(0,0)} className='flex flex-col text-xs cursor-pointer hover:translate-y-[-10px] transition-all duration-500' to={`/places/${v.speciality}`} key={i}>
                    <img className='w-16 sm:w-24 h-16 sm:h-24 mb-2 rounded-full object-cover' src={v.image} alt="" />
                    <p>{v.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Speciality