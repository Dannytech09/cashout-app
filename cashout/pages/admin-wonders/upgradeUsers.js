import React from 'react'
import UpgradeUsersComp from '@/components/admin/UpgradeUsers'
import { getUserIdAndToken } from '@/Utils/authCookies';

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

export default function UpgradeUsers() {
  return (
    <div>
      <UpgradeUsersComp />
    </div>
  )
}
