import React, { useState, useEffect } from "react";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import { useRouter } from "next/router";
import { adminAuthGuard } from "@/Utils/authGuard";
import { allReferralsAHandler } from "@/pages/api/admin/referralA";
import AllReferrals from "./adminjsx/AllReferral";

// call stack exceeded. Hence, alternating structure
function GetAllReferralInfoComp(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);

  const [allReferralInfo, setAllReferralInfo] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await allReferralsAHandler();
        // console.log(response);
        if (
          response.error === "Invalid token." ||
          response.error === "Token has been revoked or expired." ||
          response.error === "Forbidden!"
        ) {
          sessionStorage.clear();
          aExpireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        } else if (response.error) {
          setError(response.error);
        } else if (response.code === "000") {
          setAllReferralInfo(response.referralHistory
            );
        } else {
          setAllReferralInfo([]);
        }
      } catch (error) {
        // console.log(error);
        throw new Error("An error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, ctx]);

  if (redirecting) {
    return (
      <div className="text-sm bg-red-600">
        Session expired redirecting to login...
      </div>
    );
  }

  return (
    <>
      <AllReferrals
        error={error}
        allReferralInfo={allReferralInfo}
        loading={loading}
      />
    </>
  );
}

export default GetAllReferralInfoComp;
