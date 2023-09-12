import React from "react";
import BuyData from "@/components/user/BuyData";
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

export default function BuyDataPage() {
  return (
    <div>
      <BuyData />
    </div>
  );
}