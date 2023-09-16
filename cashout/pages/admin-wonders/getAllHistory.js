import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import {
  aExpireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import AllPurchases from "@/components/admin/GetAllHistory";
import { useRouter } from "next/router";
import { adminAuthGuard } from "@/Utils/authGuard";

const BASE_URL = `${API_BASE_URL}/admin`;

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

// call stack exceeded. Hence, alternating structure
function GetAllPurchasesComp(ctx) {
  const router = useRouter();
  const { token } = getUserIdAndToken(ctx);
  adminAuthGuard(ctx, router);

  const [allPurchases, setAllDataPurchased] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState("");
  const [rCount, setRCount] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/purchases/getAllPurchases`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response);
        if (response.data.code === "000") {
          setAllDataPurchased(response.data.data);
          setRCount(response.data.returnedCount);
          setCount(response.data.totalCount);
        } else {
          setAllDataPurchased([]);
          setRCount("");
          setCount("");
        }
      } catch (error) {
        // console.log(error);
        if (
          error.response.data.error === "Invalid token." ||
          error.response.data.error === "Token has been revoked or expired." ||
          error.response.data.error === "Forbidden!"
        ) {
          sessionStorage.clear();
          aExpireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        } else if (error.response.data.error) {
          setError(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, ctx, token]);

  if (redirecting) {
    return (
      <div className="text-sm bg-red-600">
        Session expired redirecting to login...
      </div>
    );
  }

  return (
    <>
      <AllPurchases
        error={error}
        allPurchases={allPurchases}
        loading={loading}
        count={count}
        rCount={rCount}
      />
    </>
  );
}

export default GetAllPurchasesComp;
