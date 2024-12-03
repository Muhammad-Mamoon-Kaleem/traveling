import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../Contexts/AdminContext';
import { assets } from '../assets/assets.js';

const SideBar = () => {
    const { atoken } = useContext(AdminContext);
    const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button 
                className="sm:hidden p-4 text-blue-500 focus:outline-none" 
                onClick={toggleSidebar}
            >
                ☰
            </button>

            {/* Sidebar */}
            <div
                className={`fixed sm:static top-0 left-0 min-h-screen  min-w-[30vh] border-r-2 bg-white z-50 transition-transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:translate-x-0`}
            >
                {atoken && (
                    <ul className="mt-6">
                        <NavLink
                            to={'/admin-dashboard'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 cursor-pointer py-4 px-4 ${
                                    isActive ? 'border-r-4 border-blue-500 bg-[#f2f3ff]' : ''
                                }`
                            }
                        >
                            <img src={assets.home_icon} alt="" />
                            <p>Dashboard</p>
                        </NavLink>

                        <NavLink
                            to={'/bookinglist'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 cursor-pointer py-4 px-4 ${
                                    isActive ? 'border-r-4 border-blue-500 bg-[#f2f3ff]' : ''
                                }`
                            }
                        >
                            <img src={assets.appointment_icon} alt="" />
                            <p>Bookings</p>
                        </NavLink>

                        <NavLink
                            to={'/addplace'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 cursor-pointer py-4 px-4 ${
                                    isActive ? 'border-r-4 border-blue-500 bg-[#f2f3ff]' : ''
                                }`
                            }
                        >
                            <img src={assets.add_icon} alt="" />
                            <p className="whitespace-nowrap">Add Place</p>
                        </NavLink>

                        <NavLink
                            to={'/allplaces'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 cursor-pointer py-4 px-4 ${
                                    isActive ? 'border-r-4 border-blue-500 bg-[#f2f3ff]' : ''
                                }`
                            }
                        >
                            <img src={assets.allplaceimg} alt="" className="w-7 h-7" />
                            <p>All Places</p>
                        </NavLink>
                    </ul>
                )}
            </div>

            {/* Overlay for mobile when sidebar is open */}
            {isOpen && (
                <div 
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 md:hidden" 
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default SideBar;
