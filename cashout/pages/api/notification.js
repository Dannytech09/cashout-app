import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import authHeader from "@/services/auth-Header";
import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/notification`;

export async function notification(bank, amount, narration) {

    const user = getUser();
    const id = user._id;
  try {
    const response = await axios.post(
      `${BASE_URL}/${id}`,
      {
        bank,
        amount,
        narration
      },
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    if(error.response.data.code === "002") {
        return error.response.data;
    } else if(error.response.data.error) {
        return error.response.data;
    }  else if(error.response.data.code === "009") {
        return error.response.data;
    }
    throw new Error("An error occurred.");
  }
}
