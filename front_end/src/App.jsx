import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import AppContextProvider from './context/AppContext'; // Ensure this path is correct

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home';
import Places from './pages/places';
import Login from './pages/login';
import Myprofile from './pages/myprofile';
import Myappointment from './pages/myappointment-booking';
import ContactUs from './pages/contact';
import About from './pages/about';
import Booking from './pages/Booking';
import Navbar from './components/navbar';
import Footer from './components/Footer';

const App = () => {
    return (
        <AppContextProvider> {/* Wrap the entire app in AppContextProvider */}
           
                <div className='mx-4 sm:mx-[10%]'>
                <ToastContainer />
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/places' element={<Places />} />
                        <Route path="/places/:speciality" element={<Places />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/myprofile' element={<Myprofile />} />
                        <Route path="/booking/:placeId" element={<Booking />} />
                        <Route path='/contact' element={<ContactUs />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/myappointment' element={<Myappointment />} />
                    </Routes>
                    <Footer />
                </div>
           
        </AppContextProvider>
    );
};

export default App;
