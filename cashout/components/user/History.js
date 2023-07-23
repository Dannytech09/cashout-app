import React from "react";
import SubFooter from "./SubFooter";
import Sidebar from "./Sidebar";
import To12HourFormat from "../utils/Time";
import Loader from "../utils/Loader";

function MyPurchases({ myPurchases, checkTransaction, loading }) {
  return (
    <div className="relative">
      {loading && <Loader/>}
      <div className="fixed top-1 z-40">
        <Sidebar />
      </div>
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-sm">
          Transaction History
        </h1>
      </div>
      <div className="mt-[4ch] bg-black">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {myPurchases.map((item) => (
            <div
              key={item._id}
              className="bg-white p-3 ml-5 mr-5  rounded-lg shadow-md mb-1 mt-3"
            >
              {item.account_name && (
                <p className="text-gray-700 text-[1.1ch]">
                  Account Holder: {item.account_name}
                </p>
              )}
              {item.product_name && (
                <p className="text-gray-700 text-[1.1ch]">
                  Service: {item.product_name}
                </p>
              )}
              {item.package && (
                <p className="text-gray-700 text-[1.1ch]">
                  Package: {item.package}
                </p>
              )}
              {item.unique_element && (
                <p className="text-gray-700 text-[1.1ch]">
                  Smart Card Number: {item.unique_element}
                </p>
              )}
              {item.phone_number && (
                <p className="text-gray-700 text-[1.1ch]">
                  Phone Number: {item.phone_number}
                </p>
              )}
              {item.account_number && (
                <p className="text-gray-700 text-[1.1ch]">
                  Account Number: {item.account_number}
                </p>
              )}
              {item.bank && (
                <p className="text-gray-700 text-[1.1ch]">
                  Bank Name: {item.bank}
                </p>
              )}
              {item.paymentReference && (
                <p className="text-gray-700 text-[1.1ch]">
                  Payment Reference: {item.paymentReference}
                </p>
              )}
              <p className="text-gray-700 text-[1.1ch]">
                Amount: {item.amount}
              </p>
              {item.payment_fee && (
                <p className="text-gray-700 text-[1.1ch]">
                  Processing Fee: {item.payment_fee}
                </p>
              )}
              {item.cashback && (
                <p className="text-gray-700 text-[1.1ch]">
                  Cash Back: {item.cashback}
                </p>
              )}
              {item.purchased_code && (
                <p className="text-gray-700 text-[1.1ch]">
                  Token: {item.purchased_code}
                </p>
              )}
              <div className="flex justify-between">
                <p className="text-gray-700 text-[1.1ch]">
                  Prev Bal: {item.prevBal}
                </p>
                <p className="text-gray-700 text-[1.1ch]">
                  Post Bal: {item.postBal}
                </p>
              </div>
              {item.message && (
                <p className="text-gray-700 text-[1.1ch]">
                  Message: {item.message}
                </p>
              )}
              <p className="text-gray-700 text-[1.1ch]">
                Tracking ID: {item.transaction_id}
              </p>
              <p className="text-blue-700 text-[1.1ch] font-extrabold">
                Status: {item.transaction_status}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                Date: {item.timestamp ? To12HourFormat(item.timestamp) : ""}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          {checkTransaction ? (
            <p className="mt-20 text-red-300">
              Ohh.. No Transaction performed yet !
            </p>
          ) : null}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <SubFooter />
      </div>
    </div>
  );
}

export default MyPurchases;
