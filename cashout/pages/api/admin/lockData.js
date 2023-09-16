import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

// SS
export async function LockDataHandler(ctx, visibility, variation_string) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/admin/lock-service`,
      {
        visibility,
        variation_string,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error.response.data);
    return error.response.data;
  }
}
