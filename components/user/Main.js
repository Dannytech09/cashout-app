import React from "react";
import Card from "../utils/Card";
import WalletIcon from "../heroIcons/WalletIcon";

export default function Main() {
  return (
    <Card className="max-sm:flex-col max-sm:w-full text-center z-60 flex h-60 p-4 justify-between w-full border-3 bg-slate-100 border-white">
      <div className="flex gap-20 text-center max-sm:w-full h-[20ch] bg-slate-400 border-2 max-sm:mt-[-2ch] border-slate-200 rounded-2xl w-[30%]">
      <span className="fill-blue-900 h-7 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><WalletIcon/></span>
        <h3 className="text-xs pt-3 place-items-center font-extrabold">Monnify wema</h3>
      </div>
      <div className="flex gap-20 max-sm:w-full h-[20ch] mt-[0ch] bg-slate-400 border-2 border-slate-200 rounded-2xl w-[30%]">
      <span className="fill-blue-900 h-7 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><WalletIcon/></span>
        <h3 className="text-xs pt-3 font-extrabold">Monnify sterling</h3>
      </div>
      <div className="flex gap-20 max-sm:w-full h-[20ch] mt-[0ch] bg-slate-400 border-2 border-slate-200 rounded-2xl w-[30%]">
      <span className="fill-blue-900 h-7 border-2 border-slate-300 bg-slate-100 p-1 rounded-full stroke-blue-600"><WalletIcon/></span>
        <h3 className="text-xs pt-3 font-extrabold">Monnify rolex</h3>
      </div>
    </Card>
  );
}
