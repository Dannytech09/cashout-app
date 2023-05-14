import axios from "axios";
import { setUserSession, removeUserSession } from "../Utils/Common";
import authHeader from "./auth-Header";
import { setCookie } from "nookies";
import { destroyCookie } from 'nookies';
import API_BASE_URL from "@/apiConfig";


// Register Auth
const signUp = (
  firstName,
  lastName,
  phoneNumber,
  username,
  email,
  password
) => {
  return axios.post(`${API_BASE_URL}/register`, {
    firstName,
    lastName,
    phoneNumber,
    username,
    email,
    password,
  }).then((response) => {
    if (response?.data.token) {
    setUserSession(response.data.token, JSON.stringify(response.data.user));
  }
})
};

// Login Auth
const signIn = (email, password) => {
  return axios
    .post(`${API_BASE_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
     if(response?.data.user.isAdmin === false && typeof window !== 'undefined') {
      setUserSession(response.data.token, JSON.stringify(response.data.user));
      //  // set the token cookie with a max age of 30 days
      //  setCookie(null, "token", response.data.token, {
      //   maxAge: 30 * 24 * 60 * 60,
      //   path: "/",
      // });
      // // console.log(document.cookie);

      // // set the user cookie with a max age of 30 days
      // setCookie(null, "user", JSON.stringify(response.data.user), {
      //   maxAge: 30 * 24 * 60 * 60,
      //   path: "/",
      // });
     } else {
      return null;
     }
    })
};


// Login Auth admin
const signInAdmin = (email, password) => {
  return axios
    .post(`${API_BASE_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
     if(response?.data.user.isAdmin === true) {
      setUserSession(response.data.token, JSON.stringify(response.data.user));
     } else {
      return alert("Only Admin can have access", null)
     }
    })
};

// Get User's Details
const getLoggedInUser = () => {
  return axios.get(`${API_BASE_URL}/me`, { headers: authHeader()})
};


// Logout Auth
const logout = async () => {
  try {
    await axios.get(`${API_BASE_URL}/logout`);
  } catch (error) {
    console.log(error);
  }
  removeUserSession();
  if(typeof window !== 'undefined') {
    destroyCookie(null, "token");
    destroyCookie(null, "user");
  }
  // console.log(document.cookie);

};

const AuthService = { signUp, signIn, getLoggedInUser, logout, signInAdmin };

export default AuthService;
