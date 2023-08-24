import UpdatePrices from "@/components/admin/SetDataPrices";
import withAuth from "@/hocs/withAuth";
import React from "react";

// SS
function DataPricesS() {
  return (
    <div>
      <UpdatePrices />
    </div>
  );
}

export default withAuth(DataPricesS);
