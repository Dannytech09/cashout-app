import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-Header";
import ConfirmDataModal from "@/components/utils/confirmDataModal";
import axios from "axios";
import styles from "../../styles/BuyData.module.css";
import Link from "next/link";
import DataServices from "@/services/data.services";
import AuthService from "@/services/auth.Service";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

function BuyData() {
  const router = useRouter();
  const [networkData, setNetworkData] = useState([]);
  const [amountPlaceHolder, setAmountPlaceHolder] = useState(true)
  const [loading, setLoading] = useState(true);
  const [phoneErr, setPhoneErr] = useState(false);
  const [insufficientBal, setInsufficientBal] = useState(false);
  const [unauthorised, setUnauthorised] = useState(false);
  const [SsmsApiErrorMessage, setsSmsApiErrorMessage] = useState(false);

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
        const response = await fetch(
          "http://localhost:4000/buyData"
          // {
          //   headers: authHeader()
          // }
        );
        const res = await response.json();
        console.log(res.networkData);
        setNetworkData(res.networkData);
        setLoading(false);
        return;
      } catch (error) {
        console.error(error);
        return;
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
      // check if selectedNetwork is undefined. if not checked it will throw an
      // error if user selects a value and later select the default value
      setDataVols(selectedNetwork.dataVol);
    }
    setPhoneNumber("");
    setAmount("");
    setNetwork(e.target.value);
    console.log(e.target.value);
  };
  // handle two onchange props
  const handleNetworkAndInputValidation = (e) => {
    changeNetwork(e);
    handleInputField(e);
  };

  const changeDataVol = (e) => {
    setDataVol(e.target.value);
    const selectedDataVol = dataVols.find((ctr) => ctr.name === e.target.value);
    // check if selectedDataVol is undefined. if not checked it will throw an
    // error if user selects a value and later select the default value
    if (selectedDataVol) {
      setAmounts(selectedDataVol);
      setAmountPlaceHolder(false)
    }
    setPhoneNumber("");
    setAmount("");
    console.log(e.target.value);
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
    console.log(e.target.value);
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
  // const form = { network, dataVol, phoneNumber };
  // avoid circular reference issue by turning it into string
  // then changing it back to the original value(obj) using parse
  // Assign a value to clonedForm somewhere in your code, e.g.
  //  const clonedForm = JSON.parse(JSON.stringify(form));

  const confirmData = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const id = user._id;

    try {
      setLoading(true);
      setPhoneErr(false);
      setInsufficientBal(false);
      setUnauthorised(false);
      const response = await axios.post(
        `http://localhost:4000/api/v1/auth/purchase/${id}`,
        { network, dataVol, phoneNumber },
        {
          headers: authHeader(),
        }
      );
      alert(response.data.message);
      setLoading(false);
      router.reload();
    } catch (error) {
      if (error.response.data.error) {
        setUnauthorised(true);
      } else if (
        error.response.data.invalidMessage
      ) {
        setPhoneErr(true);
        console.log(error.response);
      } else if ( error.response.data.code === 3002) {
        setsSmsApiErrorMessage(true)
      }  else if (error.response.data.code === 3003) {
        setInsufficientBal(true);
      } else {
        console.log(error.response);
      } 
      setLoading(false);
    }

    closeModal();
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
    <>
      <form
        onSubmit={submit}
        className="flex justify-center h-screen lg:h-full bg-slate-500 w-full "
      >
        <div className="p-10 w-full">
          <div className="text-center">
            <h3 className="text-black text-xl p-5">Buy Data</h3>
      <div>
        {phoneErr && (
          <div className={styles.errorMessage}>Please input a valid phone number.</div>
        )}
        {insufficientBal && (
          <div className={styles.errorMessage}>Please fund your wallet.</div>
        )}
        {unauthorised && (
          <div className={styles.errorMessage}>
            Not authorized to access this route! Please get yourself
            authenticated.
          </div>
        )}
        {SsmsApiErrorMessage && (
           <div className={styles.errorMessage}>
         {`Unable to Purchase ${dataVol} ${network} to ${phoneNumber} please try after some minutes`}
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
                  {ctr.network}
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
                <option value={ctr.name} key={ctr.name}>
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
                { amountPlaceHolder ? "amount" :
                <h2 value={amount}> {amounts.amount}</h2>
              }
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
        network={network}
        dataVol={dataVol}
        phoneNumber={phoneNumber}
        modalIsOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={confirmData}
        // value={buyData}
      />
    </>
  );
}

export default BuyData;
