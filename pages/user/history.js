import React from "react";
import withAuth from "../../hocs/withAuth";
import Link from "next/link";
import Sidebar from "@/components/user/Sidebar";

// This page is being routed to different pages
function history() {
   return (
    <>
    <Sidebar/>
    <div className="bg-black h-screen flex flex-col text-center gap-4 p-4">
      <div className="border rounded-md bg-blue-100 p-4">
        <Link href={"/user/getDataAirtimePurchases"} className="text-gray-600 hover:text-gray-800 font-medium">
        Data and Airtime History
        </Link>
      </div>
     
      <div className="border text-center rounded-md bg-yellow-100 p-4">
        <Link href={"/user/getCableTvHistories"} className="text-gray-600 hover:text-gray-800 font-medium">
          Cable and Tv History
        </Link>
      </div>
    </div>
    </>
  );
}

export default withAuth(history);