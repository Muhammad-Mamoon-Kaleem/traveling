import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const Topplaces = () => {
    const navigate=useNavigate()
    const { places } = useContext(AppContext);
  return (
    <div className='flex flex-col items-center gap-5 my-16 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Places To Visit</h1>
        <p className='sm:w-1/2 text-center text-small'>Discover breathtaking landscapes, rich cultures, and iconic landmarks in the world's top destinations.</p>

        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
    {places && places.slice(0, 4).map((v, i) => (
        <div key={i}
            onClick={() => navigate(`/booking/${v._id}`)} 
            className='border border-blue-200 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
        >
            <img 
                className='w-full h-48 object-cover bg-blue-50' 
                src={v.images[0]} 
                alt={v.name} 
            />
            <div className='p-4'>
                
                <p className='text-large font-medium'>{v.name}</p>
                <p className='text-small'>{v.tourType}</p>
                <div className='flex items-center gap-2 text-sm text-center'>
                <p className={`${v.availability === 'yes' ? 'bg-green-500' : 'bg-red-500'} w-2 h-2 rounded-full`}></p>
                    <p className={`${v.availability==='yes'? 'text-green-500':'text-red-500'}`}>{v.availability==='yes'?'AvailAble':'Not Available'}</p>
                </div>
            </div>
        </div>
    ))}
</div>

        <button onClick={()=>{navigate('/places');scrollTo(0,0)}} className='bg-blue-400 px-10 py-2 mt-10'>more</button>
    </div>
  )
}

export default Topplaces