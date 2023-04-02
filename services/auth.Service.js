import axios from "axios";
import { setUserSession, removeUserSession } from "../Utils/Common";

// const API_URL = "https://cashout-app.onrender.com/api/v1/auth/";
const API_URL = "http://localhost:4000/api/v1/auth/";


// Register Auth
const signUp = (
  firstName,
  lastName,
  phoneNumber,
  username,
  email,
  password
) => {
  return axios.post(API_URL + "register", {
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
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
        if (response?.data.token) {
        setUserSession(response.data.token, JSON.stringify(response.data.user));
      }
    })
};

// Get User's Details
const getLoggedInUser = () => {
  return axios.get(API_URL + 'auth/me', { headers: authHeader()})
};


// Logout Auth
const logout = () => {
  removeUserSession();
};

const AuthService = { signUp, signIn, getLoggedInUser, logout };

export default AuthService;
