import React from 'react'
import Link from "next/link";

function HeadInPages() {
  return (
    <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-5 text-center text-slate-200 font-extrabold text-2xl">
          All Data Purchased
        </h1>
        <div className="flex justify-center space-x-4 text-white text-sm mt-5">
          <div className="hover:pointer border border-solid p-2 m-4 text-center hover:bg-slate-400 hover:text-amber-400">
            <Link href={"/admin/dashboard"}>Goto Admin Dashboard</Link>
          </div>
          <div className="hover:pointer border border-solid p-2 m-4 text-center hover:bg-slate-400 hover:text-amber-400">
            <Link href={"/admin/delUser"}>Delete User</Link>
          </div>
          <div className="hover:pointer border border-solid p-2 m-4 text-center hover:bg-slate-400 hover:text-amber-400">
            <Link href={"/admin/getSingleUser"}>Look Up User</Link>
          </div>
          <div className="hover:pointer border border-solid p-2 m-4 text-center hover:bg-slate-400 hover:text-amber-400">
            <Link href={"/admin/updateUser"}>Update User</Link>
          </div>
          <div className="hover:pointer border border-solid p-2 m-4 text-center hover:bg-slate-400 hover:text-amber-400">
            <Link href={"/admin/blockUser"}>Block User</Link>
          </div>
        </div>
      </div>
  )
}

export default HeadInPages