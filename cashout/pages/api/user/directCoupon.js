import axios from "axios";
import API_BASE_URL from "@/apiConfig";
// import { getUser } from "@/Utils/Common";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/vend`;
// const user = getUser();
//  const id = user ? user.id : null;

export async function getCoupon(ctx) {
  const { userId } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/directCoupon`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function directCoupon(ctx, network_id, plan_code, mobile) {
  const { token, userId } = getUserIdAndToken(ctx);
  try {
    const response = await axios.post(
      `${BASE_URL}/${userId}/directCoupon`,
      {
        network_id,
        plan_code,
        mobile,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.log(error);
      return error.response.data;
  }
}
