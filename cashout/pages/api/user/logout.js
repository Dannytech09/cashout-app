import API_BASE_URL from "@/apiConfig";
import axios from "axios";
import nookies from "nookies";

const BASE_URL = `${API_BASE_URL}/api/v1/auth`;

export async function LogoutHandler(ctx) {
  try {
    const cookies = nookies.get(ctx);
    const token = cookies.token;
    // console.log(token)
    const response = await axios.get(`${BASE_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
}
