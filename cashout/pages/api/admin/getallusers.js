import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const ADMIN_BASE_URL = `${API_BASE_URL}/api/v1`;

// SS
export async function getAllUsers(ctx) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(
      `${ADMIN_BASE_URL}/users?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error.response.data)
    return error.response.data;
  }
}
