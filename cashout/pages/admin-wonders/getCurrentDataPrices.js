import React, { useState, useEffect } from "react";
import CurrentDataPrices from "@/components/admin/GetCurrentDataPrices";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/pay`;

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

function GetCurrentDataPrices() {
  // const { token } = getUserIdAndToken(ctx);

  const [dataInfos, setDataInfos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getData`
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        const newData = response.data.networkData;
        if (JSON.stringify(newData) !== JSON.stringify(dataInfos)) {
          setDataInfos(newData);
        }
      } catch (error) {
        setError(error);
        // console.log(error);
      }
    };

    fetchData();
  }, [dataInfos]);

  if (error) {
    return (
      <div>
        <p>An error occurred: {error.message}, http client or server error</p>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-0 z-40">
        <SidebarAdmin />
      </div>
      <CurrentDataPrices dataInfos={dataInfos} />
    </>
  );
}

export default GetCurrentDataPrices;
