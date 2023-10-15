import React from 'react';
import EduLocker from '@/components/admin/EduLock';
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

function LockEdu() {
  return (
    <div>
     <EduLocker />
    </div>
  )
}

export default LockEdu;
