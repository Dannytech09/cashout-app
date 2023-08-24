import API_BASE_URL from "@/apiConfig";
import authHeader from "@/services/auth-Header";
import axios from "axios";

// SS
export async function LockDataS(variation_string, visibility) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/admin/lock-services`,
      {
        variation_string,
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
