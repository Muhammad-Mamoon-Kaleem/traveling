import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { usrData, setUserData, token, backend_url, LoadUserData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const UpdatingData = async () => {
    setLoading(true);
    try {
      const currentUserData = await LoadUserData();
      const updatedData = {
        ...currentUserData,
        ...usrData
      }
      const formData = new FormData();
      formData.append('name', updatedData.name)
      formData.append('email', updatedData.email)
      formData.append('phone', updatedData.phone)
      formData.append('dob', updatedData.dob)
      formData.append('gender', updatedData.gender)
      formData.append('address', JSON.stringify(updatedData.address))

      formData.append('_id', updatedData._id)

      //image setup in form 
      if (image && image !== usrData.image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(backend_url + '/api/user/updateUserData', formData)
      if (data.success) {
        toast.success(data.message)
        await LoadUserData()
        setIsEdit(false)
        setImage(false)
      }
      else {
        toast.error(data.message)
      }

    }

    catch (error) {
      console.log('error in sending data to update', error);

    }
    finally {
      setLoading(false);
    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Loading Popup */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-blue-500 px-6 py-4 rounded-md shadow-md">
            <p className="text-lg font-semibold text-white">Please wait...</p>
          </div>
        </div>
      )}
      <div className="bg-blue-50 shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          {isEdit
            ? <label htmlFor='image'>
              <div className='inline-block cursor-pointer relative'>
                <img
                  className='w-36 opacity-60'
                  src={image ? URL.createObjectURL(image) : (usrData.image || assets.profile_pic)}
                  alt="Profile"
                />
                <img
                  className='w-10 absolute bottom-5 right-10'
                  src={image ? null : assets.upload_icon}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id='image'
                hidden
              />
            </label>
            : <img
              src={usrData.image || assets.profile_pic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
            />
          }


          {isEdit ? (
            <input
              type="text"
              value={usrData.name || ''}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full ml-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-2xl font-semibold text-gray-800 ml-4">{usrData.name}</p>
          )}
        </div>

        <hr className="my-6" />

        <div className="mb-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center sm:text-left">Contact Information</h3>
  <div className="grid grid-cols-1 gap-4">
    {/* Email */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2">
      <p className="text-sm text-gray-600 w-full sm:w-32 mb-2 sm:mb-0">Email Id:</p>
      {isEdit ? (
        <input
          type="email"
          value={usrData.email || ''}
          readOnly
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="font-semibold text-gray-800 w-full">{usrData.email}</p>
      )}
    </div>

    {/* Phone */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2">
      <p className="text-sm text-gray-600 w-full sm:w-32 mb-2 sm:mb-0">Phone:</p>
      {isEdit ? (
        <input
          type="tel"
          value={usrData.phone || ''}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            setUserData((prev) => ({ ...prev, phone: value }));
          }}
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your phone number"
        />
      ) : (
        <span className="text-gray-800 w-full">{usrData.phone}</span>
      )}
    </div>

    {/* Address Line 1 */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2">
      <p className="text-sm text-gray-600 w-full sm:w-32 mb-2 sm:mb-0">Address Line 1:</p>
      {isEdit ? (
        <input
          type="text"
          value={usrData?.address?.city || ''}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, address: { ...prev.address, city: e.target.value } }))
          }
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="font-semibold text-gray-800 w-full">{usrData.address?.city}</p>
      )}
    </div>

    {/* Address Line 2 */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2">
      <p className="text-sm text-gray-600 w-full sm:w-32 mb-2 sm:mb-0">Address Line 2:</p>
      {isEdit ? (
        <input
          type="text"
          value={usrData?.address?.street || ''}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, address: { ...prev.address, street: e.target.value } }))
          }
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="font-semibold text-gray-800 w-full">{usrData.address?.street}</p>
      )}
    </div>
  </div>
</div>

<hr className="my-6" />

<div className="mb-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center sm:text-left">Basic Information</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Gender */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center">
      <p className="text-sm text-gray-600 w-full sm:w-32 mb-2 sm:mb-0">Gender:</p>
      {isEdit ? (
        <select
          value={usrData.gender || ''}
          onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Rather not say">Rather not say</option>
        </select>
      ) : (
        <p className="text-sm sm:text-base font-semibold text-gray-800">{usrData.gender}</p>
      )}
    </div>

    {/* Birthday */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center">
      <p className="text-sm text-gray-600 w-full sm:w-32 mb-2 sm:mb-0">Birthday:</p>
      {isEdit ? (
        <input
          type="date"
          value={usrData.dob ? usrData.dob.split('T')[0] : ''}
          onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="text-sm sm:text-base font-semibold text-gray-800">
          {usrData.dob ? usrData.dob.split('T')[0] : ''}
        </p>
      )}
    </div>
  </div>
</div>

        <div className="flex justify-end">
          {isEdit ? (
            <>
              <button
                onClick={UpdatingData}
                className="bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 transition duration-300 mr-4"
              >
                Save Information
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300" onClick={() => setIsEdit(false)}>Cancel</button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
