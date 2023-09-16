import Head from "next/head";
import Main from "@/components/user/Main";
import SubMain from "@/components/user/SubMain";
import Section from "@/components/user/Section";
// import UseTokenExpiration from "@/components/utils/TokenExp";
import Link from "next/link";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import withAuth from "@/hocs/withAuth";
import Layout from "@/components/user/Layout";

function Dashboard() {
  // UseTokenExpiration();

  return (
    <div className="flex overflow-x-hidden">
      <Head>
        <title>My Dashboard</title>
        <meta name="description" content="Best Data and airtime Website" />
        {/* client side exception occur fixed */}
        <meta name="next-head-count" content="5" />
        <Link rel="icon" href="/favicon.png" />
      </Head>

      <div className="sm:w-40">
        <Layout>
          <div>
            <div>
              <Header />
            </div>
            <div>
              <Main />
            </div>
            <div>
              <Section />
            </div>
            <div>
              <SubMain />
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
