// import { NextResponse } from "next/server";

// export default function middleware(req) {
//   const verify = req.cookies.get("token");
//   const url = req.url;

//   if (!verify && url.includes("http://localhost:3000/dashboard")) {
//     return NextResponse.redirect("http://localhost:3000/login");
//   }

//   if (verify && url == "http://localhost:3000/login") {
//     return NextResponse.rewrite("http://localhost:3000/dashboard");
//   }

// }

// export const config = {
//   matcher: '/dashboard',
// }