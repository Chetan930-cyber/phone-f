import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <nav
      className={`py-4 shadow-lg flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 transition-all duration-300 ${
        user?.access ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white" : "bg-gradient-to-r from-blue-50 to-cyan-50"
      }`}
    >
      <Link to={"/"}>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-300 hover:scale-105">
          Phone Repair
        </h1>
      </Link>

      {/* Logo Image - Wrapped inside Link */}
      <Link to={"/"}>
        <div className="absolute left-1/2 transform -translate-x-1/2 sm:static sm:translate-x-0 sm:flex sm:justify-center">
          <img
            className="hidden sm:block h-10 w-20 md:h-12 md:w-24 lg:h-14 lg:w-28 rounded-md border-4 border-green-400 hover:border-blue-400 transition-all duration-300 hover:scale-105 shadow-md"
            src="/j.png"
            alt="Phone Repair Logo"
          />
        </div>
      </Link>

      {/* Navbar Buttons */}
      <div className="flex flex-row items-center gap-2 sm:gap-4">
        {!user ? (
          <>
            <Link to={"/Login"}>
              <button
                type="button"
                className="text-gray-900 h-10 sm:h-11 md:h-12 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:scale-105 focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-md text-xs sm:text-sm px-3 sm:px-5 py-2 text-center transition-all duration-300 shadow-md"
              >
                Login
              </button>
            </Link>

            <Link to={"/Register"}>
              <button
                type="button"
                className="text-white h-10 sm:h-11 md:h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:scale-105 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-md text-xs sm:text-sm px-3 sm:px-5 py-2 ring-2 ring-white text-center transition-all duration-300 shadow-md"
              >
                Register
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogOut}
            type="button"
            className="text-white h-10 sm:h-11 md:h-12 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl hover:scale-105 focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-md text-xs sm:text-sm px-3 sm:px-5 py-2 ring-2 ring-white text-center transition-all duration-300 shadow-md"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
