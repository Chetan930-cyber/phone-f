const API_URL = "/api/admin/"
import axios from "axios"

const fetchUsers = async(token) =>{
   
    let options = {
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    let response = await axios.get(API_URL + "/users",options);
    return response.data;
}

const fetchComplaints = async(token) =>{
  
    let options = {
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    let response = await axios.get(API_URL + "/complaints",options);
    return response.data;
}

const adminService = {
    fetchUsers,fetchComplaints
}

export default adminService;