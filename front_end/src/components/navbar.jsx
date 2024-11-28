import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const [showMenue, setshowMenue] = useState(false);
  
  const{token,setToken,usrData}=useContext(AppContext)
  const navigate = useNavigate();

  const LogOut=()=>{
    localStorage.removeItem('token')
    setToken('')
    navigate('/login')
  }
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 ">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.redlogo}
        alt="Logo"
        className="w-36 cursor-pointer "
      />

      {/* Navigation Menu */}
      <ul className="hidden md:flex items-center gap-7 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/places"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
            }
          >
            All Places
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
            }
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 border-b-2 border-blue-500' : ''
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>

      {/* Profile and Menu */}
      <div className="flex items-center gap-2">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-10 h-10 rounded-full" src={usrData.image ? usrData.image: assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-16 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-3 p-4">
                <p className="hover:text-blue-400 cursor-pointer" onClick={() => navigate('/myprofile')}>
                  My Profile
                </p>
                <p className="hover:text-blue-400 cursor-pointer" onClick={() => navigate('/myappointment')}>
                  My Booking
                </p>
                <p className="hover:text-blue-400 cursor-pointer" onClick={LogOut}>
                  Log Out
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="hidden md:block bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => navigate('/login')}
          >
            Create Account
          </button>
        )}

        {/* Menu Icon - Visible only on small screens */}
        <img
          src={assets.menu_icon}
          className="md:hidden w-6"
          alt="Menu"
          onClick={() => setshowMenue(true)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 right-0 w-[50%]  bg-white shadow-lg rounded-l-2xl p-5 flex flex-col gap-6 md:hidden z-20 transition-transform duration-300 ease-in-out ${
          showMenue ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cross Icon to Close Menu */}
        <img
          src={assets.cross_icon}
          className="w-6 h-6 absolute top-4 right-4 cursor-pointer"
          alt="Close"
          onClick={() => setshowMenue(false)}
        />

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-semibold' : 'text-gray-700'
          }
          onClick={() => setshowMenue(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/places"
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-semibold' : 'text-gray-700'
          }
          onClick={() => setshowMenue(false)}
        >
          All Places
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-semibold' : 'text-gray-700'
          }
          onClick={() => setshowMenue(false)}
        >
          About Us
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? 'text-blue-500 font-semibold' : 'text-gray-700'
          }
          onClick={() => setshowMenue(false)}
        >
          Contact Us
        </NavLink>
   
      </div>
    </div>
  );
};

export default Navbar;
