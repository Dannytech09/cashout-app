import React from "react";
import styles from "@/styles/BuyData.module.css";
import Link from "next/link";
import Footer from "../SubMain";
import ConfirmDataModal from "../ConfirmDataModal";
import Loader from "@/components/utils/Loader";

function BuyData({
  amountPlaceHolder,
  loading,
  errorMessage,
  amount,
  amounts,
  handleNetworkAndInputValidation,
  handleDataVolAndInputValidation,
  handlePhoneNumberAndInputValidation,
  submit,
  confirmData,
  networkData,
  network,
  dataVol,
  dataVols,
  phoneNumber,
  modalIsOpen,
  allSelected,
  openModal,
  onRequestClose,
  error,
}) {
  return (
    <>
      {loading && <Loader />}
      <form onSubmit={submit} className="mt-[-5ch]">
        <div className="p-10">
          <div className="text-center">
            <h3 className="text-black text-xl p-5">Buy Data</h3>
           {/* <div className="border rounded-2xl border-dotted bg-yellow-300 m-2 p-2 w-60 text-xs mx-auto"> */}
           <div className="">
                <div className="text-center">
                  <h4 className="text-lg font-semibold">
                    Data Balance Checker:
                  </h4>
                </div>
                <ul className="sm:w-1/2 mx-auto">
                  <li className="list-group-item bg-yellow-500 text-black">
                    MTN [SME] *310# or *461*4#
                  </li>
                  <li className="list-group-item bg-yellow-500 text-black">
                    MTN [Gifting] *310# or *460*260#
                  </li>
                  <li className="list-group-item bg-gray-800 text-white">
                    9mobile *323# or *228#
                  </li>
                  <li className="list-group-item bg-red-500 text-white">
                    Airtel *323#
                  </li>
                  <li className="list-group-item bg-green-500 text-white">
                    Glo *323#
                  </li>
                </ul>
            </div>
              {/* </div> */}

            <div>
              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
            </div>
            <div className={styles.amountBtn}>
              <select
                className={`${styles.formControl} input-field`}
                onChange={handleNetworkAndInputValidation}
              >
                <option value={network}>--Choose Network--</option>
                {networkData.map((ctr) => (
                  <option value={ctr.network} key={ctr.network}>
                    {ctr.variation_string}
                  </option>
                ))}
              </select>
              {/* <br /> */}
              <select
                className={`${styles.formControl} input-field`}
                onChange={handleDataVolAndInputValidation}
              >
                <option value={dataVol}>--Data Volume--</option>
                {dataVols.map((ctr) => (
                  <option value={ctr.plan_code} key={ctr.plan_code}>
                    {ctr.name}
                  </option>
                ))}
              </select>
              {/* <br /> */}
              <input
                placeholder="Phone number"
                className={`${styles.formControl} text-red-400 input-field`}
                value={phoneNumber}
                onChange={handlePhoneNumberAndInputValidation}
              />
              {error ? (
                <div className="text-left ml-6 mt-[-1.3ch] text-xs mb-[-2ch] text-red-800">
                  {error}
                </div>
              ) : null}
              {/* <br /> */}
              <div
                className={`${styles.formControl} border border-white bg-white input-field`}
              >
                {amountPlaceHolder ? (
                  "amount"
                ) : (
                  <h2 value={amount}> {amounts.amount}</h2>
                )}
              </div>
              <br />
              <div
                className={`${styles.btn} border border-white bg-white text-center hover:cursor-pointer`}
              >
                <button
                  disabled={!allSelected}
                  onClick={openModal}
                  style={{
                    opacity: allSelected ? "1" : "0.5",
                    cursor: allSelected ? "pointer" : "not-allowed",
                  }}
                >
                  {loading ? <p>Loading...</p> : "Buy Data"}
                </button>
              </div>
              <div
                className={`${styles.btn} mt-3 border border-blue-900 bg-blue-900 text-center hover:cursor-pointer`}
              >
                <Link href="/user/dashboard"> Goto My Dashboard </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ConfirmDataModal
        phoneNumber={phoneNumber}
        modalIsOpen={modalIsOpen}
        onRequestClose={onRequestClose}
        onConfirm={confirmData}
        network={network}
        // dataVol={dataVol}
        // value={buyData}
      />
      <Footer />
    </>
  );
}

export default BuyData;
