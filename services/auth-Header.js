export default function authHeader() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

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