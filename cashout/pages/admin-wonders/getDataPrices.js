import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentPrices from "@/components/admin/GetDataPrices";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import { getUserIdAndToken } from "@/Utils/authCookies";
import API_BASE_URL from "@/apiConfig";
import { getUser } from "@/Utils/Common";
// import { useRouter } from "next/router";

const BASE_URL = `${API_BASE_URL}/vend`

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

// A
function GetDataPrices() {
  // const router = useRouter();
  const [dataPrices, setDataPrices] = useState([]);
  const [error, setError] = useState(null);
  const user = getUser();
 const id = user ? user.id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/${id}/getData`
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        const newData = response.data.networkData;
        if (JSON.stringify(newData) !== JSON.stringify(dataPrices)) {
          setDataPrices(newData);
        }
      } catch (error) {
        setError(error);
        // console.log(error);
      }
    };

    fetchData();
  });

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
      <CurrentPrices dataPrices={dataPrices} />
    </>
  );
}

export default GetDataPrices;
