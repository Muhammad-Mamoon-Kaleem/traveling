import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import { assets } from "../../../../front_end/src/assets/assets";

const DashBoard = () => {
  const { atoken, getDashboardData, DashBoardData } = useContext(AdminContext);
  const [selectedType, setSelectedType] = useState(""); // State for selected data type
  const [tableData, setTableData] = useState([]); // State for table data

  useEffect(() => {
    if (atoken) {
      getDashboardData();
    }
  }, [atoken]);

  // Fetch table data based on selected type
  const fetchTableData = (type) => {
    if (type === "Places") {
      setTableData(DashBoardData.totalPlaces);
    } else if (type === "Users") {
      setTableData(DashBoardData.toatlUsers);
    } else if (type === "Bookings") {
      setTableData(DashBoardData.totalBooking);
    }
  };

  const handleCardClick = (type) => {
    setSelectedType(type);
    fetchTableData(type);
  };

  return (
    <div className=" bg-[#f2f3ff]  ">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-3 sm:gap-6 mx-3">
        {[
          { type: "Places", icon: assets.place2, count: DashBoardData.tPlace },
          { type: "Users", icon: assets.users, count: DashBoardData.tUsers },
          { type: "Bookings", icon: assets.booking, count: DashBoardData.tBooking },
        ].map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.type)}
            className={`flex items-center gap-3 sm:gap-4 bg-white p-3 sm:p-6 shadow-md rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transform transition-all duration-200 ${
              selectedType === card.type ? "bg-sky-300" : ""
            }`}
          >
            <img className="sm:w-14 sm:h-14 w-10 h-10" src={card.icon} alt={`${card.type} Icon`} />
            <div>
              <p className="sm:text-lg text-base font-semibold">{card.count}</p>
              <p className="text-gray-600">{card.type}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      {selectedType && (
        <div className="mt-10 mx-3 ">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Details of {selectedType}</h2>
          <div className="overflow-x-auto">
  <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
    <thead>
      {selectedType === "Places" && (
        <tr className="bg-blue-100 text-left text-gray-800">
          <th className="border border-gray-300 p-2 text-sm">#</th>
          <th className="border border-gray-300 p-2 text-sm">Name</th>
          <th className="border border-gray-300 p-2 text-sm">Duration</th>
          <th className="border border-gray-300 p-2 text-sm">Tour Type</th>
          <th className="border border-gray-300 p-2 text-sm">Speciality</th>
          <th className="border border-gray-300 p-2 text-sm">Availability</th>
          <th className="border border-gray-300 p-2 text-sm">Rate</th>
          <th className="border border-gray-300 p-2 text-sm">Total Bookings</th>
        </tr>
      )}
      {selectedType === "Bookings" && (
        <tr className="bg-blue-100 text-left text-gray-800">
          <th className="border border-gray-300 p-2 text-sm">#</th>
          <th className="border border-gray-300 p-2 text-sm">User Name</th>
          <th className="border border-gray-300 p-2 text-sm">CNIC</th>
          <th className="border border-gray-300 p-2 text-sm">Seats</th>
          <th className="border border-gray-300 p-2 text-sm">Phone</th>
          <th className="border border-gray-300 p-2 text-sm">Amount</th>
          <th className="border border-gray-300 p-2 text-sm">Status</th>
          <th className="border border-gray-300 p-2 text-sm">Place Name</th>
        </tr>
      )}
      {selectedType === "Users" && (
        <tr className="bg-blue-100 text-left text-gray-800">
          <th className="border border-gray-300 p-2 text-sm">#</th>
          <th className="border border-gray-300 p-2 text-sm">Name</th>
          <th className="border border-gray-300 p-2 text-sm">Email</th>
          <th className="border border-gray-300 p-2 text-sm">Phone</th>
        </tr>
      )}
    </thead>
    <tbody>
      {Array.isArray(tableData) && tableData.length > 0 ? (
        tableData.map((row, rowIndex) => (
          <tr
            key={row._id || rowIndex}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            {selectedType === "Places" && (
              <>
                <td className="border border-gray-300 p-2 text-sm">{rowIndex + 1}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.name}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.duration}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.tourType}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.speciality}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.availability}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.rate}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.totalBookings}</td>
              </>
            )}
            {selectedType === "Bookings" && (
              <>
                <td className="border border-gray-300 p-2 text-sm">{rowIndex + 1}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.userData.name}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.userFormInfo.cnic}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.userFormInfo.seats}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.userFormInfo.phone}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.amount}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.status === '' ? 'Pending' : row.status}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.placeData.name}</td>
              </>
            )}
            {selectedType === "Users" && (
              <>
                <td className="border border-gray-300 p-2 text-sm">{rowIndex + 1}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.name}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.email}</td>
                <td className="border border-gray-300 p-2 text-sm">{row.phone}</td>
              </>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="100%" className="text-center p-4 text-gray-500">
            No data available for {selectedType}.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

        </div>
      )}
      {DashBoardData &&
      <div className=" bg-white">
        <div className="flex items-center gap-3 p-4 mt-10 border rounded-t">
          <img src={assets.list_icon} alt="" className="w-8 h-8"/>
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="pt-4 border border-t-1">
          {
             DashBoardData.latestBooking.map((v,i)=>(
              <div key={i} className="flex m-3 p-1 border border-t-0 ">
                <img src={v.placeData.images[0]} alt="" className="w-12 h-12 rounded-full"/>
                <div className="pl-5 ">
                  <p>{v.placeData.name} </p>
                  <p>
                    <span>{v.slotDate}</span> || 
                    <span>{v.slotTime}</span>
                  </p>
                  </div>
                 {v.status === '' ? 
                 <div className="absolute right-10 text-gray-400 text-2xl">
                  <p>&#9203;</p>
                  </div> 
                 : 
                  <p className="absolute right-10">{v.status==='Accepted' ? <span className="text-green-600 text-2xl">&#10003;</span>  : <span className="text-red-600 text-2xl">&#10007;</span>}</p>
                  
}
              </div>
             ))
          }
        </div>
      </div>
}
    </div>
  );
};

export default DashBoard;
