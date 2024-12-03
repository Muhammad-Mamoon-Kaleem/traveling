import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Places = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterplace, setFilterPlaces] = useState([]);
  const {places}=useContext(AppContext)

  const applyfilter = () => {
    if (speciality) {
      setFilterPlaces(places.filter(place => place.tourType === speciality));
    } else {
      setFilterPlaces(places);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [speciality]);

  return (
    <div >
      {/* Left side: Categories */}
      <p className="font-bold mb-4">Visit places with different categories</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
       
        <div className='flex flex-col gap-3 text-sm'>
          <p className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap pl-3 ${speciality==='Sports Travel' ? 'bg-indigo-100' :''}`} onClick={() => speciality==='Sports Travel' ? navigate('/places'):navigate('/places/Sports Travel')}>Sports Travel</p>
          <p className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap pl-3 ${speciality==='Photography Tours' ? 'bg-indigo-100' :''}`} onClick={() => speciality==='Photography Tours' ? navigate('/places'):navigate('/places/Photography Tours')}>Photography Tours</p>
          <p className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap pl-3 ${speciality==='Luxury Travel' ? 'bg-indigo-100' :''}`} onClick={() => speciality==='Luxury Travel' ? navigate('/places'):navigate('/places/Luxury Travel')}>Luxury Travel</p>
          <p className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap pl-3 ${speciality==='Adventure Travel' ? 'bg-indigo-100' :''}`}onClick={() =>  speciality==='Adventure Travel' ? navigate('/places'):navigate('/places/Adventure Travel')}>Adventure Travel</p>
          <p className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap pl-3 ${speciality==='Beach & Island' ? 'bg-indigo-100' :''}`} onClick={() => speciality==='Beach & Island' ? navigate('/places'):navigate('/places/Beach & Island')}>Beach & Island</p>
          <p className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap pl-3 ${speciality==='Mountain and Ski' ? 'bg-indigo-100' :''}`} onClick={() => speciality==='Mountain and Ski' ? navigate('/places'):navigate('/places/Mountain and Ski')}>Mountain and Ski</p>
        </div>
      

      {/* Right side: Places */}
      
        <div className="grid items-center ml-9 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterplace.length > 0 ? (
            filterplace.map((v, i) => (
              <div 
                key={i}
                onClick={() => navigate(`/booking/${v._id}`)} 
                className='border  border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '
              >
                <div  className="h-48 w-full">
                <img 
                  className='w-full h-full object-cover bg-blue-50' 
                  src={v.images[0]} 
                  alt={v.name} 
                />
                </div>
                <div className='p-4'>
                  
                  <p className='text-lg font-medium'>{v.name}</p>
                  <p className='text-sm'>{v.speciality}</p>
                  <div className='flex items-center gap-2 text-sm text-center'>
                  <p className='text-sm text-gray-800'>Availability:
                  <span className={`ml-1 ${v.availability === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
                    {v.availability === 'yes' ? 'Available' : 'Unavailable'}
                  </span>
                </p>
                  </div>
                </div>
              </div>
            ))
          )
            : (
              <div className="ml-5 -col-span-1  flex items-center justify-center ">
      <p className="text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-lg p-4 flex items-center gap-2 shadow-md mx-auto">
        <span role="img" aria-label="info" className="text-gray-500 text-lg">ℹ️</span>
        Currently no place available for this category
      </p>
    </div>
            )  
          }
        </div>
      </div>
    </div>
    
  );
};

export default Places;
