import React from "react";
import withAuth from "../../hocs/withAuth";
import Link from "next/link";
import Sidebar from "@/components/user/Sidebar";

// This page is being routed to different pages
function FundWallet() {
  return (
    <div className="bg-gray-300 h-screen">
      <Sidebar />
      <div className="">
        <h2 className="text-center p-4 text-2xl">Wallet Funding</h2>
        <div className="border text-center rounded-lg bg-yellow-100 p-4 m-2">
          <Link
            href={"/user/auto-funding"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            AutoFunding
          </Link>
        </div>
        <div className="border text-center rounded-lg bg-green-100 p-4 m-2">
          <Link
            href={"/user/manual-funding"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Manual Funding
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withAuth(FundWallet);
