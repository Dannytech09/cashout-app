import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

export async function GetSwitchHandler(ctx) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/generalLock`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.log("error l", error.response.data);
    return error.response.data;
  }
}
