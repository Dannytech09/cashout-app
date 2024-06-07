import React from 'react'
import GetSingleUserComp from '@/components/admin/GetSingleUser'
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

export default function GetSingleUser() {
  return (
    <div>
      <GetSingleUserComp />
    </div>
  )
}
