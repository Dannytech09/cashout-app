import React from 'react';
import { getUserIdAndToken } from '@/Utils/authCookies';
import TvSubPrices from '@/components/admin/tvSubPrices';

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

function tvSubPrices() {
  return (
    <div>
        <TvSubPrices />
    </div>
  )
}

export default tvSubPrices;
