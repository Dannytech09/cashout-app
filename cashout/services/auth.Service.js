import axios from "axios";
import { setUserSession, removeUserSession } from "../Utils/Common";
import authHeader from "./auth-Header";
// import { setCookie } from "nookies";
// import { destroyCookie } from "nookies";
import API_BASE_URL from "@/apiConfig";

const BASE_URL = `${API_BASE_URL}/api/v1/auth`;

// Register Auth
const signUp = (
  firstName,
  lastName,
  phoneNumber,
  username,
  email,
  password
) => {
  return axios
    .post(`${BASE_URL}/register`, {
      firstName,
      lastName,
      phoneNumber,
      username,
      email,
      password,
    })
    .then((response) => {
      if (response?.data.token) {
        setUserSession(response.data.token, JSON.stringify(response.data.user));
      }
    });
};

// Login Auth
const signIn = async (email, password) => {
  return axios
    .post(`${BASE_URL}/login`, {
      email,
      password,
    })
    .then(async (response) => {
      // console.log(response);
      if (
        response?.data?.user.isAdmin === false &&
        typeof window !== "undefined"
      ) {
        setUserSession(response?.data?.token, JSON.stringify(response.data.user));
      } else {
        return null;
      }
    });
};

// Login Auth admin
const signInAdmin = (email, password) => {
  return axios
    .post(`${BASE_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response?.data.user.isAdmin === true) {
        setUserSession(response.data.token, JSON.stringify(response.data.user));
      } else {
        return alert("Only Admin can have access", null);
      }
    });
};

// Get User's Details
const getLoggedInUser = () => {
  return axios.get(`${BASE_URL}/me`, { headers: authHeader() });
};

// Logout Auth
const logout = async () => {
  try {
    await axios.get(`${BASE_URL}/logout`);
  } catch (error) {
    // console.log(error);
  }
  removeUserSession();
  // if (typeof window !== "undefined") {
  //   destroyCookie(null, "token");
  //   destroyCookie(null, "user");
  // }
  // console.log(document.cookie);
};

const AuthService = { signUp, signIn, getLoggedInUser, logout, signInAdmin };

export default AuthService;
