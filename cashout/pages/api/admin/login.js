import API_BASE_URL from "@/apiConfig";
import axios from "axios";

const BASE_URL = `${API_BASE_URL}/auth/admin/wonders`;

export async function ALoginHandler(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    // console.log(response);
    return response;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
}