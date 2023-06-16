import DataServices from "../../services/data.services";
import React, { useState, useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import MyPurchases from "@/components/user/History";

function history() {
  const [myPurchases, setMyPurchases] = useState([]);
  const [checkTransaction, setCheckTransaction] = useState(false);

  const fetchData = async () => {
    try {
      const res = await DataServices.getMyPurchases();

      setMyPurchases(res.data.data);
        // console.log(res.data.data);
    } catch (error) {
      if (error?.response?.data?.code === "002") {
        setCheckTransaction(true);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <MyPurchases
        checkTransaction={checkTransaction}
        myPurchases={myPurchases}
      />
    </div>
  );
}

export default withAuth(history);
