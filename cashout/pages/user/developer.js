import React from 'react'
import { getUserIdAndToken } from '@/Utils/authCookies';
import DeveloperComp from '@/components/user/Developer';

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
}

export default function Developer() {
  return (
    <div>
      <DeveloperComp />
    </div>
  )
}