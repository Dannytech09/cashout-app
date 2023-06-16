// pages/api/api.js
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import authHeader from "@/services/auth-Header";

const BASE_URL = `${API_BASE_URL}/api/v1/users`;

export async function updateUserBalance(email, amount, operation, purpose) {
  try {
    const response = await axios.post(
      `${BASE_URL}/credit-debit`,
      {
        email,
        amount,
        operation,
        purpose
      },
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    if(error.response.data.code === "002") {
        return error.response.data;
    } else if(error.response.data.error) {
        return error.response.data;
    }
    throw new Error("An error occurred.");
  }
}
