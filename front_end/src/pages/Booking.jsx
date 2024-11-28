import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate, useParams } from 'react-router-dom';
import RelatedPlaces from '../components/RelatedPlaces';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Booking = () => {
  const { placeId } = useParams();
  const [placeInfo, setPlaceInfo] = useState(null);
  const daysofweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [placeSlots, setPlaceSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // New state for image carousel
  const { places, backend_url, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false)
  const [userFormInfo, setUserFormInfo] = useState({
    seats: '',
    cnic: '',
    phone: '',
  });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate()

  const gotoFormFill=()=>{
    if (!placeSlots[slotIndex] || !selectedSlotTime) {
      console.log('Please select a date and time.');
      toast.warning('Please select a date and time.');
      setLoading(false);
      return;
    }
    setShowForm(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { seats, cnic, phone } = userFormInfo;
  
    if (!seats || !cnic || !phone) {
      alert("Please fill all required fields.");
      return;
    }
    BookSlot()
  }
  const handleFormChange = (e) => {
    setUserFormInfo({ ...userFormInfo, [e.target.name]: e.target.value });
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "multipart/form-data",
    }
  }
  // Fetch place info
  const fetchPlaceInfo = async () => {
    const placeInfo = places.find(place => place._id === placeId);
    if (placeInfo) {
      setPlaceInfo(placeInfo);
    }
  };

  const getAvailableSlots = () => {
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let availableSlots = [
        { time: '10:00 AM', available: true },
        { time: '02:00 PM', available: true },
        { time: '06:00 PM', available: false }
      ];
      slots.push({
        dateTime: currentDate,
        slots: availableSlots
      });
    }

    setPlaceSlots(slots);
  };

  useEffect(() => {
    fetchPlaceInfo();
  }, [placeId]);

  useEffect(() => {
    if (placeInfo) {
      getAvailableSlots();
    }
  }, [placeInfo]);

  const handleDayClick = (index) => {
    setSlotIndex(index);
    const selectedSlot = placeSlots[index];
    const selectedDay = daysofweek[selectedSlot.dateTime.getDay()];
    const selectedDate = selectedSlot.dateTime.toLocaleDateString();
    console.log(`Selected Day: ${selectedDay}, Date: ${selectedDate}`);
  };

  const handleSlotTimeClick = (time) => {
    setSelectedSlotTime(time); // Set the selected time
    console.log(`Selected Time: ${time}`);
  };



  // Function to handle "next" image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % placeInfo.images.length);
  };

  // Function to handle "previous" image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? placeInfo.images.length - 1 : prevIndex - 1
    );
  };

  const BookSlot = async () => {
    setLoading(true)
    if (!token) {
      toast.warn('Please log in to continue and booking.');
      console.log('Authentication token is missing. Please log in to continue.');
      setLoading(false);
      navigate('/login')
      return; // Exit early if the token is missing
    }

    

    const slotDate = placeSlots[slotIndex].dateTime.toLocaleDateString();
    const slotTime = selectedSlotTime;
    try {
      const { data } = await axios.post(backend_url + '/api/user/booking', { placeId, slotDate, slotTime, userFormInfo }, config)

      if (data.success) {
        toast.success(data.message)
        console.log('Booking Successful:', data);
        navigate('/myappointment')
        setShowForm(false);
      }
      else {
        console.log('Slot not Booked', data.message);
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error)
      console.log('error in booking slot', error.message);
    }
    finally {
      setLoading(false)
      setShowForm(false);
    }
  }
  return placeInfo && (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* User Form */}

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
                Fill Your Details
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Seats */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Seats:</label>
                  <input
                    type="number"
                    name="seats"
                    required
                    value={userFormInfo.seats}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of seats"
                  />
                </div>

                {/* CNIC */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">CNIC:</label>
                  <input
                    type="text"
                    name="cnic"
                    required
                    value={userFormInfo.cnic}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your CNIC"
                  />
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={userFormInfo.phone}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* About Me (Optional) */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    About Me (Optional):
                  </label>
                  <textarea
                    name="aboutMe"
                    value={userFormInfo.aboutMe || ""}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about yourself"
                    rows="3"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg focus:outline-none"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-blue-500 px-6 py-4 rounded-md shadow-md">
              <p className="text-lg font-semibold text-white">Please wait...</p>
            </div>
          </div>
        )}
        {/* Image Section */}
        <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
          <img
            src={placeInfo.images[currentImageIndex]} // Display the current image
            alt={placeInfo.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h2 className="text-2xl font-bold">{placeInfo.name}</h2>
          </div>

          {/* Show prev and next buttons if more than 1 image */}
          {placeInfo.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-700 text-xl bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 shadow-lg transition ease-in-out duration-200"
                aria-label="Previous Image"
              >
                &larr;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-700 text-xl bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 shadow-lg transition ease-in-out duration-200"
                aria-label="Next Image"
              >
                &rarr;
              </button>
            </>
          )}
        </div>

        {/* Description Section */}
        <div className="w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-16">
          <h1 className="text-2xl font-bold mb-4">{placeInfo.name}</h1>
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg text-gray-700">
              {placeInfo.tourType} - {placeInfo.speciality}
            </p>
            <p className="px-2 py-0.5 border text-xs rounded-full bg-gray-100">
              {placeInfo.duration} Days
            </p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold flex items-center">
              About
              <img src={assets.info_icon} alt="Info Icon" className="ml-2 h-5 w-5" />
            </p>
            <p className="text-gray-600 mt-2">{placeInfo.about}</p>
          </div>
          <div className='flex justify-between'>
            <p className="flex items-center mt-2 text-lg font-semibold">
              <span className={`mr-1 text-xl ${placeInfo.availability === 'yes' ? ' text-green-600' : 'text-red-600'}`}>$</span>
              <span className={`${placeInfo.availability === 'yes' ? '' : 'line-through'} text-gray-800`}>{placeInfo.rate}</span>
            </p>
            <p className={`${placeInfo.availability === 'yes' ? 'text-green-600' : 'text-red-600'} mt-3 text-xs mr-2`}>{placeInfo.availability === 'yes' ? 'Available' : 'Not Available'}</p>
          </div>
        </div>
      </div>

      {/* Booking Slots Section */}
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <p className="text-lg font-bold mb-4">Booking Slots</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {placeSlots.length > 0 &&
            placeSlots.map((v, i) => (
              <div
                key={i}
                className={`p-4 border rounded-lg shadow-md cursor-pointer transition-colors ${i === slotIndex ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
                onClick={() => handleDayClick(i)}
              >
                <p className="font-semibold text-lg">{daysofweek[v.dateTime.getDay()]}</p>
                <p className="text-sm text-gray-600">{v.dateTime.toLocaleDateString()}</p>
                <div className="mt-2">
                  {v.slots.length > 0 ? (
                    v.slots.map((slot, index) => (
                      <p
                        key={index}
                        className={`text-sm cursor-pointer ${slot.available ? 'text-green-500' : 'text-red-500'
                          } ${selectedSlotTime === slot.time ? 'font-bold underline' : ''}`}
                        onClick={() => handleSlotTimeClick(slot.time)} // Pass the time here
                      >
                        {slot.time} - {slot.available ? 'Available' : 'Full'}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No slots available</p>
                  )}
                </div>
              </div>
            ))}
        </div>
        {placeInfo.availability === 'yes' ?
          <button onClick={gotoFormFill} className="bg-gradient-to-r from-blue-400 to-blue-600 mt-8 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:scale-105 transition-transform duration-300">
            Book Now
          </button>
          :
          <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
            <p className="text-center font-semibold">This venue booking is currently not available.</p>
          </div>
        }
      </div>
      <RelatedPlaces />
    </div>
  );
};

export default Booking;
