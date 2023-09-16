import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCoupon, directCoupon } from "@/pages/api/user/directCoupon";
import {
  expireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import { getUser, removeUserSession } from "@/Utils/Common";
import DirectCoupon from "./userJsx/DirectCoupon";

function DirectCouponComp(ctx) {
  const router = useRouter();
  const userId = getUser();
  const { token } = getUserIdAndToken(ctx);

  const [networkData, setNetworkData] = useState([]);
  const [amountPlaceHolder, setAmountPlaceHolder] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const [network, setNetwork] = useState("MTN DATA COUPON");
  const [dataVol, setDataVol] = useState("--Data Volume--");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amounts, setAmounts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!userId || !token) {
      removeUserSession();
      expireSessionAndRedirect(ctx, router);
    }

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
    if (userId) {
      fetchData();
    }
  }, [userId, token, ctx, router]);

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
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    if (inputValue.length <= 11) {
      setPhoneNumber(inputValue);
      setError(null);
      handleInputField(e);
    } else {
      setError("Phone number must be 11 digits long");
      setPhoneNumber("");
    }
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
        const response = await directCoupon(ctx, network, dataVol, phoneNumber);
        // console.log("c", response);
        if (
          response.error === "Invalid token." ||
          response.error === "Token has been revoked or expired."
        ) {
          removeUserSession();
          expireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        } else if (response.error) {
          setErrorMessage(response.error);
        } else if (response.code === "000") {
          alert(response.message);
          router.reload();
        }
        setLoading(false);
        setRedirecting(false);
      } catch (error) {
        // console.log(error.response);
        throw new Error(`An error occurred ${error}`); // server error - nextjs
      } finally {
        setLoading(false);
        setRedirecting(false);
        closeModal();
      }
    }
  };

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

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
      <DirectCoupon
        networkData={networkData}
        amountPlaceHolder={amountPlaceHolder}
        loading={loading}
        dataVol={dataVol}
        phoneNumber={phoneNumber}
        amounts={amounts}
        modalIsOpen={modalIsOpen}
        allSelected={allSelected}
        name={name}
        handleNetworkAndInputValidation={handleNetworkAndInputValidation}
        handleDataVolAndInputValidation={handleDataVolAndInputValidation}
        handlePhoneNumberAndInputValidation={
          handlePhoneNumberAndInputValidation
        }
        submit={submit}
        openModal={openModal}
        closeModal={closeModal}
        confirmData={confirmData}
        setModalIsOpen={setModalIsOpen}
        error={error}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default DirectCouponComp;
