import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';

const Navbar = () => {
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () =>{
    dispatch(logoutUser())
  }

  return (
    <nav className={user?.access?"bg-[#0d1010] text-white py-4 shadow-lg flex items-center justify-between px-4":"bg-[#edf6f9] py-4 shadow-lg flex items-center justify-between px-4"}>
      <Link to={"/"}>
        <h1 className="lg:text-[20px] lg:font-bold text-[20px] font-bold">Phone Repair</h1>
      </Link>

      {/* Logo Image */}
      <span>
        <img
          className="hidden sm:block lg:w-[85px] lg:h-[40px] md: mr-44 h-[50px] w-[90px]  rounded-sm border-green-400 hover:border-blue-400 border-[3px] relative left-[70px]"
          src="/j.png" // Ensure the image path is correct and accessible from the public folder
          alt="Phone Repair Logo"
        />
      </span>

      {/* Navbar Buttons */}
      <span className="flex lg:flex-row sm:flex-col items-center gap-4">
        {/* If user is null (not logged in), show Login and Register buttons */}
        {!user ? (
          <>
            <Link to={"/Login"}>
              <button
                type="button"
                className="text-gray-900 h-[45px] bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-[11px] text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </Link>

            <Link to={"/Register"}>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-[11px] text-sm px-5 py-2.5 ring-4 ring-white text-center"
              >
                Register
              </button>
            </Link>
          </>
        ) : (
          // If user is logged in, show Logout button
          <Link>
            <button onClick={handleLogOut}
              type="button"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-[11px] text-sm px-5 py-2.5 ring-4 ring-white text-center"
            >
              Logout
            </button>
          </Link>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
