import DataServices from "@/services/data.services";
import React, { useState, useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import CurrentPrices from "@/components/admin/GetDataPrices";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import { useRouter } from "next/router";

function GetCurrentDataPrices() {
  const router = useRouter();
  const [dataPrices, setDataPrices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DataServices.getDataInfo();
        const newData = response.data.networkData;
        if (JSON.stringify(newData) !== JSON.stringify(dataPrices)) {
          setDataPrices(newData);
        }
      } catch (error) {
        if (
          error.response.data.error === "Invalid token." ||
          error.response.data.error === "Token expired."
        ) {
          sessionStorage.clear();
          router.push("/admin-wonders/login");
        } else {
          setError(error);
        }
        // console.log(error);
      }
    };

    fetchData();
  }, [dataPrices]);

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

export default withAuth(GetCurrentDataPrices);
