import React from "react";
import BuyAirtimeComp from "@/components/user/BuyAirtime";
import { getUserIdAndToken } from "@/Utils/authCookies";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
}

export default function Buy() {
  return (
    <div>
      <BuyAirtimeComp />
    </div>
  );
}
