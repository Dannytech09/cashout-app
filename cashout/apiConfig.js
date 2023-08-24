const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://cashout-app.cyclic.app"
    : "http://localhost:4000";

export default API_BASE_URL;
