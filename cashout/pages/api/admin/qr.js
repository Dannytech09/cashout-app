import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;


export async function QrGetHandler(ctx) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(
      `${ADMIN_BASE_URL}/qr`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(response)
    return response.data;
  } catch (error) {
    // console.log(error.response.data)
    return error.response.data;
  }
}

export async function QrGenerateHandler(ctx) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(
      `${ADMIN_BASE_URL}/gqr`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(response)
    return response.data;
  } catch (error) {
    // console.log(error.response.data)
    return error.response.data;
  }
}
