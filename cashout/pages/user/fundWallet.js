
import React, { useState, useEffect } from "react";
import Card from "@/components/utils/Card";
import WalletIcon from "@/components/heroIcons/WalletIcon";
const axios = require("axios");
import API_BASE_URL from "@/apiConfig";
import withAuth from "../../hocs/withAuth";

const BASE_URL = `${API_BASE_URL}/api/v1`;

const FundWallet = () => {
  const [data, setData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = () => {
    fetchData();
    setButtonClicked(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("buttonClicked", "true");
    }
  };

  const fetchData = async () => {
    setIsFetching(true);

    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const token = sessionStorage.getItem("token") || null;
      const id = user._id;
      const header = { Authorization: `Bearer ${token}` };

      const response = await axios.post(`${BASE_URL}/autoFunding/${id}`, null, {
        headers: header,
      });
      setPostData(response.data.data.result);
      // console.log(response.data.data.result)
    } catch (error) {
      // console.log(error);
      setError(true);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedButtonClicked = localStorage.getItem("buttonClicked");
      if (storedButtonClicked === "true") {
        setButtonClicked(true);
      }
    }
  }, []);

  // get acct
  const fetchOnLogin = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const token = sessionStorage.getItem("token") || null;
      const id = user._id;
      const header = { Authorization: `Bearer ${token}` };

      const response = await axios.get(`${BASE_URL}/acctNumber/${id}`, {
        headers: header,
      });
      setData(response.data.data);
      // console.log(response.data.data)
    } catch (error) {
      // console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchOnLogin();
  }, []);

  return (
    // <div className="h-full">
    <Card className="overflow-y-auto fixed inset-0 bg-black max-sm:flex-col text-center z-60 flex p-4 justify-between border-red-300">
   <div className="max-w-screen-sm p-4 border-red-300">

      <h3 className="text-white p-3">* Auto Funding By Transfer</h3>
      <p className="mb-6 p-3 text-white text-xs text-center border border-green-400 bg-gray-400">Transfer Made to any of these bank account will credit your wallet once the receiving bank gets value. This works like normal bank transfer. No need to panic when you experience some slight delay atimes. Your money will be credited instantly once the receiving bank gets value </p>
     </div>
     <div className="sm:mb-80">
      {!buttonClicked && (
        <div className="flex justify-center hover:bg-blue-600 hover:border-blue-600 max-sm:w-[5ch] p-1.5 h-[3ch] mb-5 bg-green-400 border-2 max-sm:mt-[-2ch] border-green-200 rounded-2xl w-[10%]">
          <button className="" onClick={handleClick}>
            {" "}
            <p className="text-[.7ch] hover:text-white hover:text-extrabold text-black text-bold">
              Get Acct
            </p>
          </button>
        </div>
      )}

      {error && (
        <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600">
          You can&apos;t generate more than one account number. Kindly contact
          support.
        </p>
      )}
      {buttonClicked && isFetching ? (
        <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-green-700">
          Loading...
        </p>
      ) : null}
     <div className="flex gap-5 mb-5 p-3 border-slate-200 text-center max-sm:w-full h-[15ch] lg:h-[25ch] lg:w-[20ch] bg-slate-400 border-2 max-sm:mt-[-2ch] rounded-2xl w-[30]">
        <span className="fill-blue-900 h-7 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600">
          <WalletIcon />
        </span>
        {postData ? (
          <div className="flex gap-8 md:flex-col p-3">
            {" "}
            <div className="">
              <span className="text-xs ">{postData[0]?.bankName}</span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Number: {postData[0]?.accountNumber}
              </span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Name: {postData[0]?.accountName}
              </span>
            </div>
          </div>
        ) : data ? (
          <div className="">
            <div className="flex text-[.9ch] text-center w-full justify-center overflow-hidden p-2 text-red-500">
              Transfer made to this acct will credit your wallet automatically
            </div>
          <div className="flex gap-6 md:flex-col p-2 ml-[-2ch]">
            <div className="">
              <span className="text-xs ">{data[0]?.banks[0]?.bank_name}</span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Number: {data[0]?.banks[0].account_number[0]}
              </span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Name: {data[0]?.account_name}
              </span>
            </div>
          </div>
          </div>
        ) : (
          <p className="text-xs lg:text-sm text-center text-white my-auto justify-center">
            We are available to generate your unique auto-funding by transfer
            wallet account number. Kindly use the get acct number to get started
          </p>
        )}
      </div>
      <div className="flex gap-5 mb-5 p-3 border-slate-200 text-center max-sm:w-full h-[15ch] lg:h-[25ch] lg:w-[20ch] bg-slate-400 border-2 max-sm:mt-[-2ch] rounded-2xl w-[30]">
        <span className="fill-blue-900 h-7 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600">
          <WalletIcon />
        </span>
        {postData ? (
          <div className="flex gap-8 md:flex-col p-3">
            <div className="">
              <span className="text-xs ">{postData[1]?.bankName}</span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Number: {postData[1]?.accountNumber}
              </span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Name: {postData[1]?.accountName}
              </span>
            </div>
          </div>
        ) : data ? (
          <div>
            <div className="flex text-[.9ch] text-center w-full justify-center overflow-hidden p-2 text-red-500">
            Transfer made to this acct will credit your wallet automatically
            </div>
          <div className="flex gap-6 md:flex-col p-2 ml-[-2ch]">
            <div className="">
              <span className="text-xs">{data[0]?.banks[1].bank_name}</span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Number: {data[0]?.banks[1].account_number[0]}
              </span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Name: {data[0]?.account_name}
              </span>
            </div>
          </div>
          </div>
        ) : (
          <p className="text-xs lg:text-sm  text-center text-white my-auto justify-center">
            We are available to generate your unique auto-funding by transfer
            wallet account number. Kindly use the get acct number to get started
          </p>
        )}
      </div>
      <div className="flex gap-5 mb-5 p-3 border-slate-200 text-center max-sm:w-full h-[15ch] lg:h-[25ch] lg:w-[20ch] bg-slate-400 border-2 max-sm:mt-[-2ch] rounded-2xl w-[30]">
        <span className="fill-blue-900 h-7 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600">
          <WalletIcon />
        </span>
        {postData ? (
            <div className="flex gap-8 md:flex-col p-3">
            <div className="">
              <span className="text-xs ">{postData[2]?.bankName}</span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Number: {postData[2]?.accountNumber}
              </span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Name: {postData[2]?.accountName}
              </span>
            </div>
          </div>
        ) : data ? (
          <div>
            <div className="flex text-[.9ch] text-center w-full justify-center overflow-hidden p-2 text-red-500">
            Transfer made to this acct will credit your wallet automatically
            </div>
          <div className="flex gap-6 md:flex-col p-2 ml-[-2ch]">
            <div className="">
              <span className="text-xs">{data[0]?.banks[2].bank_name}</span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Number: {data[0]?.banks[2].account_number[0]}
              </span>
            </div>
            <div className="">
              <span className="text-xs">
                Acct Name: {data[0]?.account_name}
              </span>
            </div>
          </div>
          </div>
        ) : (
          <p className="text-xs lg:text-sm  text-center text-white my-auto justify-center">
            We are available to generate your unique auto-funding by transfer
            wallet account number. Kindly use the get acct number to get started
          </p>
        )}
      </div>
      </div>
          {/* <div className="bg-black text-white h-screen w-screen "> */}
      <div className="p-2 sm:mt-[-20ch] lg:mt-0">
        <div className="text-center w-screen">
        <h3 className="text-white p-3">
            * Manual Funding
          </h3>
        </div>
        <div className="mt-4 ">
          <p className="text-yellow-700 p-2 text-sm">
            <span className="text-blue-400"> Manual Funding:</span> Involves
            sending money to any of the below accounts and sending payment proof
            to us on whatsapp <span className="text-green-300">OR</span> using
            the notification link below just once. Upon sending us web
            notification, kindly exercise patience for confirmation of your
            money. You only get credited when we confirm payment.
          </p>
          <p className="text-center mt-2 text-white">
            Account Name: Adebola Daniel Juwon
          </p>
          <ul className="text-center ">
            <div className="border-blue-400 w-screen p-5 m-3 bg-blue-400 text-white">
              <li>Opay - 9066560771</li>
              <li>Kuda - 1101725915</li>
              <li>GTB - 0449785257</li>
              <li>Zenith Bank - 2209469444</li>
              <li>Access Bank - 1415440070</li>
            </div>
          </ul>
        </div>
        <form>
          <div className="text-center text-xs">
            <p>
              Please send us a notification through the below form after payment
              is made. If we verify that no payment was made before using this
              form below, it may lead to temporary suspension of the owner&apos;s
              account. Thanks.
            </p>
            <p className="text-red-500 p-4 m4">form coming soon...</p>
          </div>
        </form>
      </div>
    
    </Card>
    // </div>
  );
}

export default withAuth(FundWallet);





// import React from "react";
// import Layout from "../../components/user/Layout";
// import withAuth from "../../hocs/withAuth";

// const fundWallet = () => {
//   return (
    // <div className="bg-black text-white h-screen w-screen ">
    //   <div className="p-2 m2">
    //     <div className="text-center w-screen">
    //       <p className="text-lg border border-blue-400 bg-blue-400 ">
    //         Auto Funding by Transfer and Manual Funding
    //       </p>
    //     </div>
    //     <div className="mt-4 ">
    //       <p className="text-yellow-700 p-2 text-sm">
    //         <span className="text-blue-400"> Manual Funding:</span> Involves
    //         sending money to any of the below accounts and sending payment proof
    //         to us on whatsapp <span className="text-green-300">OR</span> using
    //         the notification link below just once. Upon sending us web
    //         notification, kindly exercise patience for confirmation of your
    //         money. You only get credited when we confirm payment.
    //       </p>
    //       <p className="text-yellow-700 p-2 text-sm">
    //         {" "}
    //         <span className="text-blue-400">Auto-Funding:</span> As the name
    //         implies, means auto credit of your wallet once the receiving bank
    //         gets value. It works like normal bank transfer so no need to panic.
    //         Kindly copy the account number on your dashboard, goto your mobile
    //         banking app or wallet and make payment to the account number{" "}
    //       </p>
    //       <p className="text-center mt-2 text-white">
    //         Account Name: Adebola Daniel Juwon
    //       </p>
    //       <ul className="text-center ">
    //         <div className="border-blue-400 w-screen p-5 m-3 bg-blue-400 text-white">
    //           <li>Opay - 9066560771</li>
    //           <li>Kuda - 1101725915</li>
    //           <li>GTB - 0449785257</li>
    //           <li>Zenith Bank - 2209469444</li>
    //           <li>Access Bank - 1415440070</li>
    //         </div>
    //       </ul>
    //     </div>
    //     <form>
    //       <div className="text-center text-xs">
    //         <p>
    //           Please send us a notification through the below form after payment
    //           is made. If we verify that no payment was made before using this
    //           form below, it may lead to temporary suspension of the owner&apos;s
    //           account. Thanks.
    //         </p>
    //         <p className="text-red-500 p-4 m4">form coming soon...</p>
    //       </div>
    //     </form>
    //   </div>
    // </div>
//   );
// };

// export default withAuth(fundWallet);

