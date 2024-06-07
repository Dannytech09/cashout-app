import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;

// 1
export async function SetPricesHandler(ctx, accountType, variation_string, data) {
  const { token } = getUserIdAndToken(ctx);

  try {
    const response = await axios.patch(
      `${ADMIN_BASE_URL}/update-dataCoupon`,
      { accountType, variation_string, data },
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
