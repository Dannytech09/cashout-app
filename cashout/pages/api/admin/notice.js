import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const ADMIN_BASE_URL = `${API_BASE_URL}/send`;

// SS
export async function NotificationHandler(ctx, name) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.put(
      `${ADMIN_BASE_URL}/notice`,
      { name },
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
