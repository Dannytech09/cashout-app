import React from "react";
import AnyNameForDefaultExport from "@/components/admin/SetCouponPrices";
import { getUserIdAndToken } from "@/Utils/authCookies";

// 1
export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

const SetPrices = () => {
  return (
    <div>
      <AnyNameForDefaultExport />
    </div>
  );
};

export default SetPrices;
