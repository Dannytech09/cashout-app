import React from 'react';
import { getUserIdAndToken } from "@/Utils/authCookies";
import Layout from '@/components/user/Layout';
import BuyEduPinComp from '@/components/user/BuyEduPin';

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
}

export default function BuyEduPinPage() {
  return (
<Layout> 
  <BuyEduPinComp />
</Layout>
  )
}