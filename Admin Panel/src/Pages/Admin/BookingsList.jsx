import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import { toast } from "react-toastify";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";

const BookingsList = () => {
  const { atoken, getAllBookings, allBookings, backEnd_Url } =
    useContext(AdminContext);
  const [loading, setLoading] = useState(false);

  const handleAction = async (email, bookingId, action) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backEnd_Url}/api/admin/bookingstatus`,
        { email, bookingId, action }
      );

      if (data.success) {
        getAllBookings();
        toast.success(`Booking ${action}ed!`);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (atoken) {
      getAllBookings();
    }
  }, [atoken]);

  return (
    <div className="sm:p-6 p-4 bg-[#f2f3ff] relative">
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-blue-500 px-6 py-4 rounded-md shadow-md">
            <p className="text-lg font-semibold text-white">Please wait...</p>
          </div>
        </div>
      )}

      <p className="text-lg font-semibold mb-3">All Bookings</p>
      <div className="bg-white border rounded shadow-md max-h-[80vh] min-h-[70vh] overflow-y-auto">
        {/* Table for Large Screens */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-10 gap-3 bg-gray-200 text-gray-700 font-semibold p-4">
            <p>#</p>
            <p>Name</p>
            <p>Profile</p>
            <p>Place</p>
            <p>Place Profile</p>
            <p>Rate</p>
            <p>Seats</p>
            <p>Date</p>
            <p>Time</p>
            <p>Status</p>
          </div>

          <div className="divide-y divide-gray-300">
            {allBookings.map((value, index) => (
              <div
                key={index}
                className="grid grid-cols-10 gap-3 p-4 items-center text-gray-600"
              >
                <p>{index + 1}</p>
                <p>{value.userData.name}</p>
                <p>
                  <img
                    src={value.userData.image}
                    alt="Profile"
                    className="rounded-full w-8 h-8 object-cover"
                  />
                </p>
                <p>{value.placeData.name}</p>
                <p>
                  <img
                    src={value.placeData.images[0]}
                    alt="Place Profile"
                    className="rounded w-8 h-8 object-cover"
                  />
                </p>
                <p>{value.placeData.rate}</p>
                <p>{value.userFormInfo.seats}</p>
                <p>{value.slotDate}</p>
                <p>{value.slotTime}</p>
                {value.status === "" ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleAction(value.userData.email, value._id, "accept")
                      }
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                      title="Accept Booking"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() =>
                        handleAction(value.userData.email, value._id, "cancel")
                      }
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      title="Cancel Booking"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div>
                    {value.status === "Accepted" ? (
                      <p className="text-green-600">Accepted</p>
                    ) : (
                      <p className="text-red-600">Cancelled</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cards for Medium and Smaller Screens */}
        <div className="block lg:hidden space-y-4 p-4">
          {allBookings.map((value, index) => (
            <div
              key={index}
              className="border rounded-md p-4 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-800">#{index + 1}</p>
                {value.status === "" ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleAction(value.userData.email, value._id, "accept")
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm"
                      title="Accept Booking"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() =>
                        handleAction(value.userData.email, value._id, "cancel")
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                      title="Cancel Booking"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div>
                    {value.status === "Accepted" ? (
                      <p className="text-green-600">Accepted</p>
                    ) : (
                      <p className="text-red-600">Cancelled</p>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-1">
              <img
                    src={value.userData.image}
                    alt="User"
                    className="rounded-full w-10 h-10 object-cover "
                  />
                <p className="text-sm">
                  <span className="font-semibold">Name:</span>{" "}
                  {value.userData.name}
                 
                </p>
              
                <p className="text-sm">
                  <span className="font-semibold">Place:</span>{" "}
                  {value.placeData.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Rate:</span>{" "}
                  {value.placeData.rate}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Seats:</span>{" "}
                  {value.userFormInfo.seats}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span>{" "}
                  {value.slotDate}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Time:</span>{" "}
                  {value.slotTime}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  
                  <img
                    src={value.placeData.images[0]}
                    alt="Place"
                    className="rounded w-10 h-10 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsList;
