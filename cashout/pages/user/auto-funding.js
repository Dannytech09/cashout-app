import React from "react";
import AutoFundingComp from "@/components/user/AutoFunding";
import { getUserIdAndToken } from "@/Utils/authCookies";
import Layout from "@/components/user/Layout";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    // console.log("getServerSideProps ran")
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  // The page will render Comp if authenticated
  return { props: {} };
}

export default function AutoFunding() {
  return (
    <Layout>
      <AutoFundingComp />
    </Layout>
  );
}
