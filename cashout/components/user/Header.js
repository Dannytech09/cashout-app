import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthService from "@/services/auth.Service";
import Greetings from "../utils/Greetings";
import styles from "../../styles/dashboard.module.css";
import SmileIcon from "../heroIcons/SmileIcon";
import LogoutIcon from "../heroIcons/LogoutIcon";
import Link from "next/link";
import MotionText from "./MotionText";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    AuthService.getLoggedInUser()
      .then((response) => {
        setUser(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        // console.log(error)
        setError(error);
        // console.log("Error 1:", error);
      });
  }, []);

  const logoutHandler = async () => {
    await AuthService.logout();
    router.push("/login");
  };

  // useEffect(() => {
  //   const user = JSON.parse(sessionStorage.getItem("user"));
  //   setUser(user);
  //   console.log(user)
  // }, []);

  return (
    // <div>
    <div className="justify-content-between ">
      <div className={styles.headerCon}>
        <div className="flex flex-row justify-between">
          {user && (
            <div className="ml-10 mt-0 p-2 h-10 w-[35%] sm:w-[30.2%] md:w-[20.9%] xl:w-[12.8%] bg-slate-100 sm:border-2 border-2 border-x-0 border-r-2  border-solid hover:border-dotted">
              <h2 className="text-sm sm:text-xs font-bold">
                &#8358; {user.balance.$numberDecimal}
              </h2>
              {error && <p>Error fetching balance</p>}
            </div>
          )}
          <div
            onClick={logoutHandler}
            className="fixed-right sm:mr-4 md:mr-4 z-50 border-red-2 p-2 mr-4 h-10 w-10 bg-red-500"
          >
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
              person upgrade his/her account to Partner&apos;s Account Type
            </p>
            <div className="flex w-screen justify-center gap-5 mt-5">
              <div className="border ml-2 text-sm border-solid border-secondary p-2 rounded-2xl bg-secondary">
                <Link href={"/user/fundWallet"}>
                  <button className={styles.fundWallet}>Fund Wallet</button>
                </Link>
              </div>
              <div className="border mr-2 text-sm border-solid border-secondary p-2 rounded-2xl bg-secondary">
                <Link href={"/user/history"}>
                  <button className={styles.myTransact}>My Transactions</button>
                </Link>
              </div>
            </div>
          </div>
            )}
      </div>
      <MotionText text="Updated codes - Data balance checkers- MTN - *321*3*3#, Glo - *127*0#, Airtel - *323#, 9mobile SME - *917*9#, 9mobile gifting - *228#" />
    </div>
    // </div>
  );
}
