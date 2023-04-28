import React, { useState, useEffect } from "react";
import authHeader from "../../services/auth-Header";
import ConfirmDataModal from "@/components/utils/confirmDataModal";
import axios from "axios";
import styles from "../../styles/BuyData.module.css";

export default function BuyData() {
  const [networkData, setNetworkData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const response = await fetch("http://localhost:4000/buyData", {
          headers: authHeader(),
        });
        const res = await response.json();
        console.log(res.networkData);
        setNetworkData(res.networkData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
  const form = { network, dataVol, phoneNumber };
  // avoid circular reference issue by turning it into string
  // then changing it back to the original value(obj) using parse
  const clonedForm = JSON.parse(JSON.stringify(form));

  const confirmData = () => {
    const API_URL = "http://localhost:4000/purchase/63227db594843737c0769c98";
    const headers = { "Content-Type": "application/json" };

    axios
      .post(API_URL, clonedForm, headers)
      .then((res) => {
        alert(res.data.message);
        setNetwork("");
        setDataVol("");
        setPhoneNumber("");
        setAmount(null);
      })
      .catch((e) => {
        alert(e.response.data.message);
        console.log(e)
        setNetwork("");
        setDataVol("");
        setPhoneNumber("");
        setAmount(null);
      });

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
        className="flex justify-center h-screen bg-slate-500 w-full border border-red-500"
      >
        <div className="border border-red-2 h-screen p-10 w-full">
          <div className="text-center ">
            <h3 className="text-black text-xl p-5">Buy Data</h3>
            <select
              value={network}
              className={`${styles.formControl} input-field`}
              onChange={handleNetworkAndInputValidation}
            >
              <option>--Choose Network--</option>
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
              value={dataVol}
            >
              <option>--Data Volume--</option>
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
                <h2 value={amount}> {amounts.amount}</h2>
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
                  Buy Data
                </button>
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
