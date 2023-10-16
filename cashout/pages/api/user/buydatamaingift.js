import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
// import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/pay`;
// const user = getUser();
//  const id = user ? user.id : null;

export async function buyDataGetMainGiftHandler() {
  
    try {
        const response = await axios.get(`${BASE_URL}/getData`);
        // console.log(response)
       return response.data
      } catch (error) {
        // console.log(error)
        return error.response.data;
      }
}

export async function buyDataMainGiftHandler(ctx, network, dataVol, phoneNumber) {
  const { token, userId } = getUserIdAndToken(ctx);

    try {
        const response = await axios.post(
          `${BASE_URL}/${userId}/purchase`,
          { network, dataVol, phoneNumber },
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