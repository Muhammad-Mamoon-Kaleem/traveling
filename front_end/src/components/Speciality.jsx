import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const Speciality = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-6 py-16 px-4 sm:px-10'>
        <h1 className='text-3xl font-semibold text-center text-gray-800 mb-4'>Travel Where You Want</h1>
        <p className='text-center text-sm sm:text-base text-gray-600 mb-8 max-w-lg'>
            Specialty travel offers tailored experiences, from romantic escapes and adventures 
            to cultural, eco-friendly, gourmet, and luxury trips for all travelers.
        </p>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8'>
            {specialityData.map((v, i) => (
                <Link 
                    onClick={() => scrollTo(0, 0)} 
                    className='flex flex-col items-center text-xs sm:text-sm cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out' 
                    to={`/places/${v.speciality}`} 
                    key={i}>
                    <img 
                        className='w-20 sm:w-24 h-20 sm:h-24 mb-3 rounded-full object-cover transition-transform duration-300 ease-in-out'
                        src={v.image} 
                        alt={v.speciality} 
                    />
                    <p className='text-center text-gray-700 font-semibold'>{v.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Speciality
