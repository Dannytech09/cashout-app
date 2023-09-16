import React from 'react';
import DataLocker from "@/components/admin/LockDataS";
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

function LockDataSS() {
  return (
    <div>
     <DataLocker />
    </div>
  )
}

export default LockDataSS;
