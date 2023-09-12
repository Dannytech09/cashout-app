import React, { useState, useEffect, useRef } from "react";
import QueryTransactions from "@/components/user/QueryTranx";
import { useRouter } from "next/router";
import { removeUserSession } from "@/Utils/Common";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { queryTranxHandler } from "../api/user/querytranx";
import { authGuard } from "@/Utils/authGuard";
// import { queryTranxHandler } from "@/pages/api/user/querytranx";
import { getUserIdAndToken } from "@/Utils/authCookies";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
}

// make airtime query btn unclickable until value completes
function QueryTranxComp(ctx) {
  const router = useRouter();
  authGuard();
  
  const [openTranx, setOpenTranx] = useState(false);
  const [openData, setOpenData] = useState(false);
  const input1Ref = useRef();
  const input2Ref = useRef();
  const [transactions, setTransactions] = useState({});
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(null);

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

    const inputValue = input1Ref.current.value;
    // console.log(inputValue);

    await queryTranxHandler(ctx, inputValue)
      .then((response) => {
        if (
          response.error === "Invalid token." ||
          response.error === "Token has been revoked or expired."
        ) {
          removeUserSession();
          expireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        } else if (response.error) {
          setErrorMessage(response.error);
        } else {
          setTransactions(response.data);
          setCheckSubmit(true);
          // console.log(response.data);
        }
      })
      .catch((error) => {
        throw new Error(`An error occurred ${error}`);
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

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

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
        errorMessage={errorMessage}
        // isButtonDisabled={isButtonDisabled}
      />
    </div>
  );
}

export default QueryTranxComp;
