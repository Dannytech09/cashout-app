import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Main from "@/components/user/Main";
import SubMain from "@/components/user/SubMain";
import Section from "@/components/user/Section";
import Link from "next/link";
import Header from "@/components/user/Header";
import Layout from "@/components/user/Layout";
import API_BASE_URL from "@/apiConfig";
import axios from "axios";
import {
  expireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import Footer from "@/components/user/Footer";
import UserCon from "@/components/user/UserCon";
// import Sidebar from "@/components/user/Sidebar";

const BASE_URL = `${API_BASE_URL}/api/v1/auth`;
function Dashboard({ ctx, user, error }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // console.log("dispatch ran")
    dispatch(setUser(user));
    if (
      error === "Invalid token." ||
      error === "Token has been revoked or expired."
    ) {
      removeUserSession();
      expireSessionAndRedirect(ctx, router);
      setRedirecting(true);
    }
  }, [error, ctx, router, dispatch]);

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  return (
    <Layout>
      <div className="flex overflow-x-hidden">
        <Head>
          <title>My Dashboard</title>
          <meta name="description" content="Best Data and airtime Website" />
          {/* client side exception occur fixed */}
          <meta name="next-head-count" content="5" />
          <Link rel="icon" href="/john_data_logo_1.png" />
        </Head>

        <div>
          {/* <div>
            <Sidebar user={user}/>
          </div> */}
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
            <SubMain user={user} />
          </div>
          <div>
            <UserCon user={user} />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </Layout>
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
    // console.log(user);
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
