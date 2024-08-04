import React, { useState } from "react";
import MyPurchases from "@/components/user/userJsx/History";
import { useRouter } from "next/router";
import {
  searchPurchases,
} from "@/pages/api/user/history";
import { removeUserSession } from "@/Utils/Common";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { authGuard } from "@/Utils/authGuard";

function HistoryComp({ctx, errorGSMessage, myPurchases}) {
  // console.log("err", errorGSMessage)
  const router = useRouter();
  authGuard(ctx, router);

  // const [myPurchases, setMyPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [checkTransaction, setCheckTransaction] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    try{
    let response;
    e.preventDefault();
    setLoading(true);
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
  } catch(error) {
    console.log("err")
  } finally {
    setLoading(false);
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
        errorGSMessage={errorGSMessage}
        handleSubmit={handleSubmit}
        setPhoneNumber={setPhoneNumber}
        phoneNumber={phoneNumber}
        searchResults={searchResults}
      />
    </div>
  );
}

export default HistoryComp;
