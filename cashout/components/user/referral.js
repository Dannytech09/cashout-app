import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { removeUserSession } from "@/Utils/Common";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { authGuard } from "@/Utils/authGuard";
import { referralInfoHandler } from "@/pages/api/user/referral";
import MyReferral from "./userJsx/referral";

function ReferralInfoComp(ctx) {
  const router = useRouter();
  authGuard(ctx, router);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [myReferrals, setMyReferrals] = useState([]);
  const [overView, setOverView] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await referralInfoHandler();
        // console.log(response.data);
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
          setMyReferrals(response.data.rUserDetails);
          setOverView(response.data)
        }
        setLoading(false);
      } catch (error) {
        // console.log(error)
        throw new Error(`An error occurred ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ctx, router]);

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  return (
    <div>
      <MyReferral
        myReferrals={myReferrals}
        overView={overView}
        loading={loading}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default ReferralInfoComp;
