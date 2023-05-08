import React from "react";
import HeadInPages from "./HeadInPages";

function DataPurchased({ allDataPurchased }) {
  return (
    <div className="relative">
      <HeadInPages />
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-5 text-gray-700">
          All Data Purchased
        </h2>
        <div className="flex flex-col">
          {allDataPurchased.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-lg shadow-md mb-5"
            >
              <p className="font-bold mb-2">Transaction ID: {item._id}</p>
              <p className="text-gray-700 mb-2">User ID: {item.user}</p>
              <p className="text-gray-700 mb-2">Network: {item.network}</p>
              <p className="text-gray-700 mb-2">
                Data Volume: {item.data_volume}
              </p>
              <p className="text-gray-700 mb-2">
                Phone Number: {item.phone_number}
              </p>
              <p className="text-gray-700 mb-2">Message: {item.message}</p>
              <p className="text-gray-700 mb-2">Amount: {item.amount}</p>
              <p className="text-gray-700 mb-2">
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
