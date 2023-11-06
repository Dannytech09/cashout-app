import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
// import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/referral`;
// const user = getUser();
//  const id = user ? user.id : null;

export async function upgradeMeHandler(ctx) {
  const { token, userId } = getUserIdAndToken(ctx);

  try {
    const response = await axios.post(
      `${BASE_URL}/${userId}/upgrade`,
      {},
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

export async function referralInfoHandler(ctx) {
  const { token, userId } = getUserIdAndToken(ctx);

  try {
    const response = await axios.get(`${BASE_URL}/${userId}/getReferrals`, {
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

export async function walletwithdrawalBonusHandler(
  ctx,
  withdrawal_method,
  amount
) {
  const { token, userId } = getUserIdAndToken(ctx);

  try {
    const response = await axios.post(
      `${BASE_URL}/${userId}/referralBonus`,
      { withdrawal_method, amount },
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

export async function bankwithdrawalBonusHandler(
  ctx,
  withdrawal_method,
  amount,
  credit_bank,
  account_number
) {
  const { token, userId } = getUserIdAndToken(ctx);

  try {
    const response = await axios.post(
      `${BASE_URL}/${userId}/referralBonus`,
      { withdrawal_method, amount, credit_bank, account_number },
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
