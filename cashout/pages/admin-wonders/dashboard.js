import { useState } from "react";
import Head from "next/head";
import LayoutAdmin from "../../components/admin/Layout-Admin";
import UsersData from "@/components/admin/UsersData";
import { getUserIdAndToken } from "@/Utils/authCookies";

export async function getServerSideProps(ctx) {
  const { token } = getUserIdAndToken(ctx);

  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin-wonders/login" });
    res.end();
  }
  return { props: {} };
}

const Dashboard = () => {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalBlocked, setTotalBlocked] = useState(0);

  return (
    <>
      <LayoutAdmin>
        <div className="text-slate-200 h-screen w-full overflow-x-scroll ">
          <Head>
            <title>Admin Dashboard</title>
          </Head>
          <UsersData
            loading={loading}
            setLoading={setLoading}
            users={users}
            setUsers={setUsers}
            totalBalance={totalBalance}
            setTotalBalance={setTotalBalance}
            totalBlocked={totalBlocked}
            setTotalBlocked={setTotalBlocked}
          />
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Dashboard;