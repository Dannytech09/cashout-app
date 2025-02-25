import React from "react";
import Link from "next/link";
import styles from "@/styles/BuyData.module.css";
import ConfirmDataModal from "../ConfirmDataModal";
import Loader from "@/components/utils/Loader";
import SubMain from "../SubMain";

export default function DirectCoupon({
  networkData,
  amountPlaceHolder,
  loading,
  dataVol,
  phoneNumber,
  amounts,
  modalIsOpen,
  allSelected,
  name,
  handleNetworkAndInputValidation,
  handleDataVolAndInputValidation,
  handlePhoneNumberAndInputValidation,
  submit,
  openModal,
  confirmData,
  setModalIsOpen,
  errorMessage,
  error,
}) {
  return (
    <div>
      {loading && <Loader />}
      <form onSubmit={submit} className="mt-[-2ch]">
        <div className="p-10">
          <div className="text-center">
            <h3 className="text-black bg-violet-400 border-slate-200 rounded-2xl text-xl p-5">
              MTN DIRECT COUPON
            </h3>
            <div className="text-xs p-0 m-2">
              <p>Dial *323*4# or *323*1# to check balance</p>
              <p>You might be unable to check balance atimes due to network</p>
              <p>Hence, confirm final status via your history</p>
            </div>
            <div>
              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
            </div>
            <select
              className={`${styles.formControl} input-field`}
              onChange={handleNetworkAndInputValidation}
            >
              <option>--Choose Network--</option>
              <option value={33}>MTN DATA COUPON</option>
            </select>
            <br />
            <select
              className={`${styles.formControl} input-field`}
              onChange={handleDataVolAndInputValidation}
              value={dataVol}
            >
              <option>--Data Volume--</option>
              {networkData.map((ctr) =>
                ctr.dataVol.map((data) => (
                  <option value={data.variation_code} key={data.variation_code}>
                    {data.name}
                  </option>
                ))
              )}
            </select>
            <br />
            <input
              placeholder="Phone number"
              className={`${styles.formControl} text-red-400 input-field`}
              value={phoneNumber}
              onChange={handlePhoneNumberAndInputValidation}
            />
            {error ? (
              <div className="text-left ml-6 mt-[-1.3ch] text-xs  text-red-800">
                {error}
              </div>
            ) : null}
            <br />
            <div className={styles.amountBtn}>
              <div
                className={`${styles.formControl} border border-white bg-white input-field`}
              >
                {amountPlaceHolder
                  ? "amount"
                  : amounts.map((data) => (
                      <h2 key={data.plan_code}>{data.amount}</h2>
                    ))}
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
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={confirmData}
        package_name={name}
      />
      <SubMain />
    </div>
  );
}
