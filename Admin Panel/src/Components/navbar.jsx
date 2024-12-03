import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../Contexts/AdminContext.jsx';
import { toast } from 'react-toastify';
import { assets } from '../../../front_end/src/assets/assets.js';

const Navbar = () => {
  const navigate = useNavigate();
  const { atoken, setAtoken } = useContext(AdminContext);

  const Logout = () => {
    toast.success('Logout successfully');
    console.log(`Your Login Token Removed from localStorage: ${atoken}`);
    if (atoken) {
      setAtoken('');
      localStorage.removeItem('aToken');
    }
    navigate('/');
  };

  return (
    <div className="flex flex-wrap justify-between items-center px-5 sm:px-10 py-3 border-b-2">
      {/* Logo and admin status */}
      <div className="flex items-center gap-3 text-xs max-h-14">
        <img
          src={assets.redlogo}
          alt="Logo"
          className="w-28 md:w-36 cursor-pointer"
        />
        <p className="hidden sm:block px-2.5 py-1 border rounded-full">
          Admin <span className="text-blue-500 font-medium">Logged in</span>
        </p>
      </div>

      {/* Logout button */}
      <button
        className="mt-2 sm:mt-0 px-6 py-2 border rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
        onClick={Logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
