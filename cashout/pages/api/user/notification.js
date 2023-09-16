import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUser } from "@/Utils/Common";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/notification`;
const id = getUser();

export async function notification(ctx, bank, amount, narration) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.post(
      `${BASE_URL}/${id}`,
      {
        bank,
        amount,
        narration,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data)
    return response.data;
  } catch (error) {
    // console.log(error.response.data)
    return error.response.data;
  }
}
