import axios from "axios";

// Use environment variable or fallback to the production URL
const BASE_URL = import.meta.env.VITE_API_URL || "https://b-phone.onrender.com";
const API_URL = `${BASE_URL}/api/phone`;

const fetchComplaints = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, options);
  return response.data;
};

const fetchComplaint = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, options);
  return response.data;
};

const addComplaint = async (formData, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, formData, options);
  return response.data;
};

const updateComplaint = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, {status: "closed"}, options);
  return response.data;
};

const complaintService = {
  fetchComplaints,
  fetchComplaint,
  addComplaint,
  updateComplaint,
};

export default complaintService;