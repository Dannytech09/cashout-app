import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/vend`;
const user = getUser();
 const id = user ? user.id : null;

export async function buyDataGetHandler() {
    try {
        const response = await axios.get(`${BASE_URL}/${id}/getData`);
        // console.log(response)
       return response.data
      } catch (error) {
        // console.log(error)
        return error.response.data;
      }
}

export async function buyDataHandler(ctx, network, dataVol, phoneNumber) {
  const { token } = getUserIdAndToken(ctx);

    try {
        const response = await axios.post(
          `${BASE_URL}/${id}/purchase`,
          { network: network, plan_code: dataVol, mobile: phoneNumber },
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
