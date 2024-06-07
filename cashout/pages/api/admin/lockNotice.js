import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

// SS
export async function LockNoticeHandler(ctx,  visibility) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/send/notice`,
      {
        visibility
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
