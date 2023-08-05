import Head from "next/head";
import Main from "@/components/user/Main";
import SubMain from "../../components/user/SubMain";
import Header from "../../components/user/Header";
import Layout from "../../components/user/Layout";
import withAuth from "../../hocs/withAuth";
import Footer from "@/components/user/Footer";
import Section from "@/components/user/Section";
// import UseTokenExpiration from "@/components/utils/TokenExp";
import Link from "next/link";

function Dashboard() {
  // UseTokenExpiration();

  return (
    <div className="flex overflow-x-hidden">
       <Layout>
      <Head>
        <title>My Dashboard</title>
        <meta name="description" content="Best Data and airtime Website" />
        <Link rel="icon" href="/favicon.png" />
      </Head>

      <div className="sm:w-40">
       
          <div className="">
            <div className="">
              <Header />
            </div>
            <div className="">
              <Main />
            </div>
            <div className="">
              <SubMain/>
            </div>
            <div className="">
              <Section/>
            </div>
            <div className="">
              <Footer />
            </div>
          </div>
      </div>
        </Layout>
    </div>
  );
}

export default withAuth(Dashboard);
