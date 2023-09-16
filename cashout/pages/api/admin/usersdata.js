import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/api/v1`

export async function getUsersHandler(ctx) {
    const { token } = getUserIdAndToken(ctx)
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        // console.log(response.data)
       return response;
      } catch (error) {
        // console.log(error.response)
        return error.response;
      }
}