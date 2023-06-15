// import React, { useState, useEffect } from "react";
// import Card from "../utils/Card";
// import WalletIcon from "../heroIcons/WalletIcon";
// const axios = require("axios");
// import API_BASE_URL from "@/apiConfig";

// const BASE_URL = `${API_BASE_URL}/api/v1`;

// export default function Main() {
//   const [data, setData] = useState(null);
//   const [postData, setPostData] = useState(null);
//   const [isFetching, setIsFetching] = useState(false);
//   const [buttonClicked, setButtonClicked] = useState(false);
//   const [error, setError] = useState(false);

//   const handleClick = () => {
//     fetchData();
//     setButtonClicked(true);
//     if (typeof window !== "undefined") {
//       localStorage.setItem("buttonClicked", "true");
//     }
//   };

//   const fetchData = async () => {
//     setIsFetching(true);

//     try {
//       const user = JSON.parse(sessionStorage.getItem("user"));
//       const token = sessionStorage.getItem("token") || null;
//       const id = user._id;
//       const header = { Authorization: `Bearer ${token}` };

//       const response = await axios.post(`${BASE_URL}/autoFunding/${id}`, null, {
//         headers: header,
//       });
//       setPostData(response.data.data.result);
//       // console.log(response.data.data.result)
//     } catch (error) {
//       // console.log(error);
//       setError(true);
//     }
//     setIsFetching(false);
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedButtonClicked = localStorage.getItem("buttonClicked");
//       if (storedButtonClicked === "true") {
//         setButtonClicked(true);
//       }
//     }
//   }, []);

//   // get acct
//   const fetchOnLogin = async () => {
//     try {
//       const user = JSON.parse(sessionStorage.getItem("user"));
//       const token = sessionStorage.getItem("token") || null;
//       const id = user._id;
//       const header = { Authorization: `Bearer ${token}` };

//       const response = await axios.get(`${BASE_URL}/acctNumber/${id}`, {
//         headers: header,
//       });
//       setData(response.data.data);
//       // console.log(response.data.data)
//     } catch (error) {
//       // console.log(error);
//       setError(true);
//     }
//   };

//   useEffect(() => {
//     fetchOnLogin();
//   }, []);

//   return (
//     <Card className="max-sm:flex-col max-sm:w-full text-center z-60 flex h-80 p-4 lg:mb-[-10ch] justify-between w-full">
     
//       {!buttonClicked && (
//         <div className="flex justify-center hover:bg-blue-600 hover:border-blue-600 max-sm:w-[5ch] p-1.5 h-[6ch] mb-5 bg-green-400 border-2 max-sm:mt-[-2ch] border-green-200 rounded-2xl w-[20%]">
//           <button className="" onClick={handleClick}>
//             {" "}
//             <p className="text-[.7ch] hover:text-white hover:text-extrabold text-black text-bold">
//               Get Acct
//             </p>
//           </button>
//         </div>
//       )}

//       {error && (
//         <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600">
//           You can&apos;t generate more than one account number. Kindly contact
//           support.
//         </p>
//       )}
//       {buttonClicked && isFetching ? (
//         <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-green-700">
//           Loading...
//         </p>
//       ) : null}
//       <div className="flex gap-5 pr-4 border-slate-200 text-center max-sm:w-full h-[20ch] bg-slate-400 border-2 max-sm:mt-[-2ch] rounded-2xl w-[30%]">
//         <span className="fill-blue-900 h-7 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600">
//           <WalletIcon />
//         </span>
//         {postData ? (
//           <div className="flex gap-8 md:flex-col p-3">
//             {" "}
//             <div className="">
//               <span className="text-xs ">{postData[0]?.bankName}</span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Number: {postData[0]?.accountNumber}
//               </span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Name: {postData[0]?.accountName}
//               </span>
//             </div>
//           </div>
//         ) : data ? (
//           <div>
//             <div className="flex text-[.9ch] text-center w-full justify-center overflow-hidden p-2 text-red-500">
//               Transfer made to this acct will credit your wallet automatically
//             </div>
//           <div className="flex gap-6 md:flex-col p-2 ml-[-2ch]">
//             <div className="">
//               <span className="text-xs ">{data[0]?.banks[0]?.bank_name}</span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Number: {data[0]?.banks[0].account_number[0]}
//               </span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Name: {data[0]?.account_name}
//               </span>
//             </div>
//           </div>
//           </div>
//         ) : (
//           <p className="text-xs lg:text-sm text-center text-white my-auto justify-center">
//             We are available to generate your unique auto-funding by transfer
//             wallet account number. Kindly use the get acct number to get started
//           </p>
//         )}
//       </div>
//       <div className="flex gap-5 pr-4 border-slate-200 max-sm:w-full h-[20ch] mt-[0ch] bg-slate-400 border-2 rounded-2xl w-[30%]">
//         <span className="fill-blue-900 h-7 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600">
//           <WalletIcon />
//         </span>
//         {postData ? (
//           <div className="flex gap-8 md:flex-col p-3">
//             <div className="">
//               <span className="text-xs ">{postData[1]?.bankName}</span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Number: {postData[1]?.accountNumber}
//               </span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Name: {postData[1]?.accountName}
//               </span>
//             </div>
//           </div>
//         ) : data ? (
//           <div>
//             <div className="flex text-[.9ch] text-center w-full justify-center overflow-hidden p-2 text-red-500">
//             Transfer made to this acct will credit your wallet automatically
//             </div>
//           <div className="flex gap-6 md:flex-col p-2 ml-[-2ch]">
//             <div className="">
//               <span className="text-xs">{data[0]?.banks[1].bank_name}</span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Number: {data[0]?.banks[1].account_number[0]}
//               </span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Name: {data[0]?.account_name}
//               </span>
//             </div>
//           </div>
//           </div>
//         ) : (
//           <p className="text-xs lg:text-sm  text-center text-white my-auto justify-center">
//             We are available to generate your unique auto-funding by transfer
//             wallet account number. Kindly use the get acct number to get started
//           </p>
//         )}
//       </div>
//       <div className="flex gap-5 pr-4 border-slate-200 max-sm:w-full h-[20ch] mt-[0ch] bg-slate-400 border-2 rounded-2xl w-[30%]">
//         <span className="fill-blue-900 h-7 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600">
//           <WalletIcon />
//         </span>
//         {postData ? (
//             <div className="flex gap-8 md:flex-col p-3">
//             <div className="">
//               <span className="text-xs ">{postData[2]?.bankName}</span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Number: {postData[2]?.accountNumber}
//               </span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Name: {postData[2]?.accountName}
//               </span>
//             </div>
//           </div>
//         ) : data ? (
//           <div>
//             <div className="flex text-[.9ch] text-center w-full justify-center overflow-hidden p-2 text-red-500">
//             Transfer made to this acct will credit your wallet automatically
//             </div>
//           <div className="flex gap-6 md:flex-col p-2 ml-[-2ch]">
//             <div className="">
//               <span className="text-xs">{data[0]?.banks[2].bank_name}</span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Number: {data[0]?.banks[2].account_number[0]}
//               </span>
//             </div>
//             <div className="">
//               <span className="text-xs">
//                 Acct Name: {data[0]?.account_name}
//               </span>
//             </div>
//           </div>
//           </div>
//         ) : (
//           <p className="text-xs lg:text-sm  text-center text-white my-auto justify-center">
//             We are available to generate your unique auto-funding by transfer
//             wallet account number. Kindly use the get acct number to get started
//           </p>
//         )}
//       </div>
//     </Card>
//   );
// }
