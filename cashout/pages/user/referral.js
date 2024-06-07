import React from 'react'
import { getUserIdAndToken } from "@/Utils/authCookies";
import Layout from '@/components/user/Layout';
import ReferralInfoComp from '@/components/user/referral';

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
}

export default function Referral() {
  return (
    <Layout>
      <ReferralInfoComp />
    </Layout>
  )
}