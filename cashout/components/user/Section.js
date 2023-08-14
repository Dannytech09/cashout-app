import React from "react";
import Card from "../utils/Card";
import WifiDataIcon from "@/components/heroIcons/WifiDataIcon";
import Link from "next/link";

export default function Section() {
  return (
    // <div>
    <Card className="max-sm:w-full mt-[0ch] mb-[5ch] h-40 text-center z-60 p-4 justify-between w-full border-3 bg-violet-500">
      <div className="place-items-stretch flex justify-evenly bg-slate-100 p-2 rounded-t-xl">
        <div className="flex gap-4 hover:bg-slate-500 hover:text-blue-300 items-center justify-center max-sm:w-30 text-center h-[6ch] bg-violet-400 border-2 border-slate-200 rounded-2xl w-[40%]">
          <span className="fill-blue-500 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><WifiDataIcon/></span>
          <Link href="/user/directCoupon" className="text-slate-100 text-md">MTN Coupon</Link>
        </div>
        <div className="flex gap-4 hover:bg-slate-500 hover:text-blue-300 items-center justify-center max-sm:w-30 text-center h-[6ch] bg-violet-400 border-2 border-slate-200 rounded-2xl w-[40%]">
        <span className="fill-blue-500 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><WifiDataIcon/></span>
        <Link href="" className="text-slate-100 text-md">Smile Network</Link>
        </div>
      </div>
      <div className="flex justify-evenly bg-slate-100 p-2 rounded-b-xl">
      <div className="flex gap-4 hover:bg-slate-500 hover:text-blue-300 items-center justify-center max-sm:w-30 text-center h-[6ch] bg-violet-400 border-2 border-slate-200 rounded-2xl w-[40%]">
        <span className="fill-blue-500 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><WifiDataIcon/></span>
          <Link href={""} className="text-slate-100 text-md">Edu Pin</Link>
        </div>
        <div className="flex gap-4 hover:bg-slate-500 hover:text-blue-300 items-center justify-center max-sm:w-30 text-center h-[6ch] bg-violet-400 border-2 border-slate-200 rounded-2xl w-[40%]">
        <span className="fill-blue-500 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><WifiDataIcon/></span>
          <Link href={""} className="text-slate-100 text-md">Spectranet</Link>
        </div>
      </div>
    </Card>
    // </div>
  );
}
