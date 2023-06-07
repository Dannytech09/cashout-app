import React, { useState, useEffect } from "react";
const axios = require("axios");
import API_BASE_URL from "@/apiConfig";
import PaymentHistory from "@/components/user/PaymentHistory";

const BASE_URL = `${API_BASE_URL}/api/v1`;

export default function PayHistory() {
  const [data, setData] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  const [checkTransaction, setCheckTransaction] = useState(false);

  // get acct
  const fetchAllPayment = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const token = sessionStorage.getItem("token") || null;
      const id = user._id;
      const header = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        `${BASE_URL}/autoFunding/history/${id}`,
        {
          headers: header,
        }
      );
      setData(response.data.data);
    //   console.log(response.data.data);
    } catch (error) {
      if (error.response.data.code === "002") {
        setCheckTransaction(true);
      }
    }
  };

  useEffect(() => {
    fetchAllPayment();
  }, []);

  return (
    <div>
      <PaymentHistory data={data} checkTransaction={checkTransaction} />
    </div>
  );
}
