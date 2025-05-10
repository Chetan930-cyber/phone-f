import axios from "axios";

// Use environment variable or fallback to the production URL
const BASE_URL = import.meta.env.VITE_API_URL || "https://b-phone.onrender.com";
const API_URL = `${BASE_URL}/api/user`;

const register = async(formData) => {
    const response = await axios.post(API_URL + "/register", formData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
};

const login = async(formData) => {
    const response = await axios.post(API_URL + "/login", formData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
};

const authService = {
    register, login
};

export default authService;