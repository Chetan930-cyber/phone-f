import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa"; // Importing the FaEye icon
import BackButton from "../BackButton";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplaints } from "../../features/complaints/complaintSlice";
import Loading from "../Loading";

const Complaints = () => {
  const{complaints, isLoading, isError , message} = useSelector((state) => state.complaints);
   const dispatch = useDispatch();

   useEffect(() =>{
    dispatch(getAllComplaints());

    if (isError && message){
      toast.error(message);
    }
   },[isError, message]);

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
          All Complaints
        </h1>

        {/* Complaints List Section */}
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
            Complaints List
          </h2>
          <div className="relative overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-sm text-gray-900">
              <thead className="text-xs text-white uppercase font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">Product Name</th>
                  <th scope="col" className="px-6 py-3 text-left">Serial No.</th>
                  <th scope="col" className="px-6 py-3 text-left">Date</th>
                  <th scope="col" className="px-6 py-3 text-left">Status</th>
                  <th scope="col" className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
              {
                complaints.map(complaint =>{
                  return   <tr key={complaint._id} className="bg-white border-b hover:bg-gray-50 transition duration-300">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                   {complaint.model}
                  </td>
                  <td className="px-6 py-4">{complaint.serial_number}</td>
                  <td className="px-6 py-4">{new Date(complaint.createdAt).toLocaleDateString(
                        "en-IN"
                      )}</td>
                  <td className="px-6 py-4">
                    <span className={complaint.status === 'closed' ?"bg-red-600 text-white py-1 hover:bg-green-700 px-3 rounded-full font-semibold":"bg-green-600 text-white py-1 hover:bg-green-700 px-3 rounded-full font-semibold"}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/complaints/${complaint._id}`}>
                    <button className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-md hover:from-teal-600 hover:to-cyan-600 transition-colors duration-300 flex items-center gap-2">
                      <FaEye /> View
                    </button>
                    </Link>
                    
                  </td>
                </tr>
                
                {/* Add more rows as needed */}
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
