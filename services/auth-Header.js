export default function authHeader() {
  let user;
  let token;
  
  if(typeof window !== "undefined") {
    user = JSON.parse(sessionStorage.getItem("user"));
    token = sessionStorage.getItem("token");

  }

  if (user && token) {
    //   console.log(token)
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}
