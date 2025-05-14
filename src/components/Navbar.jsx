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
      className={`py-4 shadow-lg flex items-center justify-between px-4 sm:px-6 md:px-12 ${
        user?.access ? "bg-[#0d1010] text-white" : "bg-[#edf6f9]"
      }`}
    >
      <Link to={"/"}>
        <h1 className="text-xl sm:text-2xl font-bold">Phone Repair</h1>
      </Link>

      {/* Logo Image */}
      <span>
        <img
          className="hidden sm:block lg:w-[85px] lg:h-[40px] h-[50px] w-[90px] rounded-sm border-4 border-green-400 hover:border-blue-400 transition-all"
          src="/j.png" // Ensure the image path is correct and accessible from the public folder
          alt="Phone Repair Logo"
        />
      </span>

      {/* Navbar Buttons */}
      <span className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        {/* If user is null (not logged in), show Login and Register buttons */}
        {!user ? (
          <>
            <Link to={"/Login"}>
              <button
                type="button"
                className="text-gray-900 h-[40px] sm:h-[45px] bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-lime-200 font-medium rounded-md text-xs sm:text-sm md:text-md px-4 sm:px-5 py-2 text-center"
              >
                Login
              </button>
            </Link>

            <Link to={"/Register"}>
              <button
                type="button"
                className="text-white h-[40px] sm:h-[45px] bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-md text-xs sm:text-sm md:text-md px-4 sm:px-5 py-2 ring-4 ring-white text-center"
              >
                Register
              </button>
            </Link>
          </>
        ) : (
          // If user is logged in, show Logout button
          <button
            onClick={handleLogOut}
            type="button"
            className="text-white h-[40px] sm:h-[45px] bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-md text-xs sm:text-sm md:text-md px-4 sm:px-5 py-2 ring-4 ring-white text-center"
          >
            Logout
          </button>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
