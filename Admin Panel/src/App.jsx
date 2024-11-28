import React, { useContext } from 'react';
import Login from './Pages/Login';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Contexts/AdminContext';
import Navbar from './Components/navbar';
import SideBar from './Components/SideBar';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/Admin/DashBoard';
import AddPlace from './Pages/Admin/AddPlace';
import BookingsList from './Pages/Admin/BookingsList';
import AllPlaces from './Pages/Admin/AllPlaces';

const App = () => {
  // Destructure the login token from AdminContext
  const { atoken } = useContext(AdminContext);

  return (
    <div>
      {/* Move ToastContainer outside the conditional rendering */}
      <ToastContainer />
      
      {atoken ? (
        <>
          <Navbar />
          {/* Main layout: Sidebar + Content */}
          <div className='flex'>
            {/* Sidebar with a fixed width */}
            <div className='w-44 sm:w-64'>
              <SideBar />
             
            </div>
            {/* Content area that takes the remaining space */}
            <div className='flex-1 pl-1'>
              <Routes>
                <Route path='/' element={<DashBoard/>} />
                <Route path='/admin-dashboard' element={<DashBoard />} />
                <Route path='/addplace' element={<AddPlace />} />
                <Route path='/bookinglist' element={<BookingsList />} />
                <Route path='/allplaces' element={<AllPlaces />} />

                <Route path='/updateplace/:id' element={<AddPlace/>} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
