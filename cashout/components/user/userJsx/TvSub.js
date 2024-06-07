import React from "react";
import styles from "@/styles/TvSub.module.css";
import Link from "next/link";
import ConfirmTvModal from "@/components/utils/ConfirmTvModal";
import Loader from "@/components/utils/Loader";

export default function TvSub({
  loading,
  errorMessage,
  allSelected,
  renderName,
  renderDueDate,
  purchaseBtn,
  modalIsOpen,
  selectedService,
  selectedVariation,
  iucNumber,
  handleServiceChange,
  handleVariationChange,
  handleIucNumber,
  getServiceOptions,
  getVariationOptions,
  handleFormSubmit,
  submit,
  confirmData,
  setModalIsOpen,
}) {
  return (
    <div>
      {loading && <Loader />}
      <form
        className={`${styles.form} bg-slate-500 mt-[-3ch] h-full md:h-screen xl:h-screen`}
        onSubmit={handleFormSubmit}
      >
        <div className="p-10 flex flex-col">
          <div className="mx-auto">
            <h3 className="text-black text-center text-xl p-5">
              Cable Subscription
            </h3>
            <p className="text-center text-xs mb-4">1 percent discount</p>
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
                <label htmlFor="service-select">Select Service:</label>
              </div>
              <div className="mx-auto">
                {" "}
                <select
                  className={`${styles.formControl} input-field`}
                  id="service-select"
                  value={selectedService}
                  onChange={handleServiceChange}
                >
                  <option value="">Select a service</option>
                  {getServiceOptions}
                </select>
              </div>

              <div className="ml-5">
                <label htmlFor="variation-select">Select Variation:</label>
              </div>
              <div className="mx-auto">
                <select
                  className={`${styles.formControl} input-field`}
                  id="variation-select"
                  value={selectedVariation}
                  onChange={handleVariationChange}
                >
                  <option value="">Select a variation</option>
                  {getVariationOptions()}
                </select>
              </div>
              <div className="ml-5">
                <label className="text-sm" htmlFor="">
                  IUC Number:
                </label>
              </div>
              <div className="mx-auto">
                <input
                  placeholder="IUC NUMBER"
                  className={`${styles.formControl} text-red-400 text-sm input-field`}
                  value={iucNumber}
                  onChange={handleIucNumber}
                />
              </div>
              <div className="flex flex-col mx-auto">
                {" "}
                {/* Added "items-center" class to center align the content */}
                {renderName && (
                  <div className="flex flex-col">
                    {" "}
                    {/* Added "items-center" class to center align the content */}
                    <label className="block text-sm" htmlFor="">
                      Customer&apos;s Name:
                    </label>{" "}
                    {/* Added "mb-2" class to add some margin-bottom */}
                    <input
                      className={`${styles.formControl} text-red-400 input-field`}
                      value={renderName}
                      readOnly
                    />
                  </div>
                )}
              </div>
              <div className="flex mx-auto flex-col">
                {" "}
                {/* Added "items-center" class to center align the content */}
                {renderDueDate && (
                  <div className="flex flex-col">
                    {" "}
                    {/* Added "items-center" class to center align the content */}
                    <label className="block text-sm" htmlFor="">
                      Previous Due Date:
                    </label>{" "}
                    {/* Added "mb-2" class to add some margin-bottom */}
                    <input
                      className={`${styles.formControl} text-red-400 input-field`}
                      value={renderDueDate}
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
                    Purchase Tv Sub
                  </button>
                ) : (
                  <button
                    disabled={!allSelected}
                    style={{
                      opacity: allSelected ? "1" : "0.5",
                      cursor: allSelected ? "pointer" : "not-allowed",
                    }}
                  >
                    {loading ? <p>Loading...</p> : "Verify IUC Number"}
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
      <ConfirmTvModal
        //  selectedService={selectedService}
        selectedVariation={selectedVariation}
        iucNumber={iucNumber}
        modalIsOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={confirmData}
      />
    </div>
  );
}
