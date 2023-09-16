import React, { useState, useEffect } from "react";
import MyPurchases from "@/components/user/userJsx/History";
import { useRouter } from "next/router";
import { allMyPurchasesHandler } from "@/pages/api/user/history";
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


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await allMyPurchasesHandler();
      // console.log(response.data.data);
      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired."
      ) {
        removeUserSession();
        expireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if(response.error) {
        setErrorMessage(response.error);
      } else {
         setCheckTransaction(true);
      setMyPurchases(response);
      }
      // setLoading(false);
    } catch (error) {
      // console.log(error)
      throw new Error(`An error occurred ${error}`)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      />
    </div>
  );
}

export default HistoryComp;
