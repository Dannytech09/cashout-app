import axios from "axios";
import API_BASE_URL from "@/apiConfig";
// import { getUser } from "@/Utils/Common";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/vend`;

export async function buyEduGetHandler(ctx) {
  const { userId } = getUserIdAndToken(ctx);
  // const user = getUser();
  // const id = user ? user.id : null;
  try {
    const response = await axios.get(
      `${BASE_URL}/${userId}/eduPin`
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

export async function buyEduHandler(ctx, name, pk) {
  const { token, userId } = getUserIdAndToken(ctx);
  // const user = getUser();
  // const id = user ? user.id : null;
  try {
    const response = await axios.post(
      `${BASE_URL}/${userId}/eduPin`,
      { type: name, plan_code: pk },
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
