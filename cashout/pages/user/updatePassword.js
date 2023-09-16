import React from 'react'
import UpdateUserPasswordComp from '@/components/user/UpdatePassword'
import { getUserIdAndToken } from '@/Utils/authCookies';

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { props: {} };
}

export default function UpdatePassword() {
  return (
    <div>
      <UpdateUserPasswordComp />
    </div>
  )
}
