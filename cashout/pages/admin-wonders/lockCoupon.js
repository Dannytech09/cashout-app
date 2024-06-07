import React from "react";
import LockCouponComp from "@/components/admin/LockCoupon";
import { getUserIdAndToken } from "@/Utils/authCookies";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

const LockDataCoupon = () => {
  return (
    <div>
      <LockCouponComp />
    </div>
  );
};

export default LockDataCoupon;
