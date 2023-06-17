import { useState } from "react";
import TotalUser from "../../components/admin/TotalUser";
import TotalBalance from "../../components/admin/TotalBalance";
import BlockedUsers from "../../components/admin/BlockedUsers";
import Card from "../../components/utils/Card";
import AuthService from "../../services/auth.Service";
import { useRouter } from "next/router";
import Head from "next/head";
import LayoutAdmin from "../../components/admin/Layout-Admin";
import Greetings from "../../components/utils/Greetings";
import withAuth from "../../hocs/withAuth";

const Dashboard = (users, totalBal, blocked) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    setLoading(true);
    await AuthService.logout();
    router.push("/admin/login");
    setLoading(false);
  };

  return (
    <>
      <LayoutAdmin>
        <div className="text-slate-200 h-screen w-full overflow-x-scroll ">
          <Head>
            <title>Admin Dashboard</title>
          </Head>

          <div className="flex justify-between p-2 w-screen">
            <h1 className="m-auto">Welcome Back Admin!</h1>
            {loading ? <p className=" text-xs">Logging out...</p> : null}
            <div className="border p-1 hover:bg-red-600 hover:border-blue-500">
              <button
                onClick={logoutHandler}
                className="mr-2 text-xs hover:text-blue-500 text-green-300"
              >
                Logout
              </button>
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
                <TotalBalance totalBal={totalBal} />
              </div>
            </Card>
            <Card className="lg:ml-20 lg:mr-20 sm:h-20 h-30 sm:mb-10 border-white-400 border-4 rounded-lg p-4 mt-5 bg-gradient-to-t from-gray-200 to-gray-500">
              <div className="lg:float-right w-90 m-2 h-20 lg:w-80 border-2 border-blue-900 rounded-md bg-blue-900">
                <h1 className="ml-2 pt-2">Total Users</h1>
                <TotalUser users={users} />
              </div>
            </Card>
            <Card className="lg:ml-20 lg:mr-20 sm:h-20 h-30 sm:mb-10 border-white-400 border-4 rounded-lg p-4 mt-5 bg-gradient-to-t from-gray-200 to-gray-500">
              <div className="w-90 m-2 h-20 lg:w-80 border-2 border-blue-900 rounded-md bg-blue-900">
                <h1>Blocked Users</h1>
                <BlockedUsers blocked={blocked} />
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
      </LayoutAdmin>
    </>
  );
};

export default withAuth(Dashboard);

// {
/* 
// return (
//   <div className="text-slate-200">
//     <Head>
//       <title>Admin Dashboard</title>
//     </Head>
//     <h1 className="">Welcome to Dashboard Page</h1>
//     <br />
//     <br />
//     <button onClick={logoutHandler} className={styles.logout} >Logout</button>
//     <div className="grid grid-cols md:grid-cols-6 gap-10 justify-center mt-10">
//       {user && (
//         <div
//           key={user._id}
//           className="border shadow-md p-6 flex flex-col justify-center"
//         >
//           <h1 className="text-1xl text-slate-300 mb-2">
//             First Name: {user.firstName} Last Name: {user.lastName}
//           </h1>
//           <p className="text-1xl text-slate-300 mb-2">Email: {user.email}</p>
//           <p className="text-1xl text-slate-300 mb-2">Username: {user.username}</p>
//           <p className="text-1xl text-slate-300 mb-2">Phone Number: {user.phoneNumber}</p>
//         </div>
//       )}
//     </div>
//   </div>
// ); */
// }
