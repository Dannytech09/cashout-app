import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

export async function LockEduHandler(ctx,  visibility, type) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/admin/lock-edu`,
      {
        visibility,
        type,
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
