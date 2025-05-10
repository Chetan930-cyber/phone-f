import React, { useEffect, useState } from "react";
import BackButton from "../BackButton";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { raiseComplaint } from "../../features/complaints/complaintSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RaiseComplaint = () => {
  const { user } = useSelector(state => state.auth);
  const { complaint, isSuccess, isError, message } = useSelector(state => state.complaints);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    model: "",
    product_image: "",
    serial_number: "",
    description: "",
  });

  const { model, product_image, serial_number, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(raiseComplaint(formData));
  };

  useEffect(() => {
    if (isSuccess && complaint) {
      navigate('/complaints');
    }
    if (isError && message) {
      toast.error(message, {
        theme: "dark",
        position: "top-left",
      });
    }
  }, [complaint, isSuccess, isError, message, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center relative">
      <div className="absolute top-4 left-4">
        <BackButton
          url={"/"}
          className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition text-sm"
        />
      </div>

      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          backgroundImage: "linear-gradient(90deg, #06b6d4, #3b82f6, #9333ea)",
          backgroundSize: "200%",
        }}
        className="p-1 rounded-xl w-full max-w-lg"
      >
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-2xl w-full space-y-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Raise Complaint
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 transition-colors shadow-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 transition-colors shadow-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Device
            </label>
            <select
              name="model"
              value={model}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 transition-colors shadow-md"
            >
              <option value="">Select Device</option>
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="Macbook">Macbook</option>
              <option value="iMac">iMac</option>
              <option value="iWatch">iWatch</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              name="product_image"
              value={product_image}
              onChange={handleChange}
              type="text"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 transition-colors shadow-md"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Serial Number
            </label>
            <input
              type="text"
              name="serial_number"
              value={serial_number}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 transition-colors shadow-md"
              placeholder="Enter serial number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Describe your issue
            </label>
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-100 transition-colors shadow-md"
              placeholder="Describe your issue"
              rows="4"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
            >
              Raise Complaint
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RaiseComplaint;