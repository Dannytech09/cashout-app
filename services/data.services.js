import axios from "axios";
import authHeader from "./auth-Header";
import API_BASE_URL from "@/apiConfig";

// Get Current Data Prices
const getAllDataInfo = () => {
    return axios.get(`${API_BASE_URL}/buyData`, { headers: authHeader()})
}

// Update Data Prices
const setDataPrices = () => {
    return axios.put(`${API_BASE_URL}/update-price`, { headers: authHeader()})
}

// Get all data purchased
const getAllDataPurchase = () => {
    return axios.get(`${API_BASE_URL}/getAllDataPurchase`, { headers: authHeader()})
}

// Purchase Data
const purchaseData = () => {
    return axios.post(`${API_BASE_URL}/purchase/${userId}`, { headers: authHeader()})
}

const DataServices = { getAllDataInfo, setDataPrices, getAllDataPurchase, purchaseData };

export default DataServices;