import React from 'react'
import ConfirmAirtimeModal from "@/components/utils/ConfirmAirtimeModal";
import Link from "next/link";
import styles from "@/styles/BuyAirtime.module.css";
import Sidebar from "@/components/user/Sidebar";
import Footer from "@/components/user/SubMain";
import Loader from "@/components/utils/Loader";
import { Logout } from '../Logout';

export default function BuyAirtime({ loading, errorMessage, modalIsOpen, setModalIsOpen, allSelected, error, network, phoneNumber, amount, serviceId, changeNetwork, changePhoneNumber, changeAmount, submit, openModal,confirmData }) {
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
      <form onSubmit={submit} className="mt-[-3ch]">
        <div className="p-10">
          <div className="text-center">
            <h3 className="text-black text-xl p-5">Buy Airtime</h3>
             <p className='text-center text-xs mb-4'>1 percent discount</p>
            <div>
              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
            </div>
            <select
              className={`${styles.formControl} input-field`}
              onChange={changeNetwork}
            >
              <option value={network}>--Choose Network--</option>
              {serviceId.map((ctr) => (
                <option value={ctr} key={ctr}>
                  {ctr}
                </option>
              ))}
            </select>
            <br />
            <input
              placeholder="Phone number"
              className={`${styles.formControl} text-red-400 input-field`}
              value={phoneNumber}
              onChange={changePhoneNumber}
            />
            {error ? (
              <div className='text-left ml-6 mt-[-1.3ch] mb-[-2ch] text-xs text-red-800'>{error}</div>
            ) : null }
            <br />
            <input
              placeholder="Amount"
              className={`${styles.formControl} text-red-400 mt-[1ch] input-field`}
              value={amount}
              onChange={changeAmount}
            />
            <br />
            <div className={styles.airtimeBtn}>
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
                  {loading ? <p>Loading...</p> : "Buy Airtime"}
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
      <ConfirmAirtimeModal
        network={network}
        phoneNumber={phoneNumber}
        amount={amount}
        modalIsOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={confirmData}
        // value={buyData}
      />
      <div className="md:mb-[-20ch]">
        <Footer />
      </div>
    </div>
  )
}
