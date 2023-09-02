import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import authHeader from "@/services/auth-Header";
import { getUser } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/vend`;
let user;
let id;

export async function getCoupon() {
  user = getUser();
  id = user._id;
  try {
    const response = await axios.get(`${BASE_URL}/${id}/directCoupon`);
    return response.data;
  } catch (error) {
    if (error.response.data.code === "005") {
      return error.response.data;
    }
    throw new Error("An error occurred.");
  }
}

export async function directCoupon(network_id, plan_code, mobile) {
  user = getUser();
  id = user._id;
  try {
    const response = await axios.post(
      `${BASE_URL}/${id}/directCoupon`,
      {
        network_id,
        plan_code,
        mobile,
      },
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    // console.log(error);
    if (error.response.data.code === "017") {
      return error.response.data;
    } else if (error.response.data.code === "001") {
      return error.response.data;
    } else if (error.response.data.code === "013") {
      return error.response.data;
    } else if (error.response.data.code === "005") {
      return error.response.data;
    } else if (error.response.data.code === "003") {
      return error.response.data;
    } else if (error.response.data.error) {
      return error.response.data;
    } else if (error.response.data.code === "011") {
      return error.response.data;
    } else if (error.response.data.code === "011") {
      return error.response.data;
    } else if (error.response.data.code === "010") {
      return error.response.data;
    } else if (error.response.data.code === "006") {
      return error.response.data;
    } else if (error.response.data.code === "008") {
      return error.response.data;
    }
    throw new Error("An error occurred.");
  }
}
