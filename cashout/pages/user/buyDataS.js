import React from "react";
import BuyDataSComp from "@/components/user/BuyDataS";
import { getUserIdAndToken } from "@/Utils/authCookies";
import Layout from "@/components/user/Layout";
import { buyDataSGetHandler } from "../api/user/buydatas";

export async function getServerSideProps(ctx) {
  const { token, userId } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }


  try {
    const response = await buyDataSGetHandler(ctx);
    const networkData = response?.data?.networkDataS;
    const beneficiary = response?.data?.beneficiary?.details;
    const errorGSMessage = response?.error;

    if(!userId) {
      return {
        props: {
          errorGSMessage: "Your ID seems to be null"
        }
      }
    }

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
    } else if (errorGSMessage === "Data1 disabled, please check data2") {
      return {
        redirect: {
          destination: "/user/buyData",
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
    if (error.code === "ERR_TIMEOUT") {
      return {
        props: {
          networkData: null,
          beneficiary: null,
          error: "Network Error",
        },
      };
    } else {
      return {
        props: {
          networkData: null,
          beneficiary: null,
          error: error,
        },
      };
    }
  }
}

export default function BuyDataSPage({
  errorGSMessage,
  networkData,
  beneficiary,
}) {
  return (
    <Layout>
      <BuyDataSComp
        errorGSMessage={errorGSMessage}
        networkData={networkData}
        beneficiary={beneficiary}
      />
    </Layout>
  );
}
