import { useEffect } from "react";
import { useRouter } from "next/router";
import Card from "@/components/utils/Card";
import Greetings from "@/components/utils/Greetings";
import { getUsersHandler } from "@/pages/api/admin/usersdata";
import { Alogout } from "./Logout";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import { adminAuthGuard } from "@/Utils/authGuard";

const UsersData = ({
  ctx,
  loading,
  setLoading,
  users,
  setUsers,
  totalBalance,
  setTotalBalance,
  totalBlocked,
  setTotalBlocked,
}) => {
  const router = useRouter();
  adminAuthGuard(ctx, router);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsersHandler();

        // console.log(response.data)
        if (
          response.data.error === "Invalid token." ||
          response.data.error === "Token has been revoked or expired."
        ) {
          sessionStorage.clear();
          aExpireSessionAndRedirect(ctx, router);
        } else if (response.data.success === true) {
          // Count users
          setUsers(response.data.count);

          // total bal
          const balances = response.data.data.map((user) =>
            parseFloat(user.balance.$numberDecimal)
          );
          const total = balances.reduce((acc, curr) => acc + curr, 0);
          setTotalBalance(total);

          // total blocked
          const blocked = response.data.data.map((user) => user.blocked);
          const totalAllBlocked = blocked.reduce((acc, curr) => acc + curr, 0);
          setTotalBlocked(totalAllBlocked);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
        if (error) {
          throw new Error(`An error occurred ${error}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between w-screen">
        <h1 className="m-auto">Welcome Back Admin!</h1>
        {loading ? <p className=" text-xs text-red-500">Loading..</p> : null}
        <div className="hover:bg-red-600 hover:border-blue-500">
          <Alogout />
        </div>
      </div>
      <br />
      <div className="text-center">
        <Greetings /> Admin
      </div>
      <hr className="w-90" />
      {/* <br/> */}
      <div>
        <Card className="lg:ml-20 lg:mr-20 sm:h-20 h-30 sm:mb-10 border-white-400 border-4 rounded-lg p-4 mt-5 bg-gradient-to-t from-gray-200 to-gray-500">
          <div className="w-90 m-2 h-20 lg:w-80 border-2 border-blue-900 rounded-md bg-blue-900">
            <h1 className="ml-2 pt-2">All Users Funds</h1>
            {loading ? (
              <p className=" text-xs text-red-500">Loading...</p>
            ) : (
              <p>{totalBalance}</p>
            )}
          </div>
        </Card>
        <Card className="lg:ml-20 lg:mr-20 sm:h-20 h-30 sm:mb-10 border-white-400 border-4 rounded-lg p-4 mt-5 bg-gradient-to-t from-gray-200 to-gray-500">
          <div className="lg:float-right w-90 m-2 h-20 lg:w-80 border-2 border-blue-900 rounded-md bg-blue-900">
            <h1 className="ml-2 pt-2">Total Users</h1>
            {users}
          </div>
        </Card>
        <Card className="lg:ml-20 lg:mr-20 sm:h-20 h-30 sm:mb-10 border-white-400 border-4 rounded-lg p-4 mt-5 bg-gradient-to-t from-gray-200 to-gray-500">
          <div className="w-90 m-2 h-20 lg:w-80 border-2 border-blue-900 rounded-md bg-blue-900">
            <h1>Blocked Users</h1>
            {totalBlocked}
          </div>
        </Card>
        <Card className="lg:ml-20 lg:mr-20 sm:h-20 h-30 sm:mb-10 border-white-400 border-4 rounded-lg p-4 mt-5 bg-gradient-to-t from-gray-200 to-gray-500">
          <div className="lg:float-right object-right w-90 m-2 h-20 lg:w-80 border-2 border-blue-900 rounded-md bg-blue-900">
            <h1>Set Data Price</h1>
            <h1>Set Airtime Price</h1>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UsersData;
