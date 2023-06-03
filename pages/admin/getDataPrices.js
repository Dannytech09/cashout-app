import DataServices from "@/services/data.services";
import React, { useState, useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import CurrentPrices from "@/components/admin/GetDataPrices";

function GetCurrentDataPrices() {
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
        setError(error);
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
      <CurrentPrices dataPrices={dataPrices} />
    </>
  );
}

export default withAuth(GetCurrentDataPrices);
