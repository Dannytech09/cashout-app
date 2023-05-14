/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://cashout-app.onrender.com"
        : "http://localhost:4000",
  },
};

module.exports = nextConfig;
