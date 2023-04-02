import axios from "axios";
import authHeader from "./auth-Header";

// const API_URL = "https://cashout-app.onrender.com/api/v1/"
const API_URL = "http://localhost:4000/api/v1/users/"

// Get All users
const getAllUsers = () => {
    return axios.get(API_URL, { headers: authHeader()})
}

// Get Single user
const getSingleUser = (id) => {
    return axios.get(`API_URL ${id}`, { headers: authHeader()})
}

// Create New User
const createUser = () => {
    return axios.post(API_URL)
}

const UserService = { getAllUsers, createUser, getSingleUser };

export default UserService;