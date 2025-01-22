import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/api/v1/users`;

export async function BlockUserHandler(ctx, id, blocked) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.patch(
      `${BASE_URL}/${id}`,
      {
        id,
        blocked,
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
