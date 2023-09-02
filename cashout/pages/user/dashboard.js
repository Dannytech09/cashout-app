import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Main from "@/components/user/Main";
import SubMain from "@/components/user/SubMain";
import Section from "@/components/user/Section";
import Link from "next/link";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import Layout from "@/components/user/Layout";
import API_BASE_URL from "@/apiConfig";
import axios from "axios";
import nookies from "nookies";

const BASE_URL = `${API_BASE_URL}/api/v1/auth`;

function Dashboard({ user, error }) {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Check if there's an error
    if (error) {
      alert(error);
      // After 5sec edirect to the login
      const redirectTimeout = setTimeout(() => {
        setRedirecting(true);
        router.push("/login");
      }, 1000);
      // Clear the timeout
      return () => clearTimeout(redirectTimeout);
    }
  }, [error, router]);

  if (redirecting) {
    return <p className="text-sm">Redirecting to login...</p>;
  }

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
              <Header user={user} />
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

export default Dashboard;

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = cookies.token || null;
  const currentPath = ctx.req.url;

  if (token) {
    if (currentPath !== "/user/dashboard") {
      return {
        redirect: {
          destination: "/user/dashbord",
          permanent: false,
        },
      };
    }
  } else if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("serverRes", response.data.data);
    const user = response.data.data;
    return {
      props: {
        user,
        error: null,
      },
    };
  } catch (error) {
    // console.error(error.response.data.error);
    return {
      props: {
        user: null,
        error: error.response.data.error,
      },
    };
  }
}
