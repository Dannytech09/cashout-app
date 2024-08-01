import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/beneficiaries`;

export async function getBeneficiary(ctx) {
  const { userId } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    // console.log("api", response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
}

export async function addBeneficiary(ctx, bName, phone, vol) {
  const { userId } = getUserIdAndToken(ctx);
  // console.log("Payload", { userId, bName, phone, vol });
  try {
    const response = await axios.post(`${BASE_URL}/${userId}`, {
      bName,
      phone,
      vol,
    });
    // console.log("api", response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
}

export async function updateBeneficiary(ctx, itemId, bName, phone, vol) {
  const { userId } = getUserIdAndToken(ctx);
  try {
    const response = await axios.patch(`${BASE_URL}/${userId}/${itemId}`, {
      bName,
      phone,
      vol,
    });
    // console.log("api", response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
}

export async function deleteBeneficiary(ctx, itemId) {
  const { userId } = getUserIdAndToken(ctx);
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}/${itemId}`);
    // console.log("api", itemId, response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
}
