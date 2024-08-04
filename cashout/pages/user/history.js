import React from "react";
import HistoryComp from "@/components/user/History";
import { getUserIdAndToken } from "@/Utils/authCookies";
import Layout from "@/components/user/Layout";
import { allMyPurchasesHandler } from "../api/user/history";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }

  try {
    const response = await allMyPurchasesHandler(ctx);
    const myPurchases = response;
    const errorGSMessage = response?.error;

    // console.log("err response", errorGSMessage);
    // console.log("p response", myPurchases);
    if (
      response.statusMessage === "OK" ||
      response.statusCode === 200 ||
      response.success === true
    ) {
      return {
        props: {
          myPurchases: myPurchases,
          error: null,
        },
      };
    } else if (
      errorGSMessage === "Invalid token." ||
      errorGSMessage === "Token has been revoked or expired." ||
      errorGSMessage === "Oops! Bad Request !"
    ) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else if (errorGSMessage === "Record not found") {
      return {
        props: {
          myPurchases: null,
          error: errorGSMessage || null,
        },
      };
    } else {
      // Handle unexpected cases
      return {
        props: {
          myPurchases: myPurchases || null,
          error: "Unexpected error occurred.",
        },
      };
    }
  } catch (error) {
    // console.log("err l", error)
    return {
      props: {
        myPurchases: null,
        error: error,
      },
    };
  }
}

export default function History({ errorGSMessage, myPurchases }) {
  return (
    <Layout>
      <HistoryComp errorGSMessage={errorGSMessage} myPurchases={myPurchases} />
    </Layout>
  );
}
