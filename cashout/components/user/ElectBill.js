import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import {
  buyElectBillHandler,
  verifyElectBillHandler,
} from "@/pages/api/user/electbill";
import { removeUserSession } from "@/Utils/Common";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import ElectBill from "./userJsx/ElectBill";
import { authGuard } from "@/Utils/authGuard";
// import Footer from "../../components/user/Footer";

function ElectBillComp(ctx) {
  const router = useRouter();
  authGuard(ctx, router);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [renderName, setRenderName] = useState();
  const [purchaseBtn, setPurchaseBtn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

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
    // console.log(serviceID);
  };

  const handleSelectedType = (event) => {
    const inputValue = event.target.value;
    setSelectedType(inputValue);
    // console.log(inputValue);
  };

  // handle IUC NUMBER
  const handleMeterNumber = (e) => {
    const inputValue = e.target.value;
    setMeterNumber(inputValue);
    // console.log(inputValue);
  };

  const handleAmount = (e) => {
    const inputValue = e.target.value;
    const amountNumber = inputValue.replace(/\D/g, "");
    setAmount(amountNumber);
    // console.log(inputValue);
  };

  //   Verify METER NUMBER
  const handleFormSubmit = async (event) => {
    if (typeof window !== "undefined") {
      event.preventDefault();

      try {
        // check 404 error
        setLoading(true);
        setRenderName(false);
        setIsEditable(true);
        const response = await verifyElectBillHandler(
          ctx,
          selectedService,
          selectedType,
          meterNumber
        );
        //    console.log(response);
        if (
          response.error === "Invalid token." ||
          response.error === "Token has been revoked or expired." ||
          response.error === "Oops! Bad Request !"
        ) {
          removeUserSession();
          expireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        } else if (response.error) {
          setErrorMessage(response.error);
        } else if (response.code === "000") {
          setRenderName(response.data.Customer_Name);
          setIsEditable(false);
          setPurchaseBtn(true);
          setLoading(false);
        }
      } catch (error) {
        //   console.log(error);
        throw new Error(`An error occurred ${error}`);
      } finally {
        setLoading(false);
      }
    }
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
      try {
        setLoading(true);
        const response = await buyElectBillHandler(
          ctx,
          selectedService,
          meterNumber,
          selectedType,
          amount
        );
        if (
          response.error === "Invalid token." ||
          response.error === "Token has been revoked or expired." ||
          response.error === "Oops! Bad Request !"
        ) {
          removeUserSession();
          expireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        } else if (response.error) {
          setErrorMessage(response.error);
        } else if (response.code === "000") {
          setErrorMessage(null);
          alert(response.message);
          //   router.reload();
          const buyAgain = window.confirm("Do you wish to buy again ?");
          if (buyAgain) {
            router.push("/user/electBill");
          } else {
            router.push("/user/history");
          }
        }
      } catch (error) {
        // console.log(error);
        throw new Error(`An error occurred ${error}`);
      } finally {
        setLoading(false);
        closeModal();
      }
    }
  };

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  return (
    <div className="bg-slate-500 h-screen md:h-screen xl:h-screen">
      <ElectBill
        loading={loading}
        errorMessage={errorMessage}
        redirecting={redirecting}
        allSelected={allSelected}
        renderName={renderName}
        purchaseBtn={purchaseBtn}
        modalIsOpen={modalIsOpen}
        isEditable={isEditable}
        selectedService={selectedService}
        selectedType={selectedType}
        meterNumber={meterNumber}
        amount={amount}
        verifyServiceId={verifyServiceId}
        verifyType={verifyType}
        handleServiceChange={handleServiceChange}
        handleSelectedType={handleSelectedType}
        handleMeterNumber={handleMeterNumber}
        handleAmount={handleAmount}
        handleFormSubmit={handleFormSubmit}
        submit={submit}
        openModal={openModal}
        closeModal={closeModal}
        confirmData={confirmData}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
}

export default ElectBillComp;
