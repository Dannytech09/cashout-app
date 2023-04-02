import Head from "next/head";
import Sidebar from "../../components/user/Sidebar";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import Layout from "../../components/user/Layout";

function profile() {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="text-slate-800 h-screen">
      <Head>
        <title>My Profile</title>
      </Head>
      <div className="flex absolute mt-[-2ch]">
        <Sidebar />
      </div>
      <Layout>
        <div className="p-3">
          <h1 className="text-center">My Profile</h1>
          <br />
          {user && (
            <div className="flex justify-around">
              <p className="">
                Dear {user.firstName}, Your Account Privacy is important to us,
                please note that we will never ask for your password. So, please
                keep it safe...
              </p>
            </div>
          )}
          <div className="flex gap-10 justify-center mt-5">
            {user && (
              <div
                key={user._id}
                className="border p-6 flex flex-col justify-center"
              >
                <div>
                  <h1 className="text-1xl text-slate-800 mb-2">First Name</h1>
                  <input type="text" readOnly value={user.firstName}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-800 mb-2">Last Name</h1>
                  <input type="text" readOnly value={user.lastName}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-800 mb-2">Email</h1>
                  <input type="text" readOnly value={user.email}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-800 mb-2">Username</h1>
                  <input type="text" readOnly value={user.username}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-800 mb-2">Phone Number</h1>
                  <input type="text" readOnly value={user.phoneNumber}></input>
                </div>
              </div>
            )}
          </div>
          <Link href={"/user/dashboard"}>Dashboard</Link>
        </div>
      </Layout>
    </div>
  );
}

export default withAuth(profile);
