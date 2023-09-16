import React from "react";
import UpdatePrices from "@/components/admin/DataPricesS";
import { getUserIdAndToken } from "@/Utils/authCookies";

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
function DataPricesS() {
  return (
    <div>
      <UpdatePrices />
    </div>
  );
}

export default DataPricesS;
