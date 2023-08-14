import API_BASE_URL from "@/apiConfig";
import authHeader from "@/services/auth-Header";
import axios from "axios";

const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;

// 1
export async function SetPricesHandler(variation_string, data) {
  try {
    const response = await axios.patch(
      `${ADMIN_BASE_URL}/update-dataCoupon`,
      { variation_string, data },
      {
        headers: authHeader(),
      }
    );

    // console.log(response)
    return response.data;
  } catch (error) {
    // console.log(error.response.data)
    return error.response.data;
  }
}
