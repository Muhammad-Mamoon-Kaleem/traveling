import React, { useContext, useEffect, useState } from 'react';
import { places } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {

  const { backend_url, token } = useContext(AppContext)
  const [bookingPlaces, setBookingPlace] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "multipart/form-data",
    }
  }

  const confirmCancel = (id) => {
    setBookingToCancel(id);
    setShowConfirmation(true);
  };

  const cancelBooking = async () => {
    try {
      const { data } = await axios.post(backend_url + '/api/user/cancelbooking', { id: bookingToCancel }, config)
      if (data.success) {
        toast.success(data.message)
        getAllBookings()
      }
      else {
        toast.error(data.message);
      }

    }
    catch (error) {
      console.log('error in canceling appointment', error);
      toast.error(error)
    }
    finally {
      setShowConfirmation(false);
      setBookingToCancel(null);
    }
  }

  const getAllBookings = async () => {
    try {
      // if(!token){
      //   console.log('plz login before');

      // }
      const { data } = await axios.get(backend_url + '/api/user/mybooking', config)
      if (data.success) {
        setBookingPlace(data.userAppointmentData.reverse())

      }
    }
    catch (error) {
      console.log('error in fetching user bookings list', error);
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (token) {
      getAllBookings()
    }
  }, [token])
  return (
    <div>
      <p className='font-medium pb-3 border-b-2 mb-4 text-xl'>My Bookings</p>

      <div className='w-full mx-auto'>
        {bookingPlaces.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No Data Found</p>
        ) : (
          bookingPlaces.map((v, i) => (
            <div key={i} className='py-6 border-b md:flex md:justify-between md:items-center'>
              {/* Card container (70% width) */}
              <div className='flex flex-col md:flex-row border border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white w-full sm:w-[70%] mx-auto mb-10 md:mb-0'>
                {/* Image Section */}
                <div className='flex justify-center'> {/* Center the image on small screens */}
                  <img src={v.placeData.images[0]} alt="" className='w-full md:w-56 h-56 object-cover rounded-md' />
                </div>

                {/* Description Section */}
                <div className='flex flex-col justify-evenly px-4 py-8 sm:px-20'>
                  <p className="md:text-2xl sm:text-xl font-semibold text-gray-900">{v.placeData.name}</p>
                  <p className="text-md text-gray-700">{v.placeData.speciality}</p>
                  <p className="text-md text-gray-700">{v.placeData.duration} Days</p>
                  <p className="text-md text-gray-700">{v.placeData.tourType}</p>
                  <div className="flex text-md text-blue-400 my-2">
                    <p className='mr-2'>{v.slotDate}</p>
                    <p >{v.slotTime}</p>
                  </div>
                  <div className=' text-sm font-medium'>
                    {v.status === '' ?
                      <p className="text-gray-500 ">Pending</p> :
                      <div>
                        {v.status === 'Accepted' ?
                          <p className='text-green-500'>Application Accepted</p>
                          :
                          <p className='text-red-500'>Application Rejected</p>
                        }
                      </div>
                    }
                  </div>
                  <div className="flex text-lg text-gray-800 mt-2 border rounded-full border-blue-500 w-max py-1 px-2 bg-blue-50 shadow-sm">
                    <span className='mr-1 font-bold text-blue-600 text-xl'>$ </span>
                    <p >{v.placeData.rate}</p>
                  </div>

                </div>
              </div>

              {/* Buttons Section (30% width) */}

              <div className='flex flex-col justify-center items-center sm:ml-20 space-y-4 w-full sm:w-[30%] h-full'>
                {v.status === '' ? (
                  <>
                    <button className='w-32 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-400'>
                      Pay Online
                    </button>
                    <button onClick={() => confirmCancel(v._id)} className='w-32 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-400 '>
                      Cancel Booking
                    </button>
                  </>
                )
                  : (
                    <p>
                      {v.status === 'Accepted' ? (
                        <span className="text-green-600 text-2xl">&#10003;</span>
                      ) : (
                        <span onClick={() => confirmCancel(v._id)} className="text-red-600 text-2xl cursor-pointer">&#10007;</span>
                      )}
                    </p>

                  )
                }
              </div>
            </div>

          ))
        )
        }

      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-3 sm:p-6 rounded-lg shadow-lg">
            <p className="sm:mb-4 sm:text-base text-sm mb-2">Are you sure you want to cancel this booking?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="sm:px-4 Sm:py-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
              <button
                className="sm:px-4 sm:py-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={cancelBooking}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAppointment;
