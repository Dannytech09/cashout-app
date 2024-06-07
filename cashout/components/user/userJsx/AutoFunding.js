import React from "react";
import WalletIcon from "@/components/heroIcons/WalletIcon";

export default function AutoFunding({
  data,
  postData,
  isFetching,
  buttonClicked,
  errorMessage,
  successMessage,
  handleClick,
}) {
  return (
    <div>
      <div className="max-w-screen-sm p-4 border-red-300">
        <h3 className="text-white p-3">* Auto Funding By Transfer Option</h3>
        <p className="mb-6 p-3 text-white text-xs text-center border border-green-400 bg-gray-400">
          Transfer Made to any of these bank account will credit your wallet
          once the receiving bank gets value. This works like normal bank
          transfer. No need to panic when you experience some slight delay
          atimes. Your money will be credited instantly once the receiving bank
          gets value{" "}
        </p>
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

        {errorMessage && (
          <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-green-600">
            {successMessage}
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
                  <span className="text-xs ">
                    {data[0]?.banks[0]?.bank_name}
                  </span>
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
              wallet account number. Kindly use the get acct number to get
              started
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
              wallet account number. Kindly use the get acct number to get
              started
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
              wallet account number. Kindly use the get acct number to get
              started
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
