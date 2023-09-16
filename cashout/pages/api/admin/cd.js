import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/api/v1/users`;

export async function updateUserBalance(
  ctx,
  email,
  amount,
  operation,
  purpose
) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.post(
      `${BASE_URL}/credit-debit`,
      {
        email,
        amount,
        operation,
        purpose,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
