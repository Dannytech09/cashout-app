import React, { useState, useEffect, useRef } from "react";
import withAuth from "../../hocs/withAuth";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import authHeader from "@/services/auth-Header";
import QueryTransactions from "@/components/user/QueryTransactions";
import { useRouter } from "next/router";

const BASE_URL = `${API_BASE_URL}/queryTransactions`;

function QueryTranx() {
  const router = useRouter();
  const [openTranx, setOpenTranx] = useState(false);
  const [openData, setOpenData] = useState(false);
  const input1Ref = useRef();
  const input2Ref = useRef();
  const [transactions, setTransactions] = useState({});
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (input1Ref.current && openTranx) {
      input1Ref.current.focus();
    } else if (input2Ref.current && openData) {
      input2Ref.current.focus();
    }
  });

  // Handle change in airtime input
  const handleChangeTranxQuery = () => {
    setOpenTranx(!openTranx);
  };

  // Handle change in data input
  const handleChangeDataQuery = () => {
    setOpenData(!openData);
  };

  // Query airtime
  // Post request
  const handleTranxSubmit = async (e) => {
    e.preventDefault();
    setCheckSubmit(false);

    const user = JSON.parse(sessionStorage.getItem("user"));
    const id = user._id;

    const inputValue = input1Ref.current.value;
    // console.log(inputValue);

    await axios
      .post(
        `${BASE_URL}/${id}`,
        { request_id: inputValue },
        { headers: authHeader() }
      )
      .then((response) => {
        setTransactions(response.data.data);
        setCheckSubmit(true);
        // console.log(response.data);
      })
      .catch((error) => {
        if (
          error.response.data.error === "Invalid token." ||
          error.response.data.error === "Token expired."
        ) {
          sessionStorage.clear();
          router.push("/login");
        } else if (error.response.data.code === "011") {
          alert("Invalid Transaction ID");
        }
        // console.log(error);
      });
  };

  // Query Data
  // Post request
  const handleDataSubmit = (e) => {
    e.preventDefault();
    input2Ref.current.value;
    setIsButtonDisabled(true);
    // console.log(inputValue);
  };

  return (
    <div className="relative">
      {/* cut jsx 2 another component, pass all the props used here, accept back the props as a property, then those props here should then be used in {} */}
      <QueryTransactions
        transactions={transactions}
        checkSubmit={checkSubmit}
        handleChangeTranxQuery={handleChangeTranxQuery}
        handleChangeDataQuery={handleChangeDataQuery}
        handleTranxSubmit={handleTranxSubmit}
        handleDataSubmit={handleDataSubmit}
        openTranx={openTranx}
        openData={openData}
        input2Ref={input2Ref}
        input1Ref={input1Ref}
        disabled={isButtonDisabled}
        // isButtonDisabled={isButtonDisabled}
      />
    </div>
  );
}

export default withAuth(QueryTranx);
