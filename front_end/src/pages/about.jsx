import React from 'react';
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
const About = () => {
  const teamMembers = [
    {
      name: "M Waqas",
      role: "Founder & CEO",
      image: assets.waqas,
      bio: "Waqas is passionate about creating unique experiences for travelers.",
    },
    {
      name: "Ali Hussain",
      role: "Marketing Manager",
      image: assets.ali,
      bio: "Develop and execute marketing campaigns to promote travel packages and offers.",
    },
    {
      name: "Hammad Manzoor",
      role: "Travel Consultant",
      image: assets.hammad,
      bio: "Customize travel itineraries to meet clients' preferences and budgets.",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100">
{/* Hero Section */}
<div className="relative w-full h-[400px] bg-fixed bg-cover bg-center">
  <div className="absolute inset-0 bg-blue-600 bg-opacity-70 flex justify-center items-center">
    <div className="text-center text-white px-4 md:px-10">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">About Us</h1>
      <p className="text-lg md:text-xl mb-2 font-medium drop-shadow-md">
        Your trusted travel partner for unforgettable experiences
      </p>
      <p className="text-md md:text-lg mb-6 max-w-2xl mx-auto mt-4">
        At Travel Mania, we pride ourselves on offering personalized travel solutions that cater to your unique desires. 
        Our team of experts is dedicated to crafting unforgettable journeys filled with exceptional service, cultural immersion, 
        and adventure. Let us help you create memories that last a lifetime!
      </p>
    </div>
  </div>
</div>





      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto py-16">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center">
            Our mission is to empower travelers by offering personalized experiences that cater to their interests and preferences.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto py-16">
        <h2 className="text-4xl font-semibold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 text-center">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-32 h-32 rounded-full mx-auto mb-6"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600 font-medium">{member.role}</p>
              <p className="mt-4 text-gray-500">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-4xl mx-auto py-16">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['Integrity', 'Customer Satisfaction', 'Innovation', 'Diversity & Inclusion'].map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold text-blue-600">{value}</h3>
              <p className="mt-4 text-gray-600">
                We prioritize {value.toLowerCase()} in everything we do, ensuring excellence and trust.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative w-full h-[300px] bg-fixed bg-cover bg-center" >
        <div className="absolute inset-0 bg-blue-600 bg-opacity-80 flex justify-center items-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Join Us on This Journey!</h2>
            <p className="mb-6">Connect with us to learn more about our services and offerings.</p>
            <button onClick={()=>navigate('/contact')} className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
