import React from "react";
import { getUserIdAndToken } from "@/Utils/authCookies";
import Layout from "@/components/user/Layout";
import { buyDataGetHandler } from "../api/user/buydata";
import BuyDataComp from "@/components/user/BuyData";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }

  try {
    const response = await buyDataGetHandler(ctx);
    const networkData = response?.data?.networkData;
    const beneficiary = response?.data?.beneficiary?.details;
    const errorGSMessage = response?.error;

    // console.log("err response", errorGSMessage);
    // console.log("b response", beneficiary);
    // console.log("network response", networkData);
    if (
      response.statusMessage === "OK" ||
      response.statusCode === 200 ||
      response.success === true
    ) {
      return {
        props: {
          networkData: networkData,
          beneficiary: beneficiary,
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
          error: errorGSMessage,
        },
      };
    } else {
      // Handle unexpected cases
      return {
        props: {
          networkData: networkData || null,
          beneficiary: beneficiary || null,
          error: "Unexpected error occurred.",
        },
      };
    }
  } catch (error) {
    // console.log("err l", error)
    return {
      props: {
        networkData: null,
        beneficiary: null,
        error: error,
      },
    };
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
