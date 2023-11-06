import React from 'react'
import { getUserIdAndToken } from '@/Utils/authCookies';
import Layout from '@/components/user/Layout';
import WithdrawalBonusComp from '@/components/user/WithdrawalBonus';

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx)

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
}

export default function UpdateDetails() {
  return (
    <Layout>
      <WithdrawalBonusComp />
    </Layout>
  )
}
