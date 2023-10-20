import React from "react";
import { getUserIdAndToken } from "@/Utils/authCookies";
import NotificationComp from "@/components/admin/Notice";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

export default function ANotice() {
  return (
    <div>
      <NotificationComp />
    </div>
  );
}
