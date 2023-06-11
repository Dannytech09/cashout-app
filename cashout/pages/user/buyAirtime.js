import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-Header";
import ConfirmAirtimeModal from "@/components/utils/ConfirmAirtimeModal";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/BuyAirtime.module.css";
import Sidebar from "@/components/user/Sidebar";
import Footer from "@/components/user/Footer";
import SmileIcon from "@/components/heroIcons/SmileIcon";
import API_BASE_URL from "@/apiConfig";

const BASE_URL = `${API_BASE_URL}/buyAirtime`;

function BuyAirtime() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [insufficientBal, setInsufficientBal] = useState(false);
  const [unauthorised, setUnauthorised] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [max, setMax] = useState(false);

  const [network, setNetwork] = useState("--Choose Network--");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");

  const serviceId = ["mtn", "glo", "airtel", "etisalat"];

  const changeNetwork = (e) => {
    const inputValue = e.target.value;
    setNetwork(inputValue);
    handleInputField(e);
    // console.log(inputValue);
  };

  // handle two onchange props
  const changePhoneNumber = (e) => {
    const inputValue = e.target.value;

    // Remove non-numeric characters from the input
    const numericPhoneNumber = inputValue.replace(/\D/g, "");

    setPhoneNumber(numericPhoneNumber);

    // Regex pattern to match Nigerian phone numbers
    const regex = /^(\+?234|0)[789]\d{9}$/;

    const isValidPhoneNumber = regex.test(inputValue);
    setIsValid(isValidPhoneNumber);

    handleInputField(e);
    // console.log(e.target.value);
  };

  const changeAmount = (e) => {
    const inputValue = e.target.value;

    const numericPhoneNumber = inputValue.replace(/\D/g, "");
    setAmount(numericPhoneNumber);

    handleInputField(e);
    // console.log(e.target.value);
  };

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
        setPhoneErr(false);
        setInsufficientBal(false);
        setUnauthorised(false);
        setMax(false);
        const response = await axios.post(
          `${BASE_URL}/${id}`,
          { serviceID: network, phone: phoneNumber, amount: amount },
          {
            headers: authHeader(),
          }
        );
        if (response.data.code === "000") {
          alert(response.data.message);
          router.reload();
          setLoading(false);
          // console.log(response)
        }
      } catch (error) {
        if (error.response.data.error) {
          setUnauthorised(true);
        } else if (error.response.data.code === "003") {
          setPhoneErr(true);
        } else if (error.response.data.code === "001") {
          setApiError(true);
        } else if (error.response.data.code === "006") {
          setInsufficientBal(true);
        } else if (error.response.data.code === "009") {
          setMax(true);
        } else {
          alert(`Something went wrong!`);
          console.log(error.response);
        }
        setLoading(false);
      }

      closeModal();
    }
  };

  function handleInputField() {
    const inputFields = document.querySelectorAll(".input-field");
    let allFormFilled = true;

    inputFields.forEach((input) => {
      if (input.type === "text" && !input.value) {
        allFormFilled = false;
      } else if (
        input.type === "select-one" &&
        input.value === "--Choose Network--"
      ) {
        allFormFilled = false;
      }
    });

    setAllSelected(allFormFilled);
  }

  return (
    <div className="bg-slate-500 h-screen md:h-screen xl:h-screen">
      <Sidebar />
      <form onSubmit={submit} className="">
        <div className="p-10">
          <div className="text-center">
            <h3 className="text-black text-xl p-5">Buy Airtime</h3>
            <div>
              {phoneErr && (
                <div className={styles.errorMessage}>
                  Please input a valid phone number.
                </div>
              )}
              {insufficientBal && (
                <div className={styles.errorMessage}>
                  Fund your wallet now boss !
                  <span className="fill-blue-900 stroke-blue-600"><SmileIcon/></span>
                </div>
              )}
              {unauthorised && (
                <div className={styles.errorMessage}>
                  Not authorized to access this route! Please get yourself
                  authenticated.
                </div>
              )}
              {apiError && (
                <div className={styles.errorMessage}>Transaction Failed!</div>
              )}
              {max && (
                <div className={styles.errorMessage}>
                  Minimum amount - 100 and maximum amount 5000 naira
                </div>
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
            <div className="text-xs mr-40 mt-[-2ch] text-red-600">
              {isValid ? null : <p>Invalid Phone Number</p>}
            </div>
            <br />
            <input
              placeholder="Amount"
              className={`${styles.formControl} text-red-400 mt-[-2ch] input-field`}
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
  );
}

export default BuyAirtime;
