import React from "react";
import HeadInPages from "../HeadInPages";
import SidebarAdmin from "../Sidebar-Admin";
import To12HourFormat from "../../utils/Time";
import Loader from "../../utils/Loader";
import { FaRegEye } from "react-icons/fa";
import { useRouter } from "next/router";
import { adminAuthGuard } from "@/Utils/authGuard";
import Link from "next/link";

function AllReferrals({ error, allReferralInfo, loading, ctx }) {
  const router = useRouter();
  adminAuthGuard(ctx, router);

  return (
    <div className="relative">
      {loading && <Loader />}
      <div className="fixed top-0 z-40">
        <SidebarAdmin />
      </div>
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-md">
          All Referral&apos;s History
        </h1>
        <HeadInPages />
      </div>
      <div className="mt-[15ch] text-center text-red-500">
        {error && <p>{error}</p>}
      </div>

      <div className="mt-[10ch]">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {allReferralInfo.map((item, outerIndex) => (
            <div
              key={outerIndex}
              className="bg-white text-[1.3ch] p-3 ml-5 mr-5 rounded-lg shadow-md mb-1 mt-3 relative"
            >
              {item.map((innerItem, innerIndex) => (
                <div key={innerIndex}>
                  <p className="text-gray-700 font-bold text-[1.1ch]">
                    Referrer ID: {innerItem.id}
                  </p>

                  <p className="text-gray-700 text-[1.1ch]">
                    Referrer Email: {innerItem.email}
                  </p>
                  <p className="text-blue-700 text-[1.1ch]">
                    Status: {innerItem.status}
                  </p>
                  <p className="text-gray-700 text-[1.1ch]">
                    Date: {innerItem.date ? To12HourFormat(innerItem.date) : ""}
                  </p>
                  <Link
                    href="/admin-wonders/info/[id]"
                    as={`/admin-wonders/info/${innerItem.id}`}
                  >
                    <div className="absolute right-2 top-1/2 cursor-pointer">
                      <FaRegEye />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllReferrals;
