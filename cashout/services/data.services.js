import axios from "axios";
import authHeader from "./auth-Header";
import API_BASE_URL from "@/apiConfig";
import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/pay`;
const A_BASE_URL = `${API_BASE_URL}/vend`;
const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;
const BASE_Purchase = `${API_BASE_URL}`;

// Get Current Data Prices
const getAllDataInfo = () => {
  return axios.get(`${BASE_URL}/getData`, { headers: authHeader() });
};

// Get Current Prices
const getDataInfo = () => {
  return axios.get(`${A_BASE_URL}/getData`, { headers: authHeader() });
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

// Get all data purchased - restricted
const getAllPurchases = () => {
  return axios.get(`${ADMIN_BASE_URL}/purchases/getAllPurchases`, {
    headers: authHeader(),
  });
};

// Get all data purchased - restricted
const getMyPurchases = () => {
  const user = getUser();
  const id = user._id;
  return axios.get(`${BASE_Purchase}/${id}/getSingleUserPurchases`, {
    headers: authHeader(),
  });
};

// Get all data purchased - restricted
const getMyHistories = () => {
  const user = getUser();
  const id = user._id;
  return axios.get(`${BASE_Purchase}/${id}/getSingleUserHistories`, {
    headers: authHeader(),
  });
};

const DataServices = {
  getAllDataInfo,
  getDataInfo,
  setDataPrices,
  getAllPurchases,
  purchaseData,
  getMyPurchases,
  getMyHistories,
};

export default DataServices;
