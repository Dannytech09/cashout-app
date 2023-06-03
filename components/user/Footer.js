import React from "react";
import Link from "next/link";
import Card from "../utils/Card";
import WalletIcon from "../heroIcons/WalletIcon";
import InfoIcon from "../heroIcons/InfoIcon";

export default function Main() {
  return (
     <div className="h-50">
    <Card className="max-sm:flex-col mt-10 max-sm:w-full text-center z-60 flex h-60 p-4 justify-between w-full border-3 bg-slate-100 border-white">
      <div className="flex gap-20 text-center max-sm:w-full h-[20ch] bg-slate-400 border-2 max-sm:mt-[-2ch] border-slate-200 rounded-2xl w-[30%]">
        <span className="fill-blue-900 h-8 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600">
          <InfoIcon/>
        </span>
        <Link href={"/user/history"} className="font-extrabold text-sm pt-3 place-items-center">Transaction History</Link>
      </div>
      <div className="flex gap-20 max-sm:w-full h-[20ch] mt-[0ch] bg-slate-400 border-2 border-slate-200 rounded-2xl w-[30%]">
      <span className="fill-blue-900 h-8 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600">
          <InfoIcon/>
        </span>
        <Link href={"/user/queryTransactions"} className="font-extrabold text-sm pt-3">Query Transaction</Link>
      </div>
      <div className="flex gap-20 max-sm:w-full h-[20ch] mt-[0ch] bg-slate-400 border-2 border-slate-200 rounded-2xl w-[30%]">
      <span className="fill-blue-900 h-8 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600">
          <InfoIcon/>
        </span>
        <h3 className="font-extrabold text-sm pt-3">Payment History</h3>
      </div>
    </Card>
      <div className="h-10 text-center text-sm font-extrabold p-2">
        <Link href={"https://www.facebook.com/jaywon349"}>
        &copy; Dannytech {new Date().getFullYear()} 
        </Link>
      </div>
      </div>
  );
}
