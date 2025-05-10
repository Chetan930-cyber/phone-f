import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import { toast } from 'react-toastify';
import { loginUser } from '../../features/auth/authSlice';

const Login = () => {

  const {user, isLoading , isSuccess, message, isError} = useSelector(state => state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch();
 // Register form state
  const [formData, setFormData] = useState({
   
    email: '',
   
    password: '',
   
  });

  const {  email, password} = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))


  };


  useEffect(() => {
  if(user) {
    navigate('/')
  }
  if (isError && message) {
    toast.error(message, {
      theme: "dark",
      position: "top-left",
    });
  }
  },[user, isError , message]);

   


  if (isLoading) {
    return ( <Loading/>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-yellow-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name='email'
              value={email}
              onChange={handleChange}
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              name='password'
              value={password}
              onChange={handleChange}
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 hover:cursor-pointer rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
