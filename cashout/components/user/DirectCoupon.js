import React, { useState, useEffect } from "react";
import styles from "../../styles/BuyData.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "@/components/user/Sidebar";
import Footer from "../../components/user/SubMain";
import ConfirmDataModal from "./ConfirmDataModal";
import Loader from "@/components/utils/Loader";
import { getCoupon, directCoupon } from "@/pages/api/directCoupon";

function DirectCoupon() {
  const router = useRouter();
  const [networkData, setNetworkData] = useState([]);
  const [amountPlaceHolder, setAmountPlaceHolder] = useState(true);
  const [loading, setLoading] = useState(true);

  const [network, setNetwork] = useState("MTN DATA COUPON");
  const [dataVol, setDataVol] = useState("--Data Volume--");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amounts, setAmounts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getCoupon();
        // console.log(response.dataCoupon);
        setNetworkData(response.dataCoupon);
      } catch (error) {
        // console.error(error);
        alert("Service Unavailable, please check back later !");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const changeNetwork = (e) => {
    const inputValue = e.target.value;
    setNetwork(inputValue);
    // console.log(inputValue);
  };

  // handle two onchange props
  const handleNetworkAndInputValidation = (e) => {
    changeNetwork(e);
    handleInputField(e);
  };

  const changeDataVol = (e) => {
    const selectedPlanCode = e.target.value;
    const selectedDataVol = networkData.find((ctr) =>
      ctr.dataVol.some((item) => item.plan_code === selectedPlanCode)
    );
    // console.log("selected =>>", selectedDataVol);

    if (selectedDataVol) {
      setDataVol(selectedPlanCode);
      setAmounts(selectedDataVol.dataVol);
      setAmountPlaceHolder(false);

      const selectedName = selectedDataVol.dataVol.find(
        (item) => item.plan_code === selectedPlanCode
      )?.name;

      // console.log(selectedName);

      // Pass the selectedName to the network
      setName(selectedName);
    } else {
      setDataVol("");
      setAmounts([]);
      setAmountPlaceHolder(true);
      setNetwork(""); // If no data is selected, clear the network value
    }

    setPhoneNumber("");
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
      try {
        setLoading(true);
        const response = await directCoupon(network, dataVol, phoneNumber);
        // console.log("c", response);
        if (response.code === "000") {
          alert(response.message);
          router.reload();
        } else if (response) {
          alert(response.message);
          router.reload();
        }
      } catch (error) {
        console.log(error);
        // console.log(error.response);
        alert(`Something went wrong! If problem persist check your network`);
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
            <h3 className="text-black bg-violet-400 border-slate-200 rounded-2xl text-xl p-5">MTN DIRECT COUPON</h3>
            <div className="text-xs p-0 m-2">
              <p>Dial *323*4# or *323*1# to check balance</p>
              <p>You might be unable to check balance atimes due to network</p>
              <p>Hence, confirm final status via your history</p>
            </div>

            <select
              className={`${styles.formControl} input-field`}
              onChange={handleNetworkAndInputValidation}
            >
              <option>--Choose Network--</option>
              <option value={33}>MTN DATA COUPON</option>
            </select>
            <br />
            <select
              className={`${styles.formControl} input-field`}
              onChange={handleDataVolAndInputValidation}
              value={dataVol}
            >
              <option>--Data Volume--</option>
              {networkData.map((ctr) =>
                ctr.dataVol.map((data) => (
                  <option value={data.plan_code} key={data.plan_code}>
                    {data.name}
                  </option>
                ))
              )}
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
                {amountPlaceHolder
                  ? "amount"
                  : amounts.map((data) => (
                      <h2 key={data.plan_code}>{data.amount}</h2>
                    ))}
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
        network={name}
      />
      <Footer />
    </div>
  );
}

export default DirectCoupon;
