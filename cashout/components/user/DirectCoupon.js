import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-Header";
import axios from "axios";
import styles from "../../styles/BuyData.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "@/components/user/Sidebar";
import Footer from "../../components/user/SubMain";
import SmileIcon from "@/components/heroIcons/SmileIcon";
import ConfirmDataModal from "../../components/user/ConfirmDataModal";
import API_BASE_URL from "@/apiConfig";
import Loader from "@/components/utils/Loader";
import { getCoupon } from "@/pages/api/directCoupon";

const BASE_URL = `${API_BASE_URL}/vend`;

function DirectCoupon() {
  const router = useRouter();
  const [networkData, setNetworkData] = useState([]);
  const [amountPlaceHolder, setAmountPlaceHolder] = useState(true);
  const [loading, setLoading] = useState(true);
  const [phoneErr, setPhoneErr] = useState(false);
  const [insufficientBal, setInsufficientBal] = useState(false);
  const [unauthorised, setUnauthorised] = useState(false);
  const [sSmsApiErrorMessage, setsSmsApiErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [failed, setFailed] = useState("");

  const [network, setNetwork] = useState("--Choose Network--");
  const [dataVol, setDataVol] = useState("--Data Volume--");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [dataVols, setDataVols] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCoupon();
        console.log(response);
      
        setNetworkData(resp.dataCoupon);
        setLoading(false);
        return;
      } catch (error) {
        // console.error(error);
        alert("Not authorised or server error");
      }
    }
    fetchData();
  }, []);

  // if (loading) {
  //   return <div className="bg-slate-100">Loading...</div>;
  // }

  const changeNetwork = (e) => {
    const selectedNetwork = networkData.find(
      (ctr) => ctr.network === e.target.value
    );
    if (selectedNetwork) {
      setDataVols(selectedNetwork.dataVol);

      const selectedData = selectedNetwork.dataVol.find(
        (vol) => vol.name === e.target.value
      );

      if (selectedData) {
        selectedDataVolName = selectedData.name;
        // console.log(selectedDataVolName);
      }
    }
    setPhoneNumber("");
    setAmount("");
    setNetwork(e.target.value);
    // console.log(e.target.value);
  };

  // handle two onchange props
  const handleNetworkAndInputValidation = (e) => {
    changeNetwork(e);
    handleInputField(e);
  };

  const changeDataVol = (e) => {
    setDataVol(e.target.value);
    const selectedDataVol = dataVols.find(
      (ctr) => ctr.plan_code === e.target.value
    );
    // check if selectedDataVol is undefined. if not checked it will throw an
    // error if user selects a value and later select the default value
    if (selectedDataVol) {
      setAmounts(selectedDataVol);
      setAmountPlaceHolder(false);
    }
    setPhoneNumber("");
    setAmount("");
    // console.log(e.target.value);
  };

  // handle two onchange props
  const handleDataVolAndInputValidation = (e) => {
    changeDataVol(e);
    handleInputField(e);
  };

  // handle two onchange props
  const handlePhoneNumberAndInputValidation = (e) => {
    const inputValue = e.target.value;
    setPhoneNumber(inputValue);
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
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Track when modal is to leave the screen upon opening it
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
        setFailed("");
        setLoading(true);
        setPhoneErr(false);
        setInsufficientBal(false);
        setUnauthorised(false);
        setsSmsApiErrorMessage(false);
        setErrorMessage(false);
        setServerError(false);
        const response = await axios.post(
          `${BASE_URL}/${id}/purchase`,
          { network: network, plan_code: dataVol, mobile: phoneNumber },
          {
            headers: authHeader(),
          }
        );
        // console.log(response);
        if (response.data.code === "000") {
          alert(response.data.message);
          router.reload();
        } else if (response.data.code === "010") {
          alert(response.data.message);
          router.reload();
        }
      } catch (error) {
        // console.log(error)
        if (error.response.data.error) {
          setUnauthorised(true);
        } else if (error.response.data.code === "003") {
          setPhoneErr(true);
        } else if (error.response.data.code === "011") {
        } else if (error.response.data.code === "001") {
          setFailed(error.response.data.message);
        } else if (error.response.data.code === "011") {
          setsSmsApiErrorMessage(true);
        } else if (error.response.data.code === "010") {
          setErrorMessage(true);
        } else if (error.response.data.code === "006") {
          setInsufficientBal(true);
        } else if (error.response.data.code === "005") {
          setServerError(true);
        } else {
          // console.log(error.response);
          alert(`Something went wrong! If problem persist check your network`);
        }
      }
      setLoading(false);
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
    <div className="bg-slate-500 h-full md:h-screen xl:h-screen">
      {loading && <Loader />}
      <div className="">
        <Sidebar />
      </div>
      <form onSubmit={submit} className="">
        <div className="p-10">
          <div className="text-center">
            <h3 className="text-black text-xl p-5">MTN DIRECT COUPON</h3>
            <div>
              {phoneErr && (
                <div className={styles.errorMessage}>
                  Please input a valid phone number.
                </div>
              )}
              {failed && <div className={styles.errorMessage}>{failed}</div>}
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
              {sSmsApiErrorMessage && (
                <div className={styles.errorMessage}>
                  Invalid network or plan
                </div>
              )}
              {errorMessage && (
                <div className={styles.errorMessage}>
                  If problem persist kindly contact the admin !
                </div>
              )}
              {serverError && (
                <div className={styles.errorMessage}>
                  Internal Server Error!
                </div>
              )}
            </div>
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
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={confirmData}
        network={network}
        // dataVol={dataVol}
        // value={buyData}
      />
      <Footer />
    </div>
  );
}

export default DirectCoupon;
