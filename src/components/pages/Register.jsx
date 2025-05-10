import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import { toast } from 'react-toastify';
import { registerUser } from '../../features/auth/authSlice';

const Register = () => {
  const { user, isLoading, isError, message, isSuccess } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Register form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  });

  const { name, email, phone, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match", {
        position: "top-center",
        theme: "dark",
      });
    
    }
    else {
      dispatch(registerUser(formData));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    if (isError && message) {
      toast.error(message, {
        theme: "dark",
        position: "top-left",
      });
    }
  }, [user, isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center py-10"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
      }}
    >
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] p-8 bg-white bg-opacity-80 rounded-lg shadow-2xl border-4 border-gray-300">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-lg text-gray-800 font-semibold">
              Enter Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleChange}
              name="name"
              placeholder="Shreya Rajput"
              className="w-full p-4 mt-2 rounded-lg border-2 border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-lg text-gray-800 font-semibold">
              Enter Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="shreya900@email.com"
              className="w-full p-4 mt-2 rounded-lg border-2 border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-lg text-gray-800 font-semibold">
              Enter Phone
            </label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              value={phone}
              placeholder="+91 7389546265"
              className="w-full p-4 mt-2 rounded-lg border-2 border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-lg text-gray-800 font-semibold">
              Enter Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter a strong password"
              className="w-full p-4 mt-2 rounded-lg border-2 border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-lg text-gray-800 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full p-4 mt-2 rounded-lg border-2 border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg text-sm py-3 mt-6 ring-4 ring-indigo-400 hover:bg-gradient-to-l transition-all"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
