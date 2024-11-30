import React, { useState, useEffect,useContext } from "react";
import { AdminContext } from '../../Contexts/AdminContext';
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

const AddPlace = ({ onUpdateSuccess }) => {
  const { backEnd_Url} = useContext(AdminContext);
  const location = useLocation();
  const placeDetails = location.state?.placeDetails;

  const initialFormState = {
    name: "",
    duration: "",
    about: "",
    tourType: "",
    availability: "",
    rate: "",
    images: [],
    speciality: "" // Add speciality field here
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (placeDetails && Object.keys(placeDetails).length > 0) {
      setFormData({
        name: placeDetails.name || "",
        duration: placeDetails.duration || "",
        about: placeDetails.about || "",
        tourType: placeDetails.tourType || "",
        availability: placeDetails.availability || "",
        rate: placeDetails.rate || "",
        images: placeDetails.images || [],
        speciality: placeDetails.speciality || "" // Initialize speciality for updates
      });
    }
  }, [placeDetails]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    if (selectedImages.length < 1 || selectedImages.length > 3) {
      setImageError("You must select at least 1 image and up to 3 images.");
      toast.warning("You must select at least 1 image and up to 3 images.");
      setFormData({ ...formData, images: [] });
    } else {
      setImageError(null);
      setFormData({ ...formData, images: selectedImages });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!placeDetails && (formData.images.length < 1 || formData.images.length > 3)) {
      setImageError("Please select between 1 to 3 images.");
      toast.warning("Please select between 1 to 3 images.");
      return;
    }

    const token = localStorage.getItem("aToken");

    if (!token) {
      setMessage("Unauthorized: No token available. Please log in.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
      },
    };

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("tourType", formData.tourType);
    formDataToSend.append("availability", formData.availability);
    formDataToSend.append("rate", formData.rate);
    formDataToSend.append('speciality', formData.speciality);
 // Add speciality field to data

    if (formData.images.length > 0) {
      Array.from(formData.images).forEach((image) => {
        formDataToSend.append("images", image);
      });
    }

    if (placeDetails && formData.images.length === 0) {
      placeDetails.images.forEach((image) => {
        formDataToSend.append("existingImages", image);
      });
    }

    setLoading(true);
    setProgress(0);

    try {
      const endpoint = placeDetails
        ? `https://travel-website-nu-lime.vercel.app/api/admin/place/${placeDetails._id}`
        : "https://travel-website-nu-lime.vercel.app/api/admin/addPlace";
      const method = placeDetails ? "put" : "post";

      const response = await axios[method](endpoint, formDataToSend, config);

      if (response.data.message ) {
        setMessage(response.data.message);
        toast.success(response.data.message);
    
        setFormData(initialFormState); // Trigger form reset after successful update
        if (onUpdateSuccess) onUpdateSuccess();
      } else {
        console.log("Backend response data:", response.data); // Debugging line
        setMessage(response.data.message);
        toast.warning(response.data.message);
      }
      
      setProgress(100);
    } catch (error) {
      setMessage(`Error ${placeDetails ? "updating" : "adding"} place. Please try again.`);
      console.error("Error while adding/updating place:", error);
      toast.error(`Error ${placeDetails ? "updating" : "adding"} place.`);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setProgress(0);
      }, 2000);
    }
  };


  return (
    <div className="sm:p-6 bg-[#f2f3ff] relative">
      <h2 className="text-2xl font-bold mb-4">{placeDetails ? "Update" : "Add"} a Place</h2>
      {message && <p className="mb-4 text-blue-500">{message}</p>}
      {imageError && <p className="mb-4 text-red-500">{imageError}</p>}

      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000080]">
          <div className="w-64 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-center">Please wait...</h3>
            <progress value={progress} max="100" className="w-full h-4 rounded bg-blue-200" />
            <p className="text-lg font-semibold text-blue-500 text-center mt-2">
              We Are Adding Data..
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <div className="mb-2">
            <label className="block text-sm font-medium">Place Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter place name"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Duration</label>
            <input
              type="number"
              name="duration"
              max="30"
              min={1}
              value={formData.duration}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter duration"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Tour Type</label>
            <select
              name="tourType"
              value={formData.tourType}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="">Select tour type</option>
              <option value="Sports Travel">Sports Travel</option>
              <option value="Photography Tours">Photography Tours</option>
              <option value="Luxury Travel">Luxury Travel</option>
              <option value="Adventure Travel">Adventure Travel</option>
              <option value="Beach & Island">Beach & Island</option>
              <option value="Mountain and Ski">Mountain and Ski</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="">Select availability</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Rate</label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter rate"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter about"
              required
            />
          </div><div className="mb-2">
            <label className="block text-sm font-medium">Speciality</label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="">Select speciality</option>
              <option value="Group">Group</option>
              <option value="Single">Single</option>
              <option value="Couple">Couple</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Images (1-3)</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 p-2 border rounded-md w-full"
              // required
            />
          </div>
          <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            { placeDetails ? "Update Place" : "Add Place"}
          </button>
        </div>
        </form>
      )}
    </div>
  );
};

export default AddPlace;
