import axios from "axios";
import authHeader from "./auth-Header";
import API_BASE_URL from "@/apiConfig";

const BASE_URL = `${API_BASE_URL}/api/v1/users`

// Get All users
const getAllUsers = () => {
    return axios.get(BASE_URL, { headers: authHeader()})
}

// Get Single user
const getSingleUser = (id) => {
    return axios.get(`${BASE_URL}/${id}`, { headers: authHeader()})
}

// Create New User
const createUser = () => {
    return axios.post(BASE_URL)
}

const UserService = { getAllUsers, createUser, getSingleUser };

export default UserService;