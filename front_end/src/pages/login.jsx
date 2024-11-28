import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [agreeToSendCode, setAgreeToSendCode] = useState(false);
  const [timer, setTimer] = useState(90);
  const [disableBtn, setDisableBtn] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (disableBtn) {
      const expiryTime = Date.now() + 90000;
      const timerInterval = setInterval(() => {
        const remainingTime = Math.max(0, expiryTime - Date.now());
        setTimer(Math.floor(remainingTime / 1000));
        if (remainingTime <= 0) {
          setDisableBtn(false);
          clearInterval(timerInterval);
        }
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [disableBtn]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setConfirmationCode("");
    setAgreeToSendCode(false);
  };
  useEffect(() => {
    resetForm();
  }, [isLogin, isForgotPassword]);

  const { backend_url, setToken, token } = useContext(AppContext);

  const handleSendCode = async () => {
    if (disableBtn) return;
    setDisableBtn(true);
    try {
      const { data } = await axios.post(`${backend_url}/api/user/sendconfirmationcode`, { email });
      if (data.success) {
        toast.success('Confirmation code sent to your email');
        setDisableBtn(true);
      } else {
        toast.error(data.message);
        setDisableBtn(false);
      }
    } catch (error) {
      toast.error('Error sending confirmation code', error);
      console.log(error);
      setDisableBtn(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isForgotPassword && !isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (isLogin && !isForgotPassword) {
      try {
        const { data } = await axios.post(`${backend_url}/api/user/loginuser`, { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Login Successfully');
          resetForm();
          setIsForgotPassword(false)
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }
    if (isForgotPassword) {
      try {
        const { data } = await axios.post(`${backend_url}/api/user/changePassword`, { email, password, confirmationCode });
        if (data.success) {
          resetForm()
          toast.success('Password Change Successfully')
          setIsForgotPassword(false)
          setIsLogin(true);
        }
        else {
          toast.error(data.message)
        }
      }
      catch (error) {
        console.log("catch block error for changing password", error);

      }
      return;
    }
    else {
      try {
        const { data } = await axios.post(`${backend_url}/api/user/registeruser`, { name, email, password, confirmationCode });
        if (data.success) {
          toast.success('Sign up Successfully');
          localStorage.setItem('token', data.token);
          setToken(data.token);
          resetForm();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!isForgotPassword ? (
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
            {!isLogin && (
              <>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="ex.John"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@mail.com"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"} // Toggle between text and password
                      placeholder="••••••••"
                      id="password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {isPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={isConfirmPasswordVisible ? "text" : "password"} // Toggle between text and password
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {isConfirmPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="agreeToSendCode" className="flex items-center text-sm font-semibold text-gray-600">
                    <input
                      type="checkbox"
                      id="agreeToSendCode"
                      checked={agreeToSendCode}
                      onChange={() => setAgreeToSendCode(!agreeToSendCode)}
                      className="mr-2"
                    />
                    I agree to receive a confirmation code via email
                  </label>
                </div>
                <button
                  type="button"
                  className="w-full bg-green-600 text-white py-2 rounded-md font-semibold mb-4"
                  onClick={handleSendCode}
                  disabled={!agreeToSendCode || disableBtn}
                >
                  {disableBtn ? `Resend in ${timer}sec` : 'Send Confirmation Code'}
                </button>
                <div className="mb-4">
                  <label htmlFor="confirmationCode" className="block text-sm font-semibold text-gray-600 mb-2">Confirmation Code</label>
                  <input
                    type="text"
                    id="confirmationCode"
                    placeholder="000-000"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            {isLogin && (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
                  <div className='relative'>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {isPasswordVisible ? 'Hide' : 'Show'}  {/* Show/Hide text toggle */}
                    </button></div>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <div className="mt-6 flex justify-center items-center">
            <button
              className="text-sm font-semibold text-blue-500"
              onClick={() => {
                setIsLogin(!isLogin);

              }}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <button
              className="text-sm font-semibold text-red-500 "
              onClick={() => {
                setIsForgotPassword(true);

              }}>
              Forgot Password?
            </button>
          </div>

        </div>
      ) : (

        // Forgot Password Form (adjust as necessary)

        <div className="bg-blue-50 p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
            Change Password
          </h2>
          <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-600 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"} // Toggle between text and password
                  id="newPassword"
                  placeholder="••••••••"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {isPasswordVisible ? 'Hide' : 'Show'}  {/* Replace icon with text */}
                </button>
              </div>
            </div>


            <div className="mb-4">
              <label htmlFor="agreeToSendCode" className="flex items-center text-sm font-semibold text-gray-600">
                <input
                  type="checkbox"
                  id="agreeToSendCode"
                  checked={agreeToSendCode}
                  onChange={() => setAgreeToSendCode(!agreeToSendCode)}
                  className="mr-2"
                />
                I agree to receive a confirmation code via email
              </label>
            </div>

            <button
              type="button"
              className="w-full bg-green-600 text-white py-2 rounded-md font-semibold mb-4"
              onClick={handleSendCode}
              disabled={!agreeToSendCode || disableBtn}
            >
              {disableBtn ? `Resend in ${timer}sec` : 'Send Confirmation Code'}
            </button>

            <div className="mb-4">
              <label htmlFor="confirmationCode" className="block text-sm font-semibold text-gray-600 mb-2">Confirmation Code</label>
              <input
                type="text"
                id="confirmationCode"
                placeholder="000-000"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold"
            >
              Update Password
            </button>
          </form>
          <div className="mt-4 flex justify-center items-center">
            <button
              className="text-sm font-semibold text-green-500 "
              onClick={() => {
                setIsForgotPassword(false);

              }}
            >
              I remember my Password?
            </button>
          </div>
        </div>

      )}
    </div>
  );
}

export default Login;
