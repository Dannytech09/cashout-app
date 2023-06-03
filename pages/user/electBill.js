import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "../../styles/TvSub.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import authHeader from "../../services/auth-Header";
import Sidebar from "@/components/user/Sidebar";
import SmileIcon from "@/components/heroIcons/SmileIcon";
import ConfirmElectModal from "@/components/user/ConfirmElectModal";
import API_BASE_URL from "@/apiConfig";
// import Footer from "../../components/user/Footer";

const BASE_URL = `${API_BASE_URL}`;

export default function TvSub() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [insufficientBal, setInsufficientBal] = useState(false);
  const [unauthorised, setUnauthorised] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [invalidMeter, setInvalidMeter] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [renderName, setRenderName] = useState();
  const [purchaseBtn, setPurchaseBtn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [invalidAmount, setInvalidAmount] = useState(false);

  const [selectedService, setSelectedService] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");

  const verifyServiceId = [
    "ikeja-electric",
    "eko-electric",
    "kano-electric",
    "portharcourt-electric",
    "jos-electric",
    "ibadan-electric",
    "kaduna-electric",
    "abuja-electric",
    "enugu-electric",
    "benin-electric",
  ];

  const verifyType = ["prepaid", "postpaid"];

  const handleServiceChange = (event) => {
    const serviceID = event.target.value;
    setSelectedService(serviceID);
    // setSelectedType("");
    console.log(serviceID);
  };

  const handleSelectedType = (event) => {
    const inputValue = event.target.value;
    setSelectedType(inputValue);
    console.log(inputValue);
  };

  // handle IUC NUMBER
  const handleMeterNumber = (e) => {
    const inputValue = e.target.value;
    setMeterNumber(inputValue);
    console.log(inputValue);
  };

  const handleAmount = (e) => {
    const inputValue = e.target.value;
    setAmount(inputValue);
    console.log(inputValue);
  };

  //   Verify METER NUMBER
  const handleFormSubmit = async (event) => {
    if (typeof window !== "undefined") {
      event.preventDefault();

      try {
        // check 404 error
        setInvalidAmount(false);
        setLoading(true);
        setRenderName(false);
        setInsufficientBal(false);
        setUnauthorised(false);
        setIsEditable(true);
        const response = await axios.post(
          `${BASE_URL}/electBill/verify`,
          {
            serviceID: selectedService,
            type: selectedType,
            billersCode: meterNumber,
          },
          {
            headers: authHeader(),
          }
        );
        if (response.data.code === "000") {
          setRenderName(response.data.data.Customer_Name);
          setIsEditable(false);
          setPurchaseBtn(true);
          setLoading(false);
            // console.log(response);
        }
      } catch (error) {
        if (error.response?.data?.error) {
          setUnauthorised(true);
        } else if (error.response.data.code === "003") {
          setInvalidMeter(true);
        } else if (error.response.data.code === "005") {
          setApiError(true);
        } else if (error.response.data.data.code === "009") {
          setInvalidAmount(true);
        } else if (error.response.data.code === "006") {
          setInsufficientBal(true);
        } else {
          alert("Something went wrong !");
        }
        // console.log(error);
      }
    }
    setLoading(false);
  };

  const handleFormValidation = useCallback(() => {
    let allFormFilled = true;

    if (!selectedService || !meterNumber || selectedType === "Select Type") {
      allFormFilled = false;
    }

    setAllSelected(allFormFilled);
  }, [selectedService, selectedType, meterNumber]);

  useEffect(() => {
    handleFormValidation();
  }, [handleFormValidation]);

  const submit = (e) => {
    e.preventDefault();
    if (allSelected) {
      openModal();
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
    // onConfirm();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // onRequestClose();
  };

  // Track when modal to leave the screen upon opening it
  useEffect(() => {
    let timer;
    if (modalIsOpen) {
      timer = setTimeout(() => {
        closeModal();
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [modalIsOpen]);

  const confirmData = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const id = user._id;

      try {
        setLoading(true);
        setInsufficientBal(false);
        setUnauthorised(false);
        const response = await axios.post(
          `${BASE_URL}/pay/electBill/${id}`,
          {
            serviceID: selectedService,
            billersCode: meterNumber,
            variation_code: selectedType,
            amount: amount,
          },
          {
            headers: authHeader(),
          }
        );
        if (response.data.code === "000") {
          alert(response.data.message);
          setLoading(false);
            router.reload();
            // console.log(response);
        }
      } catch (error) {
        if (error.response.data.code === "009") {
          setInvalidAmount(true);
        } else if (error.response?.data?.error) {
          setUnauthorised(true);
        } else if (error.response.data.code === "006") {
          setInsufficientBal(true);
        } else if (error.response.data.code === "005") {
          setApiError(true);
        } else {
          alert("Something went wrong !");
        }
        // console.log(error);
        // setLoading(false);
      }

      closeModal();
    }
  };

  return (
    <>
      <Sidebar />
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
              {insufficientBal && (
                <div
                  className={`${styles.errorMessage} item-center justify-center flex gap-2`}
                >
                  Fund your wallet now boss !
                  <span className="fill-blue-800 stroke-yellow-600">
                    <SmileIcon />
                  </span>
                </div>
              )}
              {unauthorised && (
                <div className={styles.errorMessage}>
                  Not authorized to access this route! Please get yourself
                  authenticated.
                </div>
              )}
              {apiError && (
                <div className={`${styles.errorMessage} text-center`}>
                  {" "}
                  Server Error !
                </div>
              )}
              {invalidMeter && (
                <div className={`${styles.errorMessage} text-center`}>
                  {" "}
                  Invalid meter number. Please re-check number and try again !
                </div>
              )}
              {invalidAmount && (
                <div className={`${styles.errorMessage} text-center`}>
                  {" "}
                  Amount cannot be below/above 500 and 10,000 respectively !
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
    </>
  );
}
