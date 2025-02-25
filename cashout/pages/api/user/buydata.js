import axios from "axios";
import API_BASE_URL from "@/apiConfig";
// import { getUser } from "@/Utils/Common";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/vend`;

export async function buyDataGetHandler(ctx) {
  const { token, userId } = getUserIdAndToken(ctx);
  // const user = getUser();
  // const id = user ? user.id : null;
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/getDatas`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("api", response)
    return response;
  } catch (error) {
    // console.log(error)
    return error.response.data;
  }
}

export async function buyDataHandler(ctx, network, dataVol, phoneNumber) {
  const { token, userId } = getUserIdAndToken(ctx);
  // const user = getUser();
  // const id = user ? user.id : null;
  try {
    const response = await axios.post(
      `${BASE_URL}/${userId}/purchases`,
      { network: network, variation_code: dataVol, mobile: phoneNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
