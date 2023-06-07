import axios from "axios";
import authHeader from "./auth-Header";
import API_BASE_URL from "@/apiConfig";

const BASE_URL = `${API_BASE_URL}/api/v1/users`
const BASE_URL_PAY = `${API_BASE_URL}/admin/getAllPayment`

// Get All users
const getAllUsers = () => {
    return axios.get(BASE_URL, { headers: authHeader()})
}
// Get All Payment
const getPayment = () => {
    return axios.get(BASE_URL_PAY, { headers: authHeader()})
}

// Get Single user
const getSingleUser = (id) => {
    return axios.get(`${BASE_URL}/${id}`, { headers: authHeader()})
}

// Create New User
const createUser = () => {
    return axios.post(BASE_URL)
}

const UserService = { getAllUsers, getPayment, createUser, getSingleUser };

export default UserService;