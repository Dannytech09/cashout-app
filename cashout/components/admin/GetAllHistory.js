import React from "react";
import HeadInPages from "./HeadInPages";
import SidebarAdmin from "./Sidebar-Admin";
import To12HourFormat from "../utils/Time";
import Loader from "../utils/Loader";

function AllPurchases({ error, allPurchases, loading, count, rCount }) {
  return (
    <div className="relative">
      {loading && <Loader/>}
      <div className="fixed top-0 z-40">
        <SidebarAdmin />
      </div>
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-md">
          All User&apos;s History
        </h1>
        <HeadInPages />
      </div>
      <div>{error && <p>Error: {error}</p>}</div>
      <div className="mt-[10ch]">
        { count && (

        <p className=" mx-auto mt-[11ch] text-xs p-3 mb-[-2ch]">Total Count - {count} Returned count - {rCount}</p>)
        }
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {allPurchases.map((item) => (
            <div
              key={item._id}
              className="bg-white text-[1.3ch] p-3 ml-5 mr-5 rounded-lg shadow-md mb-1 mt-3"
            >
              {/* <p className="font-bold text-[1.1ch]">
                Transaction ID: {item._id}
              </p> */}
              <p className="text-gray-700 font-bold text-[1.1ch]">
                User ID: {item.user}
              </p>
              {item.account_name && (
                <p className="text-gray-700 text-[1.1ch]">
                  Full Name:{" "}
                  <span className="font-medium">{item.account_name}</span>
                </p>
              )}
                 <p className="text-gray-700 text-[1.1ch]">
                  Email: {item.email}
                </p>
                <p className="text-gray-700 text-[1.1ch]">
                  Username: {item.username}
                </p>
                <hr className="border-1 border-black"/>
              {item.bank && (
                // <div className="flex-wrap text-[1.3ch]">
                   <p className="text-gray-700 text-[1.1ch]">
                    Bank: <span className="font-medium"> {item.bank}</span>
                  </p>
                // </div>
              )}
              {item.account_number && (
                 <p className="text-gray-700 text-[1.1ch]">
                  Account Number:{" "}
                  <span className="font-medium">{item.account_number}</span>
                </p>
              )}
              {item.paymentReference && (
                   <p className="text-gray-700 text-[1.1ch]">
                    Payment Ref:{" "}
                    <span className="font-medium">
                      {" "}
                      {item.paymentReference}
                    </span>
                  </p>
              )}
              
              <div className="flex justify-between">
                {item.product_name && (
                  <p className="text-gray-700 text-[1.1ch]">
                    Service: {item.product_name}
                  </p>
                )}
                {item.phone_number && (
                  <p className="text-gray-700 text-[1.1ch]">
                    Phone Number: {item.phone_number}
                  </p>
                )}
              </div>
              {item.unique_element && (
                <p className="text-gray-700 text-[1.1ch]">
                  Smart Card Number: {item.unique_element}
                </p>
              )}
              {item.package && (
                <p className="text-gray-700 text-[1.1ch]">
                  Package: {item.package}
                </p>
              )}
              {item.purchased_code && (
                <p className="text-gray-700 text-[1.1ch]">
                  Token: {item.purchased_code}
                </p>
              )}
              <div className="flex justify-between">
                <p className="text-blue-700 text-[1.1ch]">
                  Amount: {item.amount}
                </p>
                {item.payment_fee && (
                  // <div className="flex-wrap text-[1.3ch]">
                    <p className="text-gray-700 text-[1.1ch]">
                      Payment fee:{" "}
                      <span className="font-medium"> {item.payment_fee}</span>
                    </p>
                  // </div>
                )}
                {item.cashback && (
                  <p className="text-gray-700 text-[1.1ch]">
                    Cash Back: {item.cashback}
                  </p>
                )}
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700 text-[1.1ch]">
                  Prev Bal: {item.prevBal}
                </p>
                <p className="text-gray-700 text-[1.1ch]">
                  Post Bal: {item.postBal}
                </p>
              </div>
              {item.message && (
                <p className="text-blue-700 text-[1.1ch]">
                  Message: {item.message}
                </p>
              )}
              <p className="text-gray-700 text-[1.1ch]">
                Tracking ID: {item.transaction_id}
              </p>
              <p className="text-blue-700 text-[1.1ch]">
                Status: {item.transaction_status}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                Date: {item.timestamp ? To12HourFormat(item.timestamp) : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPurchases;
