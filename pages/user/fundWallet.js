import React from "react";
import Layout from "../../components/user/Layout";
import withAuth from "../../hocs/withAuth";

const fundWallet = () => {
  return <Layout>fundWallet</Layout>;
};

export default withAuth(fundWallet);
