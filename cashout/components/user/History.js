import React, { useState, useEffect } from "react";
import MyPurchases from "@/components/user/userJsx/History";
import { useRouter } from "next/router";
import {
  allMyPurchasesHandler,
  searchPurchases,
} from "@/pages/api/user/history";
import { removeUserSession } from "@/Utils/Common";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { authGuard } from "@/Utils/authGuard";

function HistoryComp(ctx) {
  const router = useRouter();
  authGuard(ctx, router);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [myPurchases, setMyPurchases] = useState([]);
  const [checkTransaction, setCheckTransaction] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;

        response = await allMyPurchasesHandler();
        // console.log(response.data.data);
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
          setCheckTransaction(true);
          setMyPurchases(response);
          setErrorMessage(null);
        }
        // setLoading(false);
      } catch (error) {
        // console.log(error)
        throw new Error(`An error occurred ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ctx, router]);

  const handleSubmit = async (e) => {
    let response;
    e.preventDefault();
    response = await searchPurchases(ctx, phoneNumber);
    // console.log(response);
    if (
      response.error === "Invalid token." ||
      response.error === "Token has been revoked or expired."
    ) {
      removeUserSession();
      expireSessionAndRedirect(ctx, router);
      setRedirecting(true);
    } else if (response.error) {
      setErrorMessage(response.error);
      setSearchResults([]);
      // setMyPurchases([])
    } else {
      setCheckTransaction(true);
      setSearchResults(response);
      setErrorMessage(null);
    }
  };

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  return (
    <div>
      <MyPurchases
        checkTransaction={checkTransaction}
        myPurchases={myPurchases}
        loading={loading}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
        setPhoneNumber={setPhoneNumber}
        phoneNumber={phoneNumber}
        searchResults={searchResults}
      />
    </div>
  );
}

export default HistoryComp;
