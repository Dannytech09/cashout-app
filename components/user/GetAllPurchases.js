import React from "react";
import Footer from "../user/Footer";

function MyPurchases({ myPurchases, checkTransaction }) {
  return (
    <div className="relative">
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-sm">
          All My Purchases
        </h1>
      </div>
      <div className="mt-[3ch]">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {myPurchases.map((item) => (
            <div
              key={item._id}
              className="bg-white p-3 ml-5 mr-5  rounded-lg shadow-md mb-1 mt-3"
            >
              <p className="text-gray-700 text-[1.1ch]">
                Network: {item.network}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                Data Volume: {item.data_volume}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                Phone Number: {item.phone_number}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                Message: {item.message}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                Amount: {item.amount}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                Prev Bal: {item.prevBal}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                Post Bal: {item.postBal}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                Tracking ID: {item.transaction_id}
              </p>
              <p className="text-blue-700 text-[1.1ch] font-extrabold">
                Status: {item.transaction_status}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                {" "}
                Date:{" "}
                {new Date(item.timestamp).toLocaleString("en-NG", {
                  timeZone: "Africa/Lagos",
                })}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          {checkTransaction
            ? "Ohh.. No Transaction performed yet !"
            : null}
        </div>
      </div>
      {/* <div className="fixed bottom-0 left-0 right-0"> */}
      <Footer />
      {/* </div> */}
    </div>
  );
}

export default MyPurchases;
