import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";


// Get tvSub price
export async function tvSubPricesHandler(ctx) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/update-tvSub`,
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

// Update tvSub prices
export async function tvSubUpdatePricesHandler(ctx, id, payload) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/admin/update-tvSub/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
