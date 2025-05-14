import React, { useEffect, useState } from "react";
import BackButton from "../BackButton";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { raiseComplaint } from "../../features/complaints/complaintSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RaiseComplaint = () => {
  const { user } = useSelector((state) => state.auth);
  const { complaint, isSuccess, isError, message } = useSelector(
    (state) => state.complaints
  );
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
      navigate("/complaints");

      if (isError && message) {
        toast.error(message, {
          theme: "dark",
          position: "top-left",
        });
      }
    }
  }, [complaint, isSuccess, isError, message]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center px-4 sm:px-6 md:px-12 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <BackButton
          url={"/"}
          className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition text-xs sm:text-sm md:text-md w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 flex items-center justify-center"
        />
      </div>

      {/* Complaint Form with Moving Gradient Border */}
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
        className="p-1 rounded-xl w-full max-w-md sm:max-w-lg"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl w-full space-y-4 sm:space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
            Raise Complaint
          </h2>

          {/* Name input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={user.name}
              id="name"
              className="mt-2 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 transition-colors shadow-md"
            />
          </div>

          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              className="mt-2 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 transition-colors shadow-md"
            />
          </div>

          {/* Select device options */}
          <div>
            <label htmlFor="device" className="block text-sm font-medium text-gray-700">
              Device
            </label>
            <select
              name="model"
              value={model}
              onChange={handleChange}
              id="device"
              className="mt-2 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 transition-colors shadow-md"
            >
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="Macbook">Macbook</option>
              <option value="iMac">iMac</option>
              <option value="iWatch">iWatch</option>
            </select>
          </div>

          {/* Image URL input */}
          <div>
            <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              name="product_image"
              value={product_image}
              onChange={handleChange}
              type="text"
              id="imageURL"
              className="mt-2 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 transition-colors shadow-md"
            />
          </div>

          {/* Serial number input */}
          <div>
            <label htmlFor="serial_number" className="block text-sm font-medium text-gray-700">
              Serial Number
            </label>
            <input
              type="text"
              name="serial_number"
              value={serial_number}
              onChange={handleChange}
              id="serial_number"
              className="mt-2 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 transition-colors shadow-md"
            />
          </div>

          {/* Issue description textarea */}
          <div>
            <label htmlFor="issue_description" className="block text-sm font-medium text-gray-700">
              Describe your issue
            </label>
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              id="issue_description"
              className="mt-2 block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 transition-colors shadow-md"
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 sm:py-4 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
