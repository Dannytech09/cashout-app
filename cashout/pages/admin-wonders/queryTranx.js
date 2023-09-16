import React from 'react'
import QueryTranxComp from '@/components/admin/QueryTranx'
import { getUserIdAndToken } from '@/Utils/authCookies';

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx)

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}


export default function QueryTranx() {
  return (
    <div>
    <QueryTranxComp />
    </div>
  )
}
