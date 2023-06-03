import DataServices from "../../services/data.services";
import React, { useState, useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import MyHistories from "@/components/user/GetCableTvHistories";

function GetMyHistories() {
  const [myHistories, setMyHistories] = useState([]);
  const [checkTransaction, setCheckTransaction] = useState(false);

  const fetchData = async () => {
    try {
      const res = await DataServices.getMyHistories();

      setMyHistories(res.data.data);
        console.log(res.data.data);
    } catch (error) {
      if (error.response.data.code === "002") {
        setCheckTransaction(true);
        console.log(error)
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MyHistories
        checkTransaction={checkTransaction}
        myHistories={myHistories}
      />
    </>
  );
}

export default withAuth(GetMyHistories);
