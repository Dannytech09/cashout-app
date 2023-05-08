import DataServices from "../../services/data.services";
import React, { useState, useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import DataPurchased from "@/components/admin/GetAllDataPurchase";

function GetAllDataPurchased() {
  const [allDataPurchased, setAllDataPurchased] = useState([]);

  const fetchData = async () => {
    try {
      const res = await DataServices.getAllDataPurchase();

      setAllDataPurchased(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <DataPurchased allDataPurchased={allDataPurchased}/>
    </>
  )
}

export default withAuth(GetAllDataPurchased);
