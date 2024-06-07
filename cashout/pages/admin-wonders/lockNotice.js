import React from 'react';
import { getUserIdAndToken } from '@/Utils/authCookies';
import NoticeLocker from '@/components/admin/LockNotice';

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

function LockNoticePage() {
  return (
    <div>
     <NoticeLocker />
    </div>
  )
}

export default LockNoticePage;
