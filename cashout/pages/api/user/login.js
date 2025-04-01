import API_BASE_URL from "@/apiConfig";
import axios from "axios";

const BASE_URL = `${API_BASE_URL}/api/v1/auth`;

export async function LoginHandler(email, password) {
  try {
    const response = await Promise.race([
      axios.post(`${BASE_URL}/login`, { email, password }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Server timeout")), 15000)) // 15s manual timeout
    ])
    // console.log("responsel", response);
    return response;
  } catch (error) {
    // console.log("err", error.response.data);
    return error.response.data;
  }
}

// const response = await axios.post(`${BASE_URL}/login`, {
    //   email,
    //   password,
    // });