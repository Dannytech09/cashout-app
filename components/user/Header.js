import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthService from "@/services/auth.Service";
import Greetings from "../utils/Greetings";
import styles from "../../styles/dashboard.module.css";
import SmileIcon from "../heroIcons/SmileIcon";
import LogoutIcon from "../heroIcons/LogoutIcon";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState();

  const logoutHandler = () => {
    AuthService.logout();
    router.push("/login");
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    // <div>
    <div className="justify-content-between ">
      <div className={styles.headerCon}>
        <div className="flex flex-row justify-between">
          {user && (
            <div className="ml-10 mt-0 p-2 h-10 w-[25%] sm:w-[27.2%] md:w-[16.9%] xl:w-[14.8%] bg-slate-100 sm:border-2 border-2 border-x-0 border-r-2  border-solid hover:border-dotted">
              <h2 className="text-sm sm:text-xs font-bold">
                &#8358; {user.balance.$numberDecimal}
              </h2>
            </div>
          )}
          <div onClick={logoutHandler} className="fixed-right sm:mr-4 md:mr-4 z-50 border-red-2 p-2 h-10 w-10 bg-red-500">
            <LogoutIcon />
          </div>
        </div>
        <div className="flex justify-center text-center lg:mt-[-2ch]">
          <h1 className="text-lg">
            <Greetings />
          </h1>
          <span className="fill-blue-900 stroke-blue-600">
            <SmileIcon />
          </span>
        </div>
        <br />

        {user && (
          <div className="text-center">
            <h2 className={styles.welBack}>Welcome Back {user.firstName}!</h2>
            <p className="mt-2 p-2 text-xs text-center">
              Refer people to CashOutPlug and earn 1,000 naira immediately the
              person upgrade his/her account to Partner's Account Type
            </p>
            <div className="flex w-screen justify-center gap-5 mt-5">
              <div className="border ml-2 text-sm border-solid border-secondary p-2 rounded-2xl bg-secondary">
                <button className={styles.fundWallet}>Fund Wallet</button>
              </div>
              <div className="border mr-2 text-sm border-solid border-secondary p-2 rounded-2xl bg-secondary">
                <button className={styles.myTransact}>My Transactions</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    // </div>
  );
}
