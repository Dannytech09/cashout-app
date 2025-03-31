import axios from "axios";
import React from "react";
import BuyDataComp from "@/components/user/BuyData";
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
      const networkData = response?.data?.data;
      const beneficiary = response?.data?.beneficiary?.details;

      // console.log("err response", response);
      // console.log("b response", beneficiary);
      // console.log("network response", networkData);
      if (response?.data?.success === true) {
        return {
          props: {
            networkData: networkData ?? null,
            beneficiary: beneficiary === undefined ? null : beneficiary,
            errorGSMessage: null,
          },
        };
      } else {
      // Handle unexpected cases
      return {
        props: {
          networkData: null,
          beneficiary: null,
          errorGSMessage: null,
        },
      };
    }
  } catch (error) {
    // console.log("err l", error)
    let errorGSMessage = error?.response?.data?.error ?? null

    if (
      errorGSMessage === "Invalid token." ||
      errorGSMessage === "Token has been revoked or expired." ||
      errorGSMessage === "Oops! Bad Request !" || null || "Unauthorized to access this route." || "Not authorized to access this route.."
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
