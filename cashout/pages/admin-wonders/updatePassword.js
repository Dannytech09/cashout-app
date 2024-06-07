import React from "react";
import { getUserIdAndToken } from "@/Utils/authCookies";
import UpdateAPasswordComp from "@/components/admin/UpdatePassword";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

export default function UpdatePasswordPage() {
  return (
    <div>
      <UpdateAPasswordComp />
    </div>
  );
}
