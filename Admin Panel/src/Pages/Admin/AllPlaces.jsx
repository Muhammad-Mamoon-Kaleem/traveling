import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../Contexts/AdminContext';
import { FaEdit ,FaTrash} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllPlaces = () => {
  const [allplaces, setAllplaces] = useState([]);
  const navigate = useNavigate()
  const [showDialoge,setShowDialoge]=useState(false)
  const [placeToDelete,setPlaceToDelete]=useState()

  // Get data from API
  const { backEnd_Url, atoken } = useContext(AdminContext);
// defining the config function here to send the token in header
const getConfig=()=>({
  headers:{
    Authorization: `Bearer ${atoken}`,
  },

})
  const getAllPlaces = async () => {
    try {
      
      const { data } = await axios.post(backEnd_Url + '/api/admin/allplaces', {}, getConfig());

      if (data.success) {
        setAllplaces(data.message); // Use data.message if that's where the places are
        console.log(data.message);
      } else {
        console.log("Can't get all places", data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // UseEffect hook
  useEffect(() => {
    if (atoken) {
      getAllPlaces();
    } else {
      console.log('Authorization token is not present at getAllPlaces useEffect');
    }
  }, [atoken]);

  const handleEditClick = async (placeId) => {
    console.log("Fetching details for Place ID:", placeId); // Log the place ID to the console

    try {
        
        // Fetch the place details from the backend
        const response = await axios.get(`${backEnd_Url}/api/admin/place/${placeId}`, getConfig());

        if (response.data.success) {
            const placeDetails = response.data.place; // Assuming the response contains the place details
            console.log("Place Details:", placeDetails);

           navigate(`/updateplace/${placeId}`,{ state: { placeDetails }})
            // You can implement further actions like populating a form or opening a modal here
        } else {
            console.error("Failed to fetch place details:", response.data.message);
        }
    } catch (error) {
        console.error("Error fetching place details:", error.message);
    }
};

//delete api calling 
const handleDeleteClick = async (placeId) => {

  setPlaceToDelete(placeId)
  setShowDialoge(true)
}
  
const Confirmdelete=async()=>{
    try {
      const response = await axios.delete(`${backEnd_Url}/api/admin/place/${placeToDelete}`, getConfig());
      if (response.data.success) {
       // Update the local state to remove the deleted place
       setAllplaces(allplaces.filter(place => place._id !== placeToDelete));
       toast.success("Place deleted successfully")
       console.log("Place deleted successfully:", response.data.message);
     } 
     else {
       console.error("Failed to delete place:", response.data.message);
       toast.error("Failed to delete place")
   }
   }
    catch (error) {
     console.error("Error deleting place:", error.message);
   }
   setShowDialoge(false); // Close the dialog
    setPlaceToDelete(null);
 }

  
  

  return (
    <div className='max-h-[95vh] overflow-y-scroll hide-scrollbar bg-[#f2f3ff]'>
      <h1 className='text-2xl font-semibold mb-5 text-center'>All Places</h1>
      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {allplaces.length > 0 ? (
          allplaces.map((value, index) => (
            <div key={index} className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
              <div className="relative h-48">
                <img
                  src={value.images[0]}
                  alt="Place Image"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className='p-4'>
                {/* Flex container for name and edit icon */}
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-semibold text-gray-800 mb-1'>{value.name}</h2>
                  <div className="cursor-pointer" onClick={() => handleEditClick(value._id)} >
                    <FaEdit className="text-gray-800 hover:text-blue-500 transition-colors duration-300" size={20} />
                  </div>
                 
                </div>
                <p className='text-sm text-gray-600 mb-2'>{value.tourType}</p>
                
                <div>
                <p className='text-sm text-gray-800 mb-2'>{value.duration} <span> days</span></p>
                </div>
                
                <div className="mb-1">
                  <span className={`${value.availability === 'yes' ? 'text-green-600' : 'text-red-600'} text-base font-semibold`}>$</span>
                  <span className={`text-gray-800 ${value.availability === 'yes'? '' :'line-through' } text-base font-semibold ml-1`}>{value.rate}</span>
                </div>

                <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-800'>Availability:
                  <span className={`ml-1 ${value.availability === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
                    {value.availability === 'yes' ? 'Available' : 'Unavailable'}
                  </span>
                </p>
                <div className="cursor-pointer mt-1 " onClick={() => handleDeleteClick(value._id)}>
                      <FaTrash className="text-gray-800  hover:text-red-500 transition-colors duration-300" size={20} />
                    </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <div className="bg-red-100 text-red-800 p-6 rounded-lg shadow-md">
              <p className="text-xl font-semibold">No places available.</p>
            </div>
          </div>
        )}
      </div>
      {showDialoge && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white sm:p-6 rounded-lg shadow-lg p-4">
            <p className="sm:text-lg sm:font-semibold font-medium mb-4 text-xs">Are you sure you want to delete this place?</p>
            <div className="flex justify-end sm:space-x-4 space-x-3">
              <button onClick={() => setShowDialoge(false)} className="sm:px-4 px-2 py-2 bg-gray-400 w-full rounded hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={Confirmdelete} className="sm:px-4 px-2 py-2 bg-red-500 text-white rounded w-full hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
export default AllPlaces;
