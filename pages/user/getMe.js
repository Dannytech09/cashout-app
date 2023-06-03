// import React from 'react'
// import { parseCookies } from "nookies";
// import axios from 'axios';
// import API_BASE_URL from '@/apiConfig';

// export default function getMe(userId) {

//   return (
//     <div></div>
//   )

  
// }
//  export const getServerSideProps = async (context) => {
//     const { token, user } = parseCookies(context);

//     if (!token && !user.isAdmin === true) {
//       // Redirect to login page if token is not found
//       return {
//         redirect: {
//           destination: "/login",
//           permanent: false,
//         },
//       };
//     }
  
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/v1/auth/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const userId = res.data.user._id;
//       console.log(res.data.user._id)
  
//       return {
//         props: {
//           userId: userId || null,
//         },
//       };
//     } catch (error) {
//         // console.log(error)
//       // Redirect to login page if token is invalid or expired
//       return {
//         redirect: {
//           destination: "/login",
//           permanent: false,
//         },
//       };
//     }
//   };