import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/complaints/complaintSlice";

const Home = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    if (!user) {
      navigate("/login");
    }
  }, [dispatch, user]);

  return (
    <div
      className={`min-h-screen ${
        user?.access
          ? "bg-blue-300"
          : "bg-gradient-to-br from-teal-200 to-lime-200"
      } flex flex-col items-center justify-start py-10 px-4 sm:px-6 md:px-12`}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-red-600 mb-6 sm:mb-10">
        Home
      </h1>

      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] p-6 sm:p-8 bg-white rounded-lg shadow-2xl border-4 border-gray-300 hover:border-gray-500 transition-all duration-300">
        <p className="text-lg sm:text-xl font-bold text-center text-black mb-4 sm:mb-6">
          Welcome, {user?.name}
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 items-center">
          {user?.access ? (
            <>
              <Link to="/admin/users" className="w-full">
                <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-700 text-white font-medium rounded-lg text-xs sm:text-sm md:text-md px-4 sm:px-5 py-2 sm:py-2.5 ring-4 ring-white text-center transition-all duration-300 hover:scale-105">
                  View All Users
                </button>
              </Link>

              <Link to="/admin/complaints" className="w-full">
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-700 text-white font-medium rounded-lg text-xs sm:text-sm md:text-md px-4 sm:px-5 py-2 sm:py-2.5 ring-4 ring-white text-center transition-all duration-300 hover:scale-105">
                  View All Complaints
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/raise-complaint" className="w-full">
                <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-700 text-white font-medium rounded-lg text-xs sm:text-sm md:text-md px-4 sm:px-5 py-2 sm:py-2.5 ring-4 ring-white text-center transition-all duration-300 hover:scale-105">
                  Raise Complaints
                </button>
              </Link>

              <Link to="/complaints" className="w-full">
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-700 text-white font-medium rounded-lg text-xs sm:text-sm md:text-md px-4 sm:px-5 py-2 sm:py-2.5 ring-4 ring-white text-center transition-all duration-300 hover:scale-105">
                  All Complaints
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
