import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/admin/Layout-Admin";
import { useRouter } from "next/router";
import { adminAuthGuard } from "@/Utils/authGuard";
import {
  aExpireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
import Loader from "../utils/Loader";
import API_BASE_URL from "@/apiConfig";
import axios from "axios";

const BASE_URL = `${API_BASE_URL}`;

function ProfileComp(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);
  const { token } = getUserIdAndToken(ctx);

  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(null);

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
        // console.log(response.data)
        if (response.data.data) {
          // console.log(response.data.data);
          setUser(response.data.data);
        }
      } catch (error) {
        // console.log(error)
        if (
          error.response.data.error === "Invalid token." ||
          error.response.data.error === "Token has been revoked or expired."
        ) {
          removeUserSession();
          aExpireSessionAndRedirect(ctx, router);
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
    <div className=" h-screen">
      {loading && <Loader />}
      <Head>
        <title>Admin&apos;s Profile</title>
      </Head>
      <Layout>
        <div className="p-3 text-slate-300">
          <h1 className="text-center">Admin&apos;s Profile</h1>
          <br />
          {error && (
            <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600">
              {error}
            </p>
          )}
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
                  <input
                    className="text-blue-600"
                    type="text"
                    readOnly
                    value={user.firstName}
                  ></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-200 mb-2">Last Name</h1>
                  <input
                    className="text-blue-600"
                    type="text"
                    readOnly
                    value={user.lastName}
                  ></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-200 mb-2">Email</h1>
                  <input
                    className="text-blue-600"
                    type="text"
                    readOnly
                    value={user.email}
                  ></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-200 mb-2">Username</h1>
                  <input
                    className="text-blue-600"
                    type="text"
                    readOnly
                    value={user.username}
                  ></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-200 mb-2">Phone Number</h1>
                  <input
                    className="text-blue-600"
                    type="text"
                    readOnly
                    value={user.phoneNumber}
                  ></input>
                </div>
              </div>
            )}
          </div>
          <div className="hover:pointer border border-solid p-2 m-4  hover:bg-slate-400 hover:text-amber-400 text-center">
            <Link
              className="hover:text-slate-200"
              href={"/admin-wonders/dashboard"}
            >
              Goto Admin Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ProfileComp;
