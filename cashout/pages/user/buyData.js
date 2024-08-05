import React from "react";
import { getUserIdAndToken } from "@/Utils/authCookies";
import Layout from "@/components/user/Layout";
import { buyDataGetHandler } from "../api/user/buydata";
import BuyDataComp from "@/components/user/BuyData";

export async function getServerSideProps(ctx) {
  let errorGSMessage;
  try {
  const { userId, token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }

  if (!userId || userId === null) {
    return {
      props: {
        errorGSMessage: "Unable to retrieve your ID🤔",
      },
    };
  }

    const response = await buyDataGetHandler(ctx);
    const networkData = response?.data?.networkData;
    const beneficiary = response?.data?.beneficiary?.details;
    errorGSMessage = response?.error;

    // console.log("err response", errorGSMessage);
    // console.log("b response", beneficiary);
    // console.log("network response", networkData);
    if (errorGSMessage === "Unauthorized to access this route.") {
      return {
        props: {
          networkData: null,
          beneficiary: null,
          errorGSMessage: "Something seems unusual. Please logout and login",
        },
      };
    } else if (
      response?.data?.success === true
    ) {
      return {
        props: {
          networkData: networkData,
          beneficiary: beneficiary === undefined ? null : beneficiary,
          errorGSMessage: null,
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
    } else if (errorGSMessage === "Data2 disabled, please check data1") {
      return {
        redirect: {
          destination: "/user/dashboard",
          permanent: false,
        },
      };
    } else if (response.error) {
      return {
        props: {
          networkData: null,
          beneficiary: null,
          errorGSMessage: errorGSMessage,
        },
      };
    } else {
      // Handle unexpected cases
      return {
        props: {
          networkData: null,
          beneficiary: null,
          errorGSMessage: "Unexpected error occurred.",
        },
      };
    }
  } catch (error) {
    // console.log("err l", error)
    errorGSMessage = error?.response?.data?.error;
    if (error.code === "ERR_TIMEOUT") {
      return {
        props: {
          networkData: null,
          beneficiary: null,
          errorGSMessage: "Network Error",
        },
      };
    } else {
      return {
        props: {
          networkData: null,
          beneficiary: null,
          errorGSMessage: errorGSMessage,
        },
      };
    }
  }
}

export default function BuyDataPage({
  errorGSMessage,
  networkData,
  beneficiary,
}) {
  return (
    <Layout>
      <BuyDataComp
        errorGSMessage={errorGSMessage}
        networkData={networkData}
        beneficiary={beneficiary}
      />
    </Layout>
  );
}
