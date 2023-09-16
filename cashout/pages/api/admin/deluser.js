import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/api/v1/users`;

export async function deleteUserHandler(ctx, id) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.delete(
      `${BASE_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
}
