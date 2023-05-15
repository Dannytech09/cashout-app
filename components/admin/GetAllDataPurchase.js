import React from "react";
import HeadInPages from "./HeadInPages";

function DataPurchased({ allDataPurchased }) {
  return (
    <div className="relative">
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-2xl">
          All Data Purchased
        </h1>
        <HeadInPages />
      </div>
      <div className="mt-[10ch]">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {allDataPurchased.map((item) => (
            <div
              key={item._id}
              className="bg-white p-3 ml-5 mr-5  rounded-lg shadow-md mb-1 mt-3"
            >
              <p className="font-bold text-[1.1ch]">
                Transaction ID: {item._id}
              </p>
              <p className="text-gray-700 text-[1.1ch]">User ID: {item.user}</p>
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
                {" "}
                Date:{" "}
                {new Date(item.timestamp).toLocaleString("en-NG", {
                  timeZone: "Africa/Lagos",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DataPurchased;
