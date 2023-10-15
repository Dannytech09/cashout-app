import React from "react";
import styles from "@/styles/BuyData.module.css";
import Link from "next/link";
import Footer from "@/components/user/Footer";
import ConfirmEduPinModal from "@/components/user/ConfirmEduPinModal";
import Loader from "@/components/utils/Loader";

function BuyEduPin({
  amountPlaceHolder,
  loading,
  errorMessage,
  amount,
  amounts,
  handleEduTypeAndInputValidation,
  handleEduVolAndInputValidation,
  submit,
  confirmData,
  eduPin,
  edu,
  vol,
  vols,
  modalIsOpen,
  allSelected,
  openModal,
  onRequestClose,
  name,
  num
}) {        
  return (
    <div>
      {loading && <Loader />}
      <form onSubmit={submit} className="mt-[-5ch]">
        <div className="p-10">
          <div className="text-center">
            <h3 className="text-black text-xl mt-8 p-5">Buy Educational Pin</h3>
            <div className="border rounded-2xl border-dotted bg-green-300 m-2 p-2 w-60 text-xs mx-auto">
              <div className="">
                <p className="mb-2">Check history for the generated pin(s)</p>
                <p>Thank You !</p>
              </div>
            </div>
            <div>
              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
            </div>
            <div className={styles.amountBtn}>
              <select
                className={`${styles.formControl} input-field`}
                onChange={handleEduTypeAndInputValidation}
              >
                <option value={edu}>--Choose Edu Pin--</option>
                {eduPin.map((ctr) => (
                  <option value={ctr.type} key={ctr._id}>
                    {ctr.type}
                  </option>
                ))}
              </select>
              {/* <br /> */}
              <select
                className={`${styles.formControl} input-field`}
                onChange={handleEduVolAndInputValidation}
              >
                <option value={vol}>--Number of Pins--</option>
                {vols.map((ctr) => (
                  <option value={ctr.plan_code} key={ctr.plan_code}>
                    {ctr.name}
                  </option>
                ))}
              </select>
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
                  {loading ? <p>Loading...</p> : "Purchase E-Pin"}
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
      <ConfirmEduPinModal
        modalIsOpen={modalIsOpen}
        onRequestClose={onRequestClose}
        onConfirm={confirmData}
        name={name}
        vol={num}
      />
      <Footer />
    </div>
  );
}

export default BuyEduPin;
