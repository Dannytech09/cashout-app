import React from 'react'
import { getUserIdAndToken } from '@/Utils/authCookies';
import SetPricesComp from '@/components/admin/SetPrices'

// A
export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

export default function SetPrices() {
  return (
    <div>
      <SetPricesComp />
    </div>
  )
}
