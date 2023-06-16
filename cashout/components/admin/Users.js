import React from 'react'
import Link from 'next/link'

export default function Users({ users }) {
  return (
         <div className="border text-xs h-full border-solid bg-slate-500 border-slate-500 p-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 ml-4 mr-4 justify-center mt-[15ch] mb-40">
        {users.map((user) => (
          <div
            key={user._id}
            className="border shadow-md p-3 flex flex-col justify-center flex-wrap"
          >
            <div className="flex hover:pointer hover:text-cyan-500 text-[1.3ch] ">
            ID: <span className="font-medium "> {user._id}</span>
              <Link className=' hover:text-blue-500' href={'/admin/getSingleUser'}><h5 className="font-bold">
                &nbsp; click me</h5>
              </Link>
            </div>
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                First Name:{" "}
                <span className="font-medium">{user.firstName}</span>
              </h1>
            </div>
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Username: <span className="font-medium">{user.username}</span>
              </h1>
            </div>
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Email: <span className="font-medium"> {user.email}</span>
              </h1>
            </div>
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Phone: <span className="font-medium"> {user.phoneNumber}</span>
              </h1>
            </div>
            <div className="flex-wrap text-[1.3ch]">
              <h1 className="font-bold">
                Wallet Balance:{" "}
                <span className="font-medium">
                  {" "}
                  {user.balance.$numberDecimal}
                </span>
              </h1>
            </div>
          </div>
        ))}
      </div>
  
  )
}
