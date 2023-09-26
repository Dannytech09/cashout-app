import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUser } from "@/Utils/Common";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/vend`;

export async function buyDataSGetHandler() {
  // const { token } = getUserIdAndToken(ctx);
  const user = getUser();
  const id = user ? user.id : null;
  try {
    const response = await axios.get(`${BASE_URL}/${id}/getDatas`
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
    );
    // console.log(response)
    return response.data;
  } catch (error) {
    // console.log(error)
    return error.response.data;
  }
}

export async function buyDataSHandler(ctx, network, dataVol, phoneNumber) {
  const { token } = getUserIdAndToken(ctx);
  const user = getUser();
  const id = user ? user.id : null;
  try {
    const response = await axios.post(
      `${BASE_URL}/${id}/purchases`,
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
