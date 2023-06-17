import React from "react";
import withAuth from "../../hocs/withAuth";
import Link from "next/link";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";

// This page is being routed to different pages
function dataComponent() {
  return (
    <>
      <SidebarAdmin />
      <div className="flex flex-col gap-4 p-4 text-center">
        <div className="border rounded-md bg-blue-100 p-4">
          <Link
            href={"/admin-wonders/getAllHistory"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            All History
          </Link>
        </div>
        <div className="border rounded-md bg-green-100 p-4">
          <Link
            href={"/admin-wonders/getDataPrices"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Get Current Prices - A
          </Link>
        </div>
        <div className="border rounded-md bg-yellow-100 p-4">
          <Link
            href={"/admin-wonders/setPrices"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Update Prices - A
          </Link>
        </div>
        <div className="border rounded-md bg-green-100 p-4">
          <Link
            href={"/admin-wonders/getCurrentDataPrices"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Get Current Data Prices
          </Link>
        </div>
        <div className="border rounded-md bg-yellow-100 p-4">
          <Link
            href={"/admin-wonders/setDataPrices"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Update Data Prices
          </Link>
        </div>
      </div>
    </>
  );
}

export default withAuth(dataComponent);
