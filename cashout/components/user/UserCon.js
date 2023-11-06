import React from "react";
import Card from "../utils/Card";
import Link from "next/link";
import FundWalletIcon from "../heroIcons/FundWalletIcon";
import Image from "next/image";

export default function UserCon({ user }) {
  return (
    // <div>
     <Card className="max-sm:w-full mt-[3ch] mb-[5ch] h-40 text-center z-60 p-4 justify-between w-full border-3 bg-violet-500">
      <div className="place-items-stretch flex justify-evenly bg-slate-100 p-2 rounded-t-xl">
        <div className="flex gap-3 hover:bg-slate-500 hover:text-blue-300 items-center justify-center max-sm:w-30 text-center h-[6ch] bg-cyan-500 border-2 border-slate-200 rounded-2xl w-[43%]">
        <span className="fill-blue-500 border-2 ml-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"> <Image style={{width: 'auto', height: 'auto'}} className="rounded-full" width={60} height={60} src={"/referral.png"} alt="ref-img"/></span>
          <Link href="/user/referral" className="text-slate-100 text-sm mr-5">Referral Info</Link>
        </div>
        <div className="flex gap-3 hover:bg-slate-500 hover:text-blue-300 items-center justify-center max-sm:w-30 text-center h-[6ch] bg-cyan-500 border-2 border-slate-200 rounded-2xl w-[48%]">
        <span className="fill-blue-500 border-2 ml-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"> <Image style={{width: 'auto', height: 'auto'}} className="rounded-full" width={60} height={60} src={"/airtime2cash.jpg"} alt="w-img"/></span>
          <Link href={"/user/withdrawalBonus"} className="text-slate-100 text-sm mr-5">Withdraw Bonus</Link>
        </div>
      </div>
      <div className="flex justify-evenly bg-slate-100 p-2 rounded-b-xl">
      <div className="flex gap-3 hover:bg-slate-500 hover:text-blue-300 items-center justify-center max-sm:w-30 text-center h-[6ch] bg-cyan-500 border-2 border-slate-200 rounded-2xl w-[40%]">
        <span className="animate-pulse fill-blue-500 border-2 ml-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"> <FundWalletIcon /> </span>
        {user && (
          <span className="text-black mr-5">{"\u20A6"}{user.bal.$numberDecimal}</span>
        )}
        </div>
        <div className="flex gap-3 hover:bg-slate-500 hover:text-blue-300 items-center justify-center max-sm:w-30 text-center h-[6ch] bg-cyan-500 border-2 border-slate-200 rounded-2xl w-[40%]">
        <span className="fill-blue-500 border-2 ml-2 border-slate-300 bg-slate-100 p-1 text-[.9ch] rounded-full stroke-blue-600">Bonus Bal</span>
        {user && (
          <span className="text-black mr-5">{"\u20A6"}{user.bonusEarned}</span>
        )}
        </div>
      </div>
    </Card>
    // </div>
  );
}
