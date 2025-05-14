import React, { useEffect } from "react";
import BackButton from "../BackButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUsers } from "../../features/admin/adminSlice";
import Loading from "../Loading";

const AllUsers = () => {
  const { users, isLoading, isError, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    if (isError && message) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-400 to-cyan-600 flex items-center justify-center relative">
      {/* Back Button fixed to top-left corner */}
      <div className="absolute top-4 left-4">
        <BackButton
          url={"/"}
          className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition text-xs sm:text-sm md:text-md w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 flex items-center justify-center"
        />
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 max-w-screen-lg">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-widest drop-shadow-2xl text-center mb-8 sm:mb-12">
          All Users
        </h1>

        {/* Users List Section */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-6 sm:mb-8">
            Users List
          </h2>
          <div className="relative overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-xs sm:text-sm md:text-md text-gray-900">
              <thead className="text-xs sm:text-sm text-white uppercase font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-3 w-1/3 text-left">
                    Name
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 w-1/3 text-left">
                    Email
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-3 w-1/3 text-left">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="bg-white border-b hover:bg-gray-50 transition duration-300">
                    <td className="px-4 sm:px-6 py-3 font-medium text-gray-900 whitespace-nowrap w-1/3">
                      {user.name}
                    </td>
                    <td className="px-4 sm:px-6 py-3 w-1/3">{user.email}</td>
                    <td className="px-4 sm:px-6 py-3 w-1/3">
                      {new Date(user.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
