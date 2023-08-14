import API_BASE_URL from "@/apiConfig";
import authHeader from "@/services/auth-Header";
import axios from "axios";

// 1
export async function LockCoupon(network, visibility) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/admin/lock-dataCoupon`,
      {
        network,
        visibility,
      },
      { headers: authHeader() }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error.response.data);
    return error.response.data;
  }
}
