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
import ToggleButton from "../utils/ToggleBtn";
import { GetSwitchHandler } from "@/pages/api/admin/settings";

const BASE_URL = `${API_BASE_URL}`;

function SettingsComp(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);
  const { token } = getUserIdAndToken(ctx);

  const [data, setData] = useState({
    networkData: "OFF",
    networkDataS: "OFF",
    networkDataC: "OFF",
    airtime: "OFF",
    dataCoupon: "OFF",
    eduPin: "OFF",
    elect: "OFF",
    tvSub: "OFF",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(null);

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  useEffect(() => {
    // console.log("ParentComponent rendered");

    const fetchData = async () => {
      try {
        const resp = await GetSwitchHandler();
        // console.log(resp.data);
        setData(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleToggleChange = async (key, value) => {
    // setChecked(nextChecked);
    const updatedData = { ...data, [key]: value };
    // console.log("updatedData", updatedData);
    setData(updatedData);

    try {
        const response = await axios.patch('http://api.example.com/update', updatedData);
        console.log('API response:', response.data);
      } catch (error) {
        console.error('Error updating data:', error);
      }
  };

  return (
    <div className="">
      {loading && <Loader />}
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
            </div>{" "}
            <div className="flex justify-between m-3 border bg-slate-600 p-2 mt-7 border-b-gray-600">
              <span>NAME</span>
              <span className="">OFF/ON</span>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Data A</span>
              <button className="">
                {data.networkData !== undefined && (
                  <ToggleButton
                    checked={data.networkData === "ON"}
                    onToggleChange={(checked) =>
                      handleToggleChange("networkData", checked ? "ON" : "OFF")
                    }
                  />
                )}
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>Data S</span>
              <button className="">
                {data.networkDataS !== undefined && (
                  <ToggleButton
                    checked={data.networkDataS === "ON"}
                    onToggleChange={(checked) =>
                      handleToggleChange("networkDataS", checked ? "ON" : "OFF")
                    }
                  />
                )}
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Data C</span>
              <button className="">
                {data.networkDataC !== undefined && (
                  <ToggleButton
                    checked={data.networkDataC === "ON"}
                    onToggleChange={(checked) =>
                      handleToggleChange("networkDataC", checked ? "ON" : "OFF")
                    }
                  />
                )}
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>Airtime</span>
              <button className="">
                {data.airtime !== undefined && (
                  <ToggleButton
                    checked={data.airtime === "ON"}
                    onToggleChange={(checked) =>
                      handleToggleChange("airtime", checked ? "ON" : "OFF")
                    }
                  />
                )}
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Elect</span>
              <button className="">
                {data.elect !== undefined && (
                  <ToggleButton
                    checked={data.elect === "ON"}
                    onToggleChange={(checked) =>
                      handleToggleChange("elect", checked ? "ON" : "OFF")
                    }
                  />
                )}
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>TvSub</span>
              <button className="">
                {data.tvSub !== undefined && (
                  <ToggleButton
                    checked={data.tvSub === "ON"}
                    onToggleChange={(checked) =>
                      handleToggleChange("tvSub", checked ? "ON" : "OFF")
                    }
                  />
                )}
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>DataCoupon</span>
              <button className="">
                {data.dataCoupon !== undefined && (
                  <ToggleButton
                    checked={data.dataCoupon === "ON"}
                    onToggleChange={(checked) =>
                      handleToggleChange("dataCoupon", checked ? "ON" : "OFF")
                    }
                  />
                )}
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>EduPin</span>
              <button className="">
                {data.eduPin !== undefined && (
                  <ToggleButton
                    checked={data.eduPin === "ON"}
                    onToggleChange={(checked) =>
                      handleToggleChange("eduPin", checked ? "ON" : "OFF")
                    }
                  />
                )}
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
              <button className="">
                <ToggleButton />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>Data S</span>
              <button className="">
                <ToggleButton />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Data C</span>
              <button className="">
                <ToggleButton />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2 ">
              <span>Airtime</span>
              <button className="">
                <ToggleButton />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2 ">
              <span>Elect</span>
              <button className="">
                <ToggleButton />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2">
              <span>TvSub</span>
              <button className="">
                <ToggleButton />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-200 p-1/2">
              <span>DataCoupon</span>
              <button className="">
                <ToggleButton />
              </button>
            </div>
            <div className="flex justify-between m-3 border text-sm bg-slate-600 p-1/2">
              <span>EduPin</span>
              <button className="">
                <ToggleButton />
              </button>
            </div>
          </div>
          {/* Data Prices end here */}
        </div>
      </Layout>
    </div>
  );
}

export default SettingsComp;
