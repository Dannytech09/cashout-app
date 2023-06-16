import DataServices from "@/services/data.services";
import React, { useState, useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import CurrentDataPrices from "@/components/admin/GetCurrentDataPrices";

function GetCurrentDataPrices() {
  const [dataInfos, setDataInfos] = useState([]);
  const [error, setError] = useState(null);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DataServices.getAllDataInfo();
        const newData = response.data.networkData;
        if (JSON.stringify(newData) !== JSON.stringify(dataInfos)) {
          setDataInfos(newData);
        }
      } catch (error) {
        setError(error)
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
    <CurrentDataPrices dataInfos={dataInfos}/>
    </>
  )

}

export default withAuth(GetCurrentDataPrices);
