import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../components/admin/Layout-Admin";
import { useRouter } from "next/router";
import { adminAuthGuard } from "@/Utils/authGuard";
import {
  aExpireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
import API_BASE_URL from "@/apiConfig";
import axios from "axios";
import ToggleButton from "../utils/ToggleBtn";

const BASE_URL = `${API_BASE_URL}`;

function SettingsComp({ ctx, error, data }) {
  const router = useRouter();
  adminAuthGuard(ctx, router);
  const { token } = getUserIdAndToken(ctx);

  const [info, setInfo] = useState(data);
  const [message, setMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(null);

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  const handleToggleChange = async (key, value) => {
    const updatedData = { ...info, [key]: value };

    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/generalLock`,
        {
          switchDetail: key,
          visibility: value === "ON" ? true : false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success === true) {
        setInfo(updatedData);
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage(null);
        }, 1500);
      }
    } catch (error) {
      if (
        error.response.data.error === "Invalid token." ||
        error.response.data.error === "Token has been revoked or expired." ||
        error.response.data.error === "Forbidden!"
      ) {
        removeUserSession();
        aExpireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (error) {
        // console.error('Error updating data:', error.response.data.error);
        setMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className="">
      {/* {isLoading && <Loader />} */}
      <Head>
        <title>Admin&apos;s Settings</title>
      </Head>
      <Layout>
        {/* Container */}
        <div className="container mx-auto">
          {/* Heading Con */}
          <div className="p-3 text-slate-300 ">
            <h1 className="text-center">Admin&apos;s General Settings</h1>
          </div>
          {/* General Switch Con */}
          <div className="border-2 text-center text-sm font-semibold bg-slate-200 max-h-60 overflow-y-auto">
            <div className="fixed left-1/2 transform -translate-x-1/2 border-2-pink-700 p-1 bg-blue-400 ">
              <h2>General Lock</h2>
              {message && <p className="mt-[.7ch] text-green-600">{message}</p>}
              {error && <p className="mt-[.7ch] text-red-600">{error}</p>}
            </div>{" "}
            <div className="flex justify-between m-3 border bg-slate-600 p-2 mt-7 border-b-gray-600">
              <span>NAME</span>
              <span className="">OFF/ON</span>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Data A</span>
              <button className="">
                <ToggleButton
                  checked={info?.networkData === "ON"}
                  onToggleChange={(checked) =>
                    handleToggleChange("networkData", checked ? "ON" : "OFF")
                  }
                />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>Data S</span>
              <button className="">
                <ToggleButton
                  checked={info?.networkDataS === "ON"}
                  onToggleChange={(checked) =>
                    handleToggleChange("networkDataS", checked ? "ON" : "OFF")
                  }
                />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Data C</span>
              <button className="">
                <ToggleButton
                  checked={info?.networkDataC === "ON"}
                  onToggleChange={(checked) =>
                    handleToggleChange("networkDataC", checked ? "ON" : "OFF")
                  }
                />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>Airtime</span>
              <button className="">
                <ToggleButton
                  checked={info?.airtime === "ON"}
                  onToggleChange={(checked) =>
                    handleToggleChange("airtime", checked ? "ON" : "OFF")
                  }
                />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Elect</span>
              <button className="">
                <ToggleButton
                  checked={info?.elect === "ON"}
                  onToggleChange={(checked) =>
                    handleToggleChange("elect", checked ? "ON" : "OFF")
                  }
                />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>TvSub</span>
              <button className="">
                <ToggleButton
                  checked={data?.tvSub === "ON"}
                  onToggleChange={(checked) =>
                    handleToggleChange("tvSub", checked ? "ON" : "OFF")
                  }
                />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>DataCoupon</span>
              <button className="">
                <ToggleButton
                  checked={info?.dataCoupon === "ON"}
                  onToggleChange={(checked) =>
                    handleToggleChange("dataCoupon", checked ? "ON" : "OFF")
                  }
                />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>EduPin</span>
              <button className="">
                <ToggleButton
                  checked={info?.eduPin === "ON"}
                  onToggleChange={(checked) =>
                    handleToggleChange("eduPin", checked ? "ON" : "OFF")
                  }
                />
              </button>
            </div>
          </div>
          {/* General Switch Con ends here*/}

          {/* Update Data Prices */}
          <div className="border-2 text-center pt-2 mt-3 text-sm font-semibold bg-slate-200 max-h-60 overflow-y-auto">
            <div className="fixed left-1/2 transform -translate-x-1/2 border-2-pink-700 p-1 bg-blue-400 ">
              <h2>Data Prices Reset</h2>
            </div>
            <div className="flex justify-between m-3 border bg-slate-600 p-2 mt-7 border-b-gray-600">
              <span>NAME</span>
              <span className="">OFF/ON</span>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Data A</span>
              <button className="">{/* <ToggleButton /> */}</button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>Data S</span>
              <button className="">{/* <ToggleButton /> */}</button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Data C</span>
              <button className="">{/* <ToggleButton /> */}</button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>Airtime</span>
              <button className="">{/* <ToggleButton /> */}</button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Elect</span>
              <button className="">{/* <ToggleButton /> */}</button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2">
              <span>TvSub</span>
              <button className="">{/* <ToggleButton /> */}</button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2">
              <span>DataCoupon</span>
              <button className="">{/* <ToggleButton /> */}</button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2">
              <span>EduPin</span>
              <button className="">{/* <ToggleButton /> */}</button>
            </div>
          </div>
          {/* Data Prices end here */}
        </div>
      </Layout>
    </div>
  );
}

export default SettingsComp;
