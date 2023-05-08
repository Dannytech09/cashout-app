import axios from "axios";
import authHeader from "./auth-Header";
import { getToken } from "@/Utils/Common";

const API_DATA = "http://localhost:4000/"
const API_PURCHASEDATA = "http://localhost:4000/purchase/";

// Get Current Data Prices
const getAllDataInfo = () => {
    return axios.get(API_DATA + "buyData", { headers: authHeader()})
}

// Update Data Prices
const setDataPrices = () => {
    return axios.put(API_DATA + "update-price", { headers: authHeader()})
}

// Get all data purchased
const getAllDataPurchase = () => {
    return axios.get(API_DATA + "getAllDataPurchase", { headers: authHeader()})
}

// Purchase Data
const purchaseData = () => {
    return axios.post(`API_PURCHASEDATA ${userId}`, { headers: authHeader()})
}

const DataServices = { getAllDataInfo, setDataPrices, getAllDataPurchase, purchaseData };

export default DataServices;