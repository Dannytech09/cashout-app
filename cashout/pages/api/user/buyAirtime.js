import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/buyAirtime`;
const user = getUser();
 const id = user ? user.id : null;

export async function buyAirtimeHandler(ctx, network, phoneNumber, amount) {
    const { token } = getUserIdAndToken(ctx);
  
      try {
          const response = await axios.post(
            `${BASE_URL}/${id}`,
            { serviceID: network, phone: phoneNumber, amount: amount },
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