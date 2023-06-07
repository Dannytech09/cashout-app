import React from "react";
import Card from "../utils/Card";
import WifiDataIcon from "@/components/heroIcons/WifiDataIcon";
import PhoneAirtimeIcon from "../heroIcons/PhoneAirtimeIcon";
import TvCabIcon from "../heroIcons/TvCabIcon";
import LightElectIcon from "../heroIcons/LightElectIcon";
import Link from "next/link";

export default function subMain() {
  return (
    <Card className="max-sm:w-full h-40 text-center z-60 p-4 justify-between w-full border-3 bg-slate-200">
      <div className="place-items-stretch flex justify-evenly bg-slate-100 p-2 rounded-t-xl">
        <div className="flex gap-4 items-center justify-center max-sm:w-30 text-center h-[6ch] bg-slate-400 border-2 border-slate-200 rounded-2xl w-[40%]">
          <span className="fill-blue-500 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><WifiDataIcon/></span>
          <Link href="/user/buyData" className="text-blue-600 text-md">Data</Link>
        </div>
        <div className="flex gap-4 items-center justify-center max-sm:w-30 text-center h-[6ch] bg-slate-400 border-2 border-slate-200 rounded-2xl w-[40%]">
        <span className="fill-blue-500 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><PhoneAirtimeIcon/></span>
        <Link href="/user/buyAirtime" className="text-blue-600 text-md">Airtime</Link>
        </div>
      </div>
      <div className="flex justify-evenly bg-slate-100 p-2 rounded-b-xl">
        <div className="flex gap-2 items-center justify-center px-2 max-sm:w-35 text-center h-[6ch] bg-slate-400 border-2 border-slate-200 rounded-2xl w-[40%]">
        <span className="fill-blue-500 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><TvCabIcon/></span>
          <Link href={"/user/tvSub"} className="text-blue-600 text-md">Cable Sub</Link>
        </div>
        <div className="flex gap-2 items-center justify-center px-2 max-sm:w-35 text-center h-[6ch] bg-slate-400 border-2 border-slate-200 rounded-2xl w-[40%]">
        <span className="fill-blue-500 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><LightElectIcon/></span>
          <Link href={"/user/electBill"} className="text-blue-600 text-md">Elect bills</Link>
        </div>
      </div>
    </Card>
  );
}
