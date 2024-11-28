import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedPlaces = () => {
  const { placeId } = useParams(); 
  const [relatedPlaces, setRelatedPlaces] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 
  const { places } = useContext(AppContext)
  useEffect(() => {
    const getRandomPlaces = () => {
      let filteredPlaces = places.filter(place => place._id !== placeId);
      let shuffledPlaces = filteredPlaces.sort(() => 0.5 - Math.random());
      return shuffledPlaces.slice(0, 6);
    };

    // Simulating loading
    setTimeout(() => {
      setRelatedPlaces(getRandomPlaces());
      setLoading(false); 
    }, 1000); 
  }, [placeId]);

  const handleMoreClick = () => {
    navigate('/places');
    window.scrollTo(0, 0);
  };

  const handlePlaceClick = (id) => {
    navigate(`/booking/${id}`); // Navigate to the booking route for the specific place
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Related Places</h2>
      {loading ? (
        <div className="text-center">Loading related places...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedPlaces.length > 0 ? (
            relatedPlaces.map((place) => (
              <div 
                key={place._id} 
                className="border rounded-lg shadow-md p-4 bg-white transform transition-transform duration-300 hover:translate-y-[-5px] cursor-pointer" // Added hover effect and cursor pointer
                onClick={() => handlePlaceClick(place._id)} // Click handler
              >
                <img 
                  src={place.images[0] } 
                  alt={place.name || 'Related Place'} 
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold">{place.name}</h3>
                <p className="text-sm text-gray-600">{place.speciality}</p>
                <p className="text-sm text-gray-500">{place.duration}</p>
                <div className="mb-1">
                  <span className={`${place.availability === 'yes' ? 'text-green-600' : 'text-red-600'} text-base font-semibold`}>$</span>
                  <span className={`text-gray-800 ${place.availability === 'yes'? '' :'line-through' } text-base font-semibold ml-1`}>{place.rate}</span>
                </div>
              </div>
            ))
          ) : (
            <div>No related places found.</div>
          )}
        </div>
      )}
      <div className="text-center mt-4">
        <button 
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          onClick={handleMoreClick}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default RelatedPlaces;
