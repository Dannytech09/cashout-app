import React from 'react'
import TvSubComp from '@/components/user/TvSub';
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

export default function TvSub() {
  return (
    <Layout>
      <TvSubComp />
    </Layout>
  )
}