import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Layout from "../../components/admin/Layout-Admin";
import withAuth from "../../hocs/withAuth";

function Profile() {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className=" h-screen">
      <Head>
        <title>Admin&apos;s Profile</title>
      </Head>
      <Layout>
        <div className="p-3 text-slate-300">
          <h1 className="text-center">Admin&apos;s Profile</h1>
          <br />
          {user && (
            <div className="flex justify-around">
              <p className="text-center">
                Dear {user.username}, these are your basic info. Please keep it
                safe..
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
                  <h1 className="text-1xl text-slate-200 mb-2">First Name</h1>
                  <input className="text-blue-600" type="text" readOnly value={user.firstName}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-200 mb-2">Last Name</h1>
                  <input className="text-blue-600" type="text" readOnly value={user.lastName}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-200 mb-2">Email</h1>
                  <input className="text-blue-600" type="text" readOnly value={user.email}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-200 mb-2">Username</h1>
                  <input className="text-blue-600" type="text" readOnly value={user.username}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-200 mb-2">Phone Number</h1>
                  <input className="text-blue-600" type="text" readOnly value={user.phoneNumber}></input>
                </div>
              </div>
            )}
          </div>
          <div className="hover:pointer border border-solid p-2 m-4  hover:bg-slate-400 hover:text-amber-400 text-center">
            <Link className="hover:text-slate-200" href={"/admin-wonders/dashboard"}>
              Goto Admin Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default withAuth(Profile);
