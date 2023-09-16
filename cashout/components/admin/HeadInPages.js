import React from 'react'
import Link from "next/link";

function HeadInPages(ctx) {

  return (
   <>
    <div className="hover:pointer border border-solid text-sm p-2 m-2 text-slate-200 hover:bg-slate-400 hover:text-amber-400 text-center">
      <Link className="hover:text-amber-400 " href={"/admin-wonders/dashboard"}>
        Goto Admin Dashboard
      </Link>
    </div>
    <div className="text-center space-x-4 text-white text-xs">
      <Link className="hover:text-blue-300" href={"/admin-wonders/delUser"}>
        Delete User
      </Link>
      <Link className="hover:text-blue-300" href={"/admin-wonders/getSingleUser"}>
        Get User
      </Link>
      <Link className="hover:text-blue-300" href={"/admin-wonders/updateUser"}>
        Update User
      </Link>
      <Link className="hover:text-blue-300" href={"/admin-wonders/blockUser"}>
        Block User
      </Link>
    </div>
    </>
  )
}

export default HeadInPages