import DataServices from "../../services/data.services";
import React, { useState, useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import AllPurchases from "@/components/admin/GetAllHistory";

function GetAllPurchases() {
  const [allPurchases, setAllDataPurchased] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await DataServices.getAllPurchases();

      setAllDataPurchased(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      if (error.response.data.error) {
        setError(true);
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AllPurchases error={error} allPurchases={allPurchases} />
    </>
  );
}

export default withAuth(GetAllPurchases);
