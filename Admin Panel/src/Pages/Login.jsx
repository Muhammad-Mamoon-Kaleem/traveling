import React, { useContext, useState } from 'react';
import { AdminContext } from '../Contexts/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state] = useState('Admin');

  const {atoken,setAtoken,backEnd_Url}=useContext(AdminContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., API call)
    // console.log({ email, password });

    try {

      if(state==='Admin'){       
        const {data}=await axios.post(backEnd_Url+'/api/admin/adminlogin',{email,password})
        
        if (data.success) {
          // Display the success toast
          toast.success("Login Successfully");
          setAtoken(data.token); // Set the token after delay
          localStorage.setItem('aToken', data.token);
          console.log("Token set, redirecting or updating state...");
          // Delay the token set and redirect by 1 second (or another suitable time)
        }
        
        else{
          toast.error(data.message)
        }
      }

      else{
        console.log("Error in getting token login");
        
      }
    } 
    catch (error) {
      console.log("Axios request is not properly sending from admin panel",error);
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin <span className='text-blue-500'>Login</span> </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required 
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full font-medium bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
