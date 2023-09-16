import React from 'react'
import styles from "@/styles/TvSub.module.css";
import Link from "next/link";
import Sidebar from "@/components/user/Sidebar";
import ConfirmElectModal from "@/components/user/ConfirmElectModal";
import Loader from "@/components/utils/Loader";
import { Logout } from '../Logout';

export default function ElectBill({ loading, errorMessage, allSelected, renderName, purchaseBtn, modalIsOpen, isEditable, selectedService, selectedType, meterNumber, amount, verifyServiceId, verifyType, handleServiceChange, handleSelectedType, handleMeterNumber, handleAmount, handleFormSubmit, submit, setModalIsOpen, confirmData }) {
  return (
    <div>
         {loading && <Loader />}
         <div  className='flex justify-between'>
            <div className="">
                <Sidebar />
            </div>
            <div className='mr-0 lg:mr-[-3ch] md:mr-[-3ch] sm:mr-[-3ch]'>
                <Logout />
            </div>
        </div>
      <form
        className={`${styles.form} bg-slate-500 h-full md:h-screen xl:h-screen`}
        onSubmit={handleFormSubmit}
      >
        <div className="p-10 flex flex-col">
          <div className="mx-auto">
            <h3 className="text-black text-center text-xl p-5">
              Electricity Bill&apos;s Payment
            </h3>
            <div>
              {errorMessage && (
                <div
                  className={`${styles.errorMessage} item-center justify-center flex gap-2`}
                >
                 {errorMessage}
                </div>
              )}
            </div>
            <div className="flex flex-col mx-auto ">
              <div className="ml-5">
                <label htmlFor="service-select">Select City Code:</label>
              </div>
              <div className="mx-auto">
                {" "}
                <select
                  value={selectedService}
                  readOnly={!isEditable}
                  onChange={handleServiceChange}
                  className={`${styles.formControl} input-field`}
                >
                  <option value="">Select Service</option>
                  {verifyServiceId.map((serviceId) => (
                    <option
                      key={serviceId}
                      disabled={!isEditable}
                      value={serviceId}
                    >
                      {serviceId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ml-5">
                <label htmlFor="variation-select">Select Type:</label>
              </div>
              <div className="mx-auto">
                <select
                  value={selectedType}
                  onChange={handleSelectedType}
                  className={`${styles.formControl} input-field`}
                >
                  <option value="">Select Type</option>
                  {verifyType.map((type) => (
                    <option key={type} disabled={!isEditable} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ml-5">
                <label className="text-sm" htmlFor="">
                  Meter Number:
                </label>
              </div>
              <div className="mx-auto">
                <input
                  placeholder="Meter Number"
                  className={`${styles.formControl} text-red-400 text-sm input-field`}
                  value={meterNumber}
                  readOnly={!isEditable}
                  onChange={handleMeterNumber}
                />
              </div>
              <div className="mx-auto">
                <div className="ml-5">
                  <label className="text-sm" htmlFor="">
                    Amount:
                  </label>
                </div>
                <input
                  placeholder="Amount"
                  className={`${styles.formControl} text-red-400 text-sm input-field`}
                  value={amount}
                  readOnly={!isEditable}
                  onChange={handleAmount}
                />
              </div>
              <div className="flex flex-col mx-auto">
                {renderName && (
                  <div className="flex flex-col">
                    <label className="block text-sm" htmlFor="">
                      Customer&apos;s Name:
                    </label>
                    <input
                      className={`${styles.formControl} text-red-400 input-field`}
                      value={renderName}
                      readOnly
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={`${styles.submitDashboardBtn} `}>
              <div
                className={`${styles.btn} border border-white bg-white text-center hover:cursor-pointer`}
              >
                {purchaseBtn ? (
                  <button onClick={submit} disabled={!allSelected}>
                    Purchase Elect Bill
                  </button>
                ) : (
                  <button
                    disabled={!allSelected}
                    style={{
                      opacity: allSelected ? "1" : "0.5",
                      cursor: allSelected ? "pointer" : "not-allowed",
                    }}
                  >
                    {loading ? <p>Loading...</p> : "Verify Meter Number"}
                  </button>
                )}
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
      <ConfirmElectModal
        selectedService={selectedService}
        selectedType={selectedType}
        meterNumber={meterNumber}
        modalIsOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={confirmData}
      />
    </div>
  )
}
