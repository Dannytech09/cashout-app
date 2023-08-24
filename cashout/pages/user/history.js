import DataServices from "../../services/data.services";
import React, { useState, useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import MyPurchases from "@/components/user/History";
import { useRouter } from "next/router";

function History() {
  const router = useRouter();
  const [myPurchases, setMyPurchases] = useState([]);
  const [checkTransaction, setCheckTransaction] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await DataServices.getMyPurchases();

      setMyPurchases(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      if (
        error.response.data.error === "Invalid token." ||
        error.response.data.error === "Token expired."
      ) {
        sessionStorage.clear();
        router.push("/login");
      } else if (error?.response?.data?.code === "002") {
        setCheckTransaction(true);
      } else {
        alert("Something went wrong");      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <MyPurchases
        checkTransaction={checkTransaction}
        myPurchases={myPurchases}
        loading={loading}
      />
    </div>
  );
}

export default withAuth(History);
