import React from "react";
import SubFooter from "./SubFooter";

function PaymentHistory({ data, checkTransaction }) {
  return (
    <div className="relative">
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-sm">
          Payment History
        </h1>
      </div>
      <div className="mt-[4ch] bg-black">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {data.map((item) => (
            <div
                key={item._id}
              className="bg-white p-3 ml-5 mr-5  rounded-lg shadow-md mb-1 mt-3"
            >
              <p className="text-gray-700 text-[1.1ch]">
                Account Holder: {item.account_name}
              </p>
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
                Processing Fee: {item.payment_fee}
              </p>
              <p className="text-gray-700 text-[1.1ch]">
                Amount Paid: {item.amount_payable}
              </p>
              <div className="flex justify-between">
                <p className="text-gray-700 text-[1.1ch]">
                  Prev Bal: {item.prevBal}
                </p>
                <p className="text-gray-700 text-[1.1ch]">
                  Post Bal: {item.postBal}
                </p>
              </div>
              <p className="text-gray-700 text-[1.1ch]">
                Tracking ID: {item.reference_number}
              </p>
              {item.purpose && (
                  <p className="text-gray-700 text-[1.1ch]">
                  Purpose: {item.purpose}
                </p>
              )}
              <p className="text-blue-700 text-[1.1ch] font-extrabold">
                Status: Completed
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

export default PaymentHistory;
