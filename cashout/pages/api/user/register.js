import API_BASE_URL from "@/apiConfig";
import axios from "axios";

const BASE_URL = `${API_BASE_URL}/api/v1/auth`;

export async function registerHandler(
  firstName,
  lastName,
  phoneNumber,
  username,
  referrer,
  email,
  password
) {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      firstName,
      lastName,
      phoneNumber,
      username,
      referrer,
      email,
      password,
    });
    // console.log(response);
    return response;
  } catch (error) {
    // console.log("api", error.response.data);
    return error.response;
  }
}
