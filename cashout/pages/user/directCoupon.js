import React from 'react'
import DirectCouponComp from '@/components/user/DirectCoupon'
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


export default function DirectCouponPage () {
  return (
    <div>
   <DirectCouponComp/>
    </div>
  )
}