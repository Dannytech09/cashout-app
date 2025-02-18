import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
// import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}`;
// const user = getUser();
//  const id = user ? user.id : null;

export async function generateKeyHandler(ctx) {
  const { userId, token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(`${BASE_URL}/generateKey/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response)
    return response.data;
  } catch (error) {
    // console.log(error)
    return error.response.data;
  }
}

// get plans
export async function plansHandler(ctx) {
  const { userId, token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(`${BASE_URL}/plans/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(response)
    return response.data;
  } catch (error) {
    // console.log(error)
    return error.response.data;
  }
}

// access req
export async function accessHandler(
  ctx,
  accessData
) {
    // console.log("accessData", accessData)
  const { userId, token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.post(
      `${BASE_URL}/access/${userId}`,
      {
        liveUrl: accessData.liveUrl,
        devUrl: accessData.devUrl,
        products: accessData.products,
        referral: accessData.referral,
        message: accessData.message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error)
    return error.response.data;
  }
}
