import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { buyAirtimeHandler } from "@/pages/api/user/buyAirtime";
import BuyAirtime from "./userJsx/BuyAirtime";
import { authGuard } from "@/Utils/authGuard";
import { expireSessionAndRedirect } from "@/Utils/authCookies";

function BuyAirtimeComp(ctx) {
  const router = useRouter();
  authGuard(ctx, router);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [error, setError] = useState(null);

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

  const changeAmount = (e) => {
    const inputValue = e.target.value;

    const amountNumber = inputValue.replace(/\D/g, "");
    setAmount(amountNumber);

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
      try {
        setLoading(true);
        setErrorMessage(null);
        const response = await buyAirtimeHandler(
          ctx,
          network,
          phoneNumber,
          amount
        );
        // console.log(response)
        if (
          response.error === "Invalid token." ||
          response.error === "Token has been revoked or expired." ||
          response.error === "Oops! Bad Request !"
        ) {
          sessionStorage.removeItem("buttonClicked");
          sessionStorage.clear();
          expireSessionAndRedirect(ctx, router);
          router.push("/login");
        } else if (response.error) {
          setErrorMessage(response.error);
        } else if (response.code === "000") {
          alert(response.message);
          router.reload();
          // setLoading(false);
          // console.log(response)
        }
      } catch (error) {
        throw new Error(`An error ocurred ${error}`);
      } finally {
        setLoading(false);
        closeModal();
      }
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
      <BuyAirtime
        loading={loading}
        errorMessage={errorMessage}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        allSelected={allSelected}
        error={error}
        network={network}
        phoneNumber={phoneNumber}
        amount={amount}
        serviceId={serviceId}
        changeNetwork={changeNetwork}
        changePhoneNumber={changePhoneNumber}
        changeAmount={changeAmount}
        submit={submit}
        openModal={openModal}
        closeModal={closeModal}
        confirmData={confirmData}
      />
    </div>
  );
}

export default BuyAirtimeComp;
