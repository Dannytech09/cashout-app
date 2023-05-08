import React from "react";
import withAuth from "../../hocs/withAuth";
import Link from "next/link";

// This page is being routed to different pages
function dataComponent() {
   return (
    <div className="flex flex-col gap-4 p-4">
      <div className="border rounded-md bg-blue-100 p-4">
        <Link href={"/admin/getAllDataPurchased"} className="text-gray-600 hover:text-gray-800 font-medium">
        Data Purchase History
        </Link>
      </div>
      <div className="border rounded-md bg-green-100 p-4">
        <Link href={"/admin/getCurrentDataPrices"} className="text-gray-600 hover:text-gray-800 font-medium">
          Get Current Data Prices
        </Link>
      </div>
      <div className="border rounded-md bg-yellow-100 p-4">
        <Link href={"/admin/setDataPrices"} className="text-gray-600 hover:text-gray-800 font-medium">
          Update Data Prices
        </Link>
      </div>
    </div>
  );
}

export default (dataComponent);