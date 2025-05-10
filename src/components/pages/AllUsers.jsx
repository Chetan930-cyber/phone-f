import React, { useEffect } from "react";
import BackButton from "../BackButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUsers } from "../../features/admin/adminSlice";
import Loading from "../Loading";

const AllUsers = () => {

  
  const{users, isLoading, isSuccess, isError, message} = useSelector((state) => state.admin);
  const dispatch = useDispatch()

   useEffect(() =>{
    dispatch(getUsers());
 if (isError && message){
      toast.error(message);
    }
  },[isError,message])

  if(isLoading){
    return <Loading/>
   };
   


  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-400 to-cyan-600 flex items-center justify-center relative">
      {/* Back Button fixed to top-left corner */}
      <div className="absolute top-4 left-4">
        <BackButton
          url={"/"}
          className="bg-white p-1.5 rounded-full shadow-md hover:shadow-lg transition text-xs w-8 h-8 flex items-center justify-center"
        />
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-6 py-12">
        {/* Main Heading */}
        <h1 className="text-6xl font-extrabold text-white uppercase tracking-widest drop-shadow-2xl text-center mb-12">
          All Users
        </h1>

        {/* Complaints List Section */}
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
            All Users
          </h2>
          <div className="relative overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-sm text-gray-900">
              <thead className="text-xs text-white uppercase font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <tr>
                  <th scope="col" className="px-6 py-3 w-1/3 text-left">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/3 text-left">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/3 text-left">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50 transition duration-300">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-1/3">
                    Chetan
                  </td>
                  <td className="px-6 py-4 w-1/3">chetan@gmail.com</td>
                  <td className="px-6 py-4 w-1/3">22-12-2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
