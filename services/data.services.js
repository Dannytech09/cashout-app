import axios from "axios";
import authHeader from "./auth-Header";
import API_BASE_URL from "@/apiConfig";

const BASE_URL = `${API_BASE_URL}/pay`;
const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;

// Get Current Data Prices
const getAllDataInfo = () => {
  return axios.get(`${BASE_URL}/getData`, { headers: authHeader() });
};

// Purchase Data
const purchaseData = () => {
  return axios.post(`${BASE_URL}/${userId}/purchase`, {
    headers: authHeader(),
  });
};

// Update Data Prices
const setDataPrices = () => {
  return axios.put(`${ADMIN_BASE_URL}/price/update-price`, {
    headers: authHeader(),
  });
};

// Get all data purchased
const getAllDataPurchase = () => {
  return axios.get(`${ADMIN_BASE_URL}/purchases/getAllDataPurchase`, {
    headers: authHeader(),
  });
};

const DataServices = {
  getAllDataInfo,
  setDataPrices,
  getAllDataPurchase,
  purchaseData,
};

export default DataServices;
