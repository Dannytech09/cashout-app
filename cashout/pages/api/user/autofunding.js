const axios = require("axios");
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/api/v1`;
const user = getUser();
 const id = user ? user.id : null;

// get req
export async function getAutoFundingAcctHandler(ctx) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const header = { Authorization: `Bearer ${token}` };

    const response = await axios.get(`${BASE_URL}/acctNumber/${id}`, {
      headers: header,
    });
    // console.log(response)
    return response.data;
  } catch (error) {
    // console.log(error)
    return error.response.data;
  }
}

// post req
export async function autoFundingHandler(ctx) {
  const { token } = getUserIdAndToken(ctx);

  try {
    const response = await axios.post(
      `${BASE_URL}/autoFunding/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
}
