import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

// 1
export async function LockCoupon(ctx, network, visibility) {
  const { token } = getUserIdAndToken(ctx);

  try {
    const response = await axios.patch(
      `${API_BASE_URL}/admin/lock-dataCoupon`,
      {
        network,
        visibility,
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
