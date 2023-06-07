import Head from "next/head";
import SubMain from "@/components/user/SubMain";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";
import Main from "../../components/user/Main";
import Layout from "../../components/user/Layout";
import withAuth from "../../hocs/withAuth";
import SubFooter from "@/components/user/SubFooter";

function Dashboard() {
  // const me = sessionStorage.getItem("user");
  // console.log(me.balance.$numberDecimal);

  return (
    <div className="flex overflow-x-hidden">
      <Head>
        <title>My Dashboard</title>
      </Head>

      <div className="sm:w-40">
      <Layout>
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
