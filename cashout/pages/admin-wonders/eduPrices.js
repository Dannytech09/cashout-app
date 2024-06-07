import React from "react";
import { getUserIdAndToken } from "@/Utils/authCookies";
import UpdateEduPrices from "@/components/admin/EduPrices";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

// SS
function EduPrices() {
  return (
    <div>
      <UpdateEduPrices />
    </div>
  );
}

export default EduPrices;
