import React from "react";
import To12HourFormat from "@/components/utils/Time";
import Loader from "@/components/utils/Loader";
import styles from "@/styles/TvSub.module.css";

function MyReferral({
  myReferrals,
  overView,
  loading,
  errorMessage,
}) {
  return (
    <div className="relative border-red-300">
      {loading && <Loader />}
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-sm">
          Referral Info
        </h1>
      </div>
      <div className="mt-[4ch]">
        {errorMessage && (
          <div
            className={`${styles.errorMessage} item-center justify-center flex gap-2`}
          >
            {errorMessage}
          </div>
        )}
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
          <div>
            <h4 className="text-center mt-[2ch]">Overview</h4>
            {overView ? (
              <div className="ml-3">
                {overView && <p>Pending {overView.totalPending}</p>}
                {overView && <p>Completed {overView.totalCompleted}</p>}
                {overView && (
                  <p>Total Person Referred {overView.totalPersonReferred}</p>
                )}
              </div>
            ) : (
              <div className="ml-3">
                {overView.totalPending && (
                  <p>Pending {overView.totalPending}</p>
                )}
                {overView.totalPending && (
                  <p>Completed {overView.totalCompleted}</p>
                )}
                {overView.totalPending && (
                  <p>Total Person Referred {overView.totalPersonReferred}</p>
                )}
              </div>
            )}
          </div>
          <h4 className="text-center mt-[2ch]">Referral Chain</h4>
          {myReferrals.length > 0 ?
            myReferrals.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 ml-5 mr-5  rounded-lg shadow-md mb-1 mt-3"
              >
                {item.referredUsername && (
                  <p className="text-gray-700 text-[1.1ch]">
                    My Referral &gt;&gt;&gt; {item.referredUsername}
                  </p>
                )}
                {item.referredStatus === "pending" ? (
                  <p className="text-blue-700 text-[1.1ch] font-extrabold">
                    Status &gt;&gt;&gt; {item.referredStatus}
                  </p>
                ) : (
                  <p className="text-green-400 text-[1.1ch] font-extrabold">
                    Status &gt;&gt;&gt; {item.referredStatus}
                  </p>
                )}
                <p className="text-gray-700 text-[1.1ch]">
                  Date: {item.date ? To12HourFormat(item.date) : ""}
                </p>
              </div>
            )) : (
              <div>
              <p className="text-red-400 text-center mt-5 text-sm">
                You haven&apos;t referred anyone yet.
              </p>
              <br/>
              <br/>
              <p className="text-center text-sm p-1 m-4"> Refer 1 person and earn 1,000 naira
              to your wallet or bank account immediately the person upgrade
              his/her account to partner&apos;s account type. Refer 10 and earn 10,000 naira..</p>
              </div> 
            )}
        </div>
      </div>
      {/* <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div> */}
    </div>
  );
}

export default MyReferral;
