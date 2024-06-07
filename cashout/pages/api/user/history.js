import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
// import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}`;
// const user = getUser();
//  const id = user ? user.id : null;

export async function allMyPurchasesHandler(ctx) {
  const { token, userId } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(
      `${BASE_URL}/${userId}/getSingleUserPurchases`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response)
    return response.data.data;
  } catch (error) {
    // console.log(error)
    return error.response.data;
  }
}

export async function searchPurchases(ctx, phoneNumber) {
  const { token, userId } = getUserIdAndToken(ctx);

  try {
    const response = await axios.get(
      `${BASE_URL}/${userId}/search?phoneNumber=${phoneNumber}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success === true) {
      // console.log(response.data)
      return response.data.data;
    } else {
      console.log("err");
    }
  } catch (error) {
    // console.error('Error fetching data:', error);
    return error.response.data;
  }
}
