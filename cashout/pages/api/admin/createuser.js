import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/api/v1/users`;

export async function createUserHandler(
  ctx,
  firstName,
  lastName,
  phoneNumber,
  username,
  email,
  password
) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.post(
      `${BASE_URL}`,
      {
        firstName,
        lastName,
        phoneNumber,
        username,
        email,
        password,
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
