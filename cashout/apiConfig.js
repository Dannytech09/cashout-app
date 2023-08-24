const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:4000"
    : "http://localhost:4000";

export default API_BASE_URL;
