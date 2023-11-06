import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
// import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/admin`;
// const user = getUser();
//  const id = user ? user.id : null;

export async function allReferralsAHandler(ctx) {
  const { token } = getUserIdAndToken(ctx);

  try {
    const response = await axios.get(
      `${BASE_URL}/allReferrals`,
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

export async function referralInfoAHandler(ctx, id) {
  const { token } = getUserIdAndToken(ctx);

  try {
    const response = await axios.get(`${BASE_URL}/${id}/referralsInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    // console.log(error.response.data)
    return error.response.data;
  }
}