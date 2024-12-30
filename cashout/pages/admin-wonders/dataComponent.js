import React from "react";
import Link from "next/link";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import { adminAuthGuard } from "@/Utils/authGuard";
import { useRouter } from "next/router";
import { getUserIdAndToken } from "@/Utils/authCookies";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

// This page is being routed to different pages
function DataComponent(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);
  return (
    <>
      <SidebarAdmin />
      <div className="flex flex-col gap-4 p-4 text-center">
      <div className="border rounded-md bg-red-300 p-4">
          <Link
            href={"/admin-wonders/eduLock"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Lock Edu
          </Link>
        </div>
      <div className="border rounded-md bg-red-300 p-4">
          <Link
            href={"/admin-wonders/eduPrices"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Set Edu Prices
          </Link>
        </div>
        <hr className="border border-black"/>
      <div className="border rounded-md bg-blue-400 p-4">
          <Link
            href={"/admin-wonders/dataPricesS"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Set Data Prices - SS
          </Link>
        </div>
      <div className="border rounded-md bg-blue-400 p-4">
          <Link
            href={"/admin-wonders/lockDataS"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Lock Data - SS
          </Link>
        </div>
        <hr className="border border-black"/>
      <div className="border rounded-md bg-green-600 p-4">
          <Link
            href={"/admin-wonders/tvSubPrices"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Update tvSub
          </Link>
        </div>
        <hr className="border border-black"/>
      <div className="border rounded-md bg-blue-100 p-4">
          <Link
            href={"/admin-wonders/setCouponPrices"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Set Data Coupon Prices
          </Link>
        </div>
      <div className="border rounded-md bg-red-300 p-4">
          <Link
            href={"/admin-wonders/lockCoupon"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Data Coupon I/O
          </Link>
        </div>
        <hr className="border border-black"/>
        <div className="border rounded-md bg-blue-100 p-4">
          <Link
            href={"/admin-wonders/getAllHistory"}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            All History
          </Link>
        </div>
        <hr className="border border-black"/>
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
        <hr className="border border-black"/>
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

export default DataComponent;
