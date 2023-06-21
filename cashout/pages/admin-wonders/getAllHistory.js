import DataServices from "../../services/data.services";
import React, { useState, useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import AllPurchases from "@/components/admin/GetAllHistory";

function GetAllPurchases() {
  const [allPurchases, setAllDataPurchased] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await DataServices.getAllPurchases();

      setAllDataPurchased(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      if (error.response?.data?.error) {
        setError(true);
        // console.log(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AllPurchases error={error} allPurchases={allPurchases} loading={loading}/>
    </>
  );
}

export default withAuth(GetAllPurchases);
