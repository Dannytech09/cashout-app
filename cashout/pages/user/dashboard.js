import Head from "next/head";
import SubMain from "@/components/user/SubMain";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";
import Layout from "../../components/user/Layout";
import withAuth from "../../hocs/withAuth";
import SubFooter from "@/components/user/SubFooter";
import UseTokenExpiration from "@/components/utils/TokenExp";
import Link from "next/link";

function Dashboard() {

  UseTokenExpiration();


  return (
    <div className="flex overflow-x-hidden">
      <Head>
        <title>My Dashboard</title>
        <meta name="description" content="Best Data and airtime Website" />
        <Link rel="icon" href="/favicon.png"/>
      </Head>

      <div className="sm:w-40">
      <Layout>
        <div className="">
          <div className="">
            <Header />
          </div>
          <div className="">
            <SubMain/>
          </div>
          <div className="">
            <Footer />
          </div>
          <div className="">
            <SubFooter/>
          </div>
        </div>
      </Layout>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
