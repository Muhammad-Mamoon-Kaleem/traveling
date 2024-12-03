import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className="px-5 mt-3 bg-gray-100">
            {/* Main Content */}
            <div className="flex flex-col sm:flex-row justify-between gap-10 sm:gap-20 py-10">
                {/* Logo Section */}
                <div className="flex-2 text-center sm:text-left">
                    <img className="mb-5 mx-auto sm:mx-0 w-32 sm:w-40" src={assets.redlogo} alt="Logo" />
                    <p className="text-gray-600 text-sm leading-6 max-w-xs mx-auto sm:mx-0">Our mission is to turn your travel aspirations into reality with top-notch services, unbeatable packages, and a commitment to excellence. From breathtaking destinations to personalized itineraries.</p>
                </div>

                {/* Company Links */}
                <div className="flex-1 text-center sm:text-left">
                    <p className="text-lg font-semibold mb-5 text-gray-800">Company</p>
                    <ul className="space-y-2 text-gray-600">
                        <li>
                            <a href="/" className="hover:text-blue-500">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-blue-500">About Us</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-blue-500">Contact Us</a>
                        </li>
                        <li>
                            <a href="#privacy" className="hover:text-blue-500">Privacy Policy</a>
                        </li>
                    </ul>
                </div>

                {/* Get in Touch */}
                <div className="flex-1 text-center sm:text-left">
                    <p className="text-lg font-semibold mb-5 text-gray-800">Get in Touch</p>
                    <ul className="space-y-2 text-gray-600">
                        <li>
                            <a href="tel:+923362024682" className="hover:text-blue-500">+92 3037548335</a>
                        </li>
                        <li>
                            <a href="mailto:mamoonkaleem57@gmail.com" className="hover:text-blue-500">
                                mamoonkaleem57@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div>
                <hr className="border-gray-300" />
                <p className="py-5 text-sm text-center text-gray-600">
                    © 2024 Your Website Name. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
