import React, { useContext, useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const ContactUs = () => {

  const { usrData,token,backend_url } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  //  const email=usrData.email;
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (usrData.email) {
      setFormData((prev) => ({ ...prev, email: usrData.email }));
    }
  }, [usrData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const response = await axios.post(backend_url+'/api/user/send-email', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
        toast.success('Message sent successfully!');
        setLoading(false)
        console.log(response.data);
      
      
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error:', error.response ? error.response.data : error.message);
    }
    finally{
      setLoading(false)
    }

    // Clear the form after submission
    setFormData({ name: '', subject: '', message: '' });
  };

  return (
    <div className="contact-us">

      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[400px]" style={{ backgroundImage: `url('/assets/Maldives.jpg')` }}>
        <div className="bg-blue-600 bg-opacity-80 flex flex-col justify-center items-center h-full text-white">
          <h1 className="text-5xl md:text-6xl font-bold">Get in Touch</h1>
          <p className="mt-4 text-xl md:text-2xl">We'd love to hear from you!</p>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-blue-500 px-6 py-4 rounded-md shadow-md">
            <p className="text-lg font-semibold text-white">Please wait...</p>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Contact Us</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="6"
              required
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-md transition duration-300 col-span-2 font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
