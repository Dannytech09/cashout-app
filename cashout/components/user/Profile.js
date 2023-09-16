import Head from "next/head";
import Sidebar from "../../components/user/Sidebar";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { expireSessionAndRedirect, getUserIdAndToken } from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
import { useRouter } from "next/router";
import Loader from "../utils/Loader";
import { Logout } from "./Logout";
import { authGuard } from "@/Utils/authGuard";
// import Layout from "../../components/user/Layout";

const BASE_URL = API_BASE_URL;

function ProfileComp(ctx) {
    const router = useRouter();
    authGuard(ctx, router);
  
    const [user, setUser] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [redirecting, setRedirecting] = useState(null);
    const { token } = getUserIdAndToken(ctx);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(`${BASE_URL}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.data.data) {
            // console.log(response.data.data);
            setUser(response.data.data);
          }
        } catch (error) {
          if (
            error.response.data.error === "Invalid token." ||
            error.response.data.error === "Token has been revoked or expired."
          ) {
            removeUserSession();
            expireSessionAndRedirect(ctx, router);
            setRedirecting(true);
          } else if (error.response.data.error) {
            // console.log(error);
            setError(error.response.data.error);
          } else {
            setError("Something went wrong !");
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  return (
    <div className="text-slate-800 bg-blue-500 h-screen">
      <Head>
        <title>My Profile</title>
      </Head>
      {loading && <Loader /> }
        <div  className='flex justify-between'>
            <div className="">
                <Sidebar />
            </div>
            <div className='mr-0 lg:mr-[-3ch] md:mr-[-3ch] sm:mr-[-3ch]'>
                <Logout />
            </div>
        </div>
        {error && (
          <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600">
           {error}
          </p>
        )}
      {/* <Layout> */}
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
                <div>
                  <h1 className="text-1xl text-slate-800 mb-2">Account Type</h1>
                  <input type="text" readOnly value={user.accountType}></input>
                </div>
              </div>
            )}
          </div>
          <Link href={"/user/dashboard"}>Dashboard</Link>
        </div>
      {/* </Layout> */}
    </div>
  );
}

export default ProfileComp;
