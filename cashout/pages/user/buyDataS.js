import axios from "axios";
import React from "react";
import BuyDataSComp from "@/components/user/BuyDataS";
import Layout from "@/components/user/Layout";
import API_BASE_URL from "@/apiConfig";
// import { getUserIdAndToken } from "@/Utils/authCookies";

const BASE_URL = `${API_BASE_URL}/vend`;

export async function getServerSideProps(ctx) {
  let errorGSMessage;
  try {
    const token = ctx.req.cookies.token;
    const userIdCookie = ctx.req.cookies.u;
    const userIdOb = JSON.parse(userIdCookie);
    const userId = userIdOb.id;
    // console.log(userId)

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

    const response = await axios.get(`${BASE_URL}/${userId}/getDatas`, {
      headers: {
        Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const networkData = response?.data?.networkDataS;
      const beneficiary = response?.data?.beneficiary?.details;

      // console.log("err response", errorGSMessage);
      // console.log("b response", beneficiary);
      // console.log("network response", networkData);
      if (response?.data?.success === true) {
        return {
          props: {
            networkData: networkData,
            beneficiary: beneficiary,
            errorGSMessage: null,
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

    if (
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
    } else if (errorGSMessage === "Unauthorized to access this route.") {
      return {
        props: {
          networkData: null,
          beneficiary: null,
          errorGSMessage: "Something seems unusual. Please logout and login",
        },
      };
    } else if (errorGSMessage === "Data1 disabled, please check data2") {
      return {
        redirect: {
          destination: "/user/buyData",
          permanent: false,
        },
      };
    } else if (errorGSMessage) {
      return {
        props: {
          networkData: null,
          beneficiary: null,
          errorGSMessage: errorGSMessage,
        },
      };
    } else if (error.code === "ERR_TIMEOUT") {
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
