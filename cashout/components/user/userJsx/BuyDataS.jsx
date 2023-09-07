import React from 'react';
import styles from "@/styles/BuyData.module.css";
import Link from "next/link";
import Sidebar from "@/components/user/Sidebar";
import Footer from "@/components/user/Footer";
import ConfirmDataModal from "@/components/user/ConfirmDataModal";
import Loader from "@/components/utils/Loader";
import { Logout } from "../Logout";

function BuyDataS({ amountPlaceHolder, loading, errorMessage, amount, amounts, handleNetworkAndInputValidation, handleDataVolAndInputValidation, handlePhoneNumberAndInputValidation, submit, confirmData, networkData, network, dataVol, dataVols, phoneNumber, modalIsOpen, allSelected, openModal, onRequestClose, name, error  }) {
  return (
    <div>
         {loading && <Loader />}
         <div  className='flex justify-between'>
            <div className="">
                <Sidebar />
            </div>
            <div className='mr-0 lg:mr-[-3ch] md:mr-[-3ch] sm:mr-[-3ch]'>
                <Logout/>
            </div>
        </div>
      <form onSubmit={submit} className="mt-[-5ch]">
        <div className="p-10">
          <div className="text-center">
            <h3 className="text-black text-xl p-5">Buy Data 2</h3>
            <div className="border rounded-2xl border-dotted bg-green-300 m-2 p-2 w-60 text-xs mx-auto">
              <div className="">
                <p className="mb-2">Network Needed is not on the list ?</p>
                <p>Checkout Data. Thank You !</p>
              </div>
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
              <option value={network}>--Choose Network--</option>
              {networkData.map((ctr) => (
                <option value={ctr.variation_string} key={ctr._id}>
                  {ctr.variation_string}
                </option>
              ))}
            </select>
            <br />
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
            <br />
            <input
              placeholder="Phone number"
              className={`${styles.formControl} text-red-400 input-field`}
              value={phoneNumber}
              onChange={handlePhoneNumberAndInputValidation}
            />
            <br />
            {error ? (
              <div className='text-left ml-6 mt-[-1.3ch] text-xs mb-[1ch] text-red-800'>{error}</div>
            ) : null }
            <div className={styles.amountBtn}>
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
        network={name}
        // dataVol={dataVol}
        // value={buyData}
      />
      <Footer />
    </div>
  )
}

export default BuyDataS
