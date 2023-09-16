import React from 'react'
import GetAllUsersComp from '@/components/admin/GetAllUsers'
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

function getAllUsers() {
  return (
    <div>
      <GetAllUsersComp />
    </div>
  )
}

export default getAllUsers