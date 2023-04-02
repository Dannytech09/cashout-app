import React, { useState, useEffect } from "react";
import { removeUserSession } from "./Utils/Common";
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState();

  useEffect(() => {
   const user = JSON.parse(sessionStorage.getItem('user'))
   setUser(user)
  }, []);

  const logoutHandler = () => {
    removeUserSession();
    router.push("/login")
  };

  return (
    <div className="text-slate-200">
      <h1 className="">Welcome to Dashboard Page</h1>
      <br />
      <br />
      <button onClick={logoutHandler}>Logout</button>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-10 justify-center mt-10">
        {user && (
          <div
            key={user._id}
            className="border shadow-md p-6 flex flex-col justify-center"
          >
            <h1 className="font-bold text-2xl text-slate-300">
              firstName: {user.firstName} lastName: {user.lastName}
            </h1>
            <p>email: {user.email}</p>
            <p>username: {user.username}</p>
            <p>phoneNumber: {user.phoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}
