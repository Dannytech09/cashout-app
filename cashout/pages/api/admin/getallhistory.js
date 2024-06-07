import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const ADMIN_BASE_URL = `${API_BASE_URL}/admin/purchases`;

// SS
export async function resolveTranx(ctx, selectedUser, selectedId) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(
      `${ADMIN_BASE_URL}/${selectedUser}/resolve-tranx?purchaseId=${selectedId}`,
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

export async function reverseTranx(ctx, selectedUser, selectedId) {
  const { token } = getUserIdAndToken(ctx);
  try {
    const response = await axios.get(
      `${ADMIN_BASE_URL}/${selectedUser}/reverse-tranx?purchaseId=${selectedId}`,
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