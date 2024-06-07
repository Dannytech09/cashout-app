import React from "react";
import styles from "@/styles/QueryTransactions.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { authGuard } from "@/Utils/authGuard";

function QueryTransactions({
  ctx,
  openTranx,
  openData,
  input2Ref,
  input1Ref,
  transactions,
  checkSubmit,
  handleChangeTranxQuery,
  handleChangeDataQuery,
  handleTranxSubmit,
  handleDataSubmit,
  isButtonDisabled,
  errorMessage
}) {

  const router = useRouter();
  authGuard(ctx, router);

  return (
    // <div className="relative">
    <>
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-2xl">
          Query Transactions
        </h1>
      </div>
      <div className="mt-20 m-4 text-center text-xs">
        <p>
          This Page helps you check if a particular transaction was successfully
          processed or failed for Airtime, Cable and Electricity bills. Kindly
          get your tracking/transaction ID handy{" "}
        </p>
      </div>
      {errorMessage && (
            <div className="p-3 m-3 text-xs mt-[-2ch] border border-red-700 bg-red-700">
              <p className="text-white text-center">{errorMessage}</p>
            </div>
          )}
      <div className="mt-[3ch]">
        <div className="flex flex-col gap-4 p-4">
          <div>
            <div className="border rounded-md bg-yellow-100 p-2 text-center">
              <button
                value={openTranx}
                onClick={handleChangeTranxQuery}
                className="border rounded-md bg-green-100 p-2 text-center"
              >
                <h2>Query Airtime/Cable/Electricity</h2>
              </button>
            </div>
            {openTranx && (
              <form
                className="text-center flex flex-col"
                onSubmit={handleTranxSubmit}
              >
                <h2>Enter Transaction ID</h2>
                <input
                  placeholder="Transaction id"
                  className="w-[30ch] mx-auto border-2 border-blue-200 hover:border-blue-500 "
                  ref={input1Ref}
                />
                <button
                  className="border border-slate-500 mx-auto bg-slate-900 p-1 mt-2"
                  type="submit"
                >
                  <h3 className="text-white">Submit</h3>
                </button>
              </form>
            )}
          </div>
          {checkSubmit && transactions && (
            <div className="border border-gray-50 bg-gray-50 p-2">
              <ul className="text-center text-xs">
                <li>
                  Service: <span>{transactions.Product_Name}</span>
                </li>
                <li>
                  Unique Number: <span>{transactions.Unique_Element}</span>
                </li>
                <li>
                  Amount: <span>{transactions.Amount}</span>
                </li>
                <li>
                  Status:{" "}
                  <span className="text-green-500">{transactions.Status}</span>
                </li>
                <li>
                  Message: <span>{transactions.message}</span>
                </li>
                <li>
                  Date: <span>{transactions.Date}</span>
                </li>
              </ul>
            </div>
          )}

          <div>
            <div className="border rounded-md bg-yellow-100 p-2 text-center">
              <button
                value={openData}
                onClick={handleChangeDataQuery}
                className="border rounded-md bg-green-100 p-2 text-center"
              >
                <h2>Query Data</h2>
              </button>
            </div>
            {openData && (
              <form
                className="text-center flex flex-col"
                onSubmit={handleDataSubmit}
              >
                <h2>Enter Transaction ID</h2>
                <input
                  placeholder="Transaction id"
                  className="w-[30ch] mx-auto border-2 border-blue-200 hover:border-blue-500 "
                  ref={input2Ref}
                />
                <button
                  disabled={isButtonDisabled}
                  className="border border-slate-500 mx-auto bg-slate-900 p-1 mt-2"
                  type="submit"
                >
                  <h3 className="text-white">Coming soon!</h3>
                </button>
              </form>
            )}
          </div>
          <div
            className={`${styles.btn} mt-3 border border-blue-900 bg-blue-900 text-center hover:cursor-pointer`}
          >
            <Link href="/user/dashboard"> Goto My Dashboard </Link>
          </div>
        </div>
      </div>
    </>
    // </div>
  );
}

export default QueryTransactions;
