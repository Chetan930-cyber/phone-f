import axios from "axios";

const API_URL = "/api/phone"



const fetchNotes = async(id, token) =>{
    let options = {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/${id}/note`, options)
    return response.data;
}

const addNotes = async(formData, token) =>{
    let options = {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}/${formData.id}/note`, formData, options)
    return response.data;
}

const noteService = {
    fetchNotes,addNotes
}
export default noteService;