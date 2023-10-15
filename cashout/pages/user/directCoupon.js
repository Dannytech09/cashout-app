import React from 'react'
import DirectCouponComp from '@/components/user/DirectCoupon'
import { getUserIdAndToken } from "@/Utils/authCookies";
import Layout from '@/components/user/Layout';

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
  <Layout>
    <DirectCouponComp/>
  </Layout>
  )
}