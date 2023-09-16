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
import {
  expireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/api/v1/auth`;

function Dashboard({ ctx, user, error }) {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Check if there's an error
    if (
      error === "Invalid token." ||
      error === "Token has been revoked or expired."
    ) {
      removeUserSession();
      expireSessionAndRedirect(ctx, router);
      // console.log(error)
      setRedirecting(true);
    }
  });

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
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
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
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
    const user = response.data.data;
    // console.log(user)
    return {
      props: {
        user,
        error: null,
      },
    };
  } catch (error) {
    // console.error(error);
    return {
      props: {
        user: null,
        error: error.response.data.error,
      },
    };
  }
}
