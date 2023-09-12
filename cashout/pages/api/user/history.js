import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}`;
const userId = getUser();

export async function allMyPurchasesHandler(ctx) {
    const { token } = getUserIdAndToken(ctx)
    try {
        const response = await axios.get(`${BASE_URL}/${userId}/getSingleUserPurchases`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        // console.log(response)
       return response.data.data;
      } catch (error) {
        // console.log(error)
        return error.response.data;
      }
}