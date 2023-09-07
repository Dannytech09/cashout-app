import React, { useState, useEffect } from "react";
import Card from "@/components/utils/Card";
import { authGuard } from "@/Utils/authGuard";
import AutoFunding from "./userJsx/AutoFunding";
import {
  autoFundingHandler,
  getAutoFundingAcctHandler,
} from "@/pages/api/user/autofunding";
import { removeUserSession } from "@/Utils/Common";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { useRouter } from "next/router";

const AutoFundingComp = (ctx) => {
  const router = useRouter();
  authGuard();
  const [data, setData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const handleClick = () => {
    fetchData();
    setButtonClicked(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("buttonClicked", "true");
    }
  };

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await autoFundingHandler(ctx);
    //   console.log(response)
      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired."
      ) {
        removeUserSession();
        expireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (response.error) {
        setErrorMessage(response.error);
      } else if (response.code === "000") {
        // console.log("result", response.data.result)
        // setErrorMessage(null)
        setPostData(response.result);
        setSuccessMessage(response.message);
      }
    } catch (error) {
    //   console.log(error);
      throw new Error(`An error occurred ${error}`);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedButtonClicked = localStorage.getItem("buttonClicked");
      if (storedButtonClicked === "true") {
        setButtonClicked(true);
      }
    }
  }, []);

  // get acct
  const fetchOnLogin = async () => {
    try {
      const response = await getAutoFundingAcctHandler();
    //   console.log(response)
      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired."
      ) {
        removeUserSession();
        expireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (response.error) {
          setErrorMessage(response.error);
      } else if (response.data.length === 0) {
        setErrorMessage(null);
        setSuccessMessage(
          "Click on 'Get Acct' button to generate multiple account number"
        );
      } else if (response.message) {
        // console.log(response.data)
        setErrorMessage(null);
        setSuccessMessage(response.message);
        setData(response.data);
      }
    } catch (error) {
    //   console.log(error);
      throw new Error(`An error occurred ${error}`);
    }
  };

  useEffect(() => {
    fetchOnLogin();
  }, []);

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  return (
    <Card className="overflow-y-auto overflow-x-0 fixed inset-0 bg-black max-sm:flex-col text-center z-60 flex p-4 justify-between border-red-300">
      <AutoFunding
        data={data}
        postData={postData}
        isFetching={isFetching}
        buttonClicked={buttonClicked}
        errorMessage={errorMessage}
        successMessage={successMessage}
        handleClick={handleClick}
      />
      {/* <div className="bg-black text-white h-screen w-screen "> */}
    </Card>
  );
};
export default AutoFundingComp;
