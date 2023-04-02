import React from "react";
import Layout from "../../components/user/Layout";
import withAuth from "../../hocs/withAuth";

const buyAirtime = () => {
  return <Layout>buyAirtime</Layout>;
};

export default withAuth(buyAirtime);
