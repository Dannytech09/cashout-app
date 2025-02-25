import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { buyDataHandler } from "@/pages/api/user/buydata";
import BuyData from "./userJsx/BuyData";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
// import { beneficiary } from "@/pages/api/user/beneficiary";

let name;
let package_name;

function BuyDataComp({ ctx, errorGSMessage, networkData, beneficiary }) {
  const router = useRouter();
  // const user = getUser();
  // const id = user ? user.id : null;
  // const { token } = getUserIdAndToken(ctx);

  // const [networkData, setNetworkData] = useState(data);
  const [amountPlaceHolder, setAmountPlaceHolder] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const [network, setNetwork] = useState("--Choose Network--");
  const [dataVol, setDataVol] = useState("--Data Volume--");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [dataVols, setDataVols] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  // pass props from parent => child => child of child
  const handlePhoneClick = (e) => {
    setPhoneNumber(e);
    // console.log(phoneNumber);
  };

  const clearPhoneClick = () => {
    setPhoneNumber("");
  };
  // pass props from parent => child => child of child

  const changeNetwork = (e) => {
    const selectedVariationString = e.target.value;

    const selectedNetwork = networkData.find(
      (ctr) => ctr.variation_string === selectedVariationString
    );
    if (selectedNetwork) {
      setDataVols(selectedNetwork.dataVol);

      setPhoneNumber("");
      setAmount("");
      setNetwork(selectedNetwork.variation_string); // Set the network based on the found network
    } else {
      setDataVols([]); // Clear the dataVols state when the network is not found (optional)
      setPhoneNumber("");
      setAmount("");
      setNetwork(""); // Set the network to an empty string when the variation_string is not found (optional)
    }
    name = selectedNetwork?.variation_string;
  };

  // handle two onchange props
  const handleNetworkAndInputValidation = (e) => {
    changeNetwork(e);
    handleInputField(e);
  };

  const changeDataVol = (e) => {
    setDataVol(e.target.value);
    const selectedDataVol = dataVols.find(
      (ctr) => ctr.variation_code === e.target.value
    );
    package_name = selectedDataVol.name;
    // check if selectedDataVol is undefined. if not checked it will throw an
    // error if user selects a value and later select the default value
    if (selectedDataVol) {
      setAmounts(selectedDataVol);
      setAmountPlaceHolder(false);
    }
    setPhoneNumber("");
    setAmount("");
  };

  // handle two onchange props
  const handleDataVolAndInputValidation = (e) => {
    changeDataVol(e);
    handleInputField(e);
  };

  // // phone from beneficiary
  // useEffect((e) => {
  //   handlePhoneClick(e)
  //   handleInputField(e)
  // }, [handlePhoneClick])

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

  const onRequestClose = () => {
    setModalIsOpen(false);
  };

  // Track when modal is to leave the screen upon opening it
  useEffect(() => {
    let timer;
    if (modalIsOpen) {
      timer = setTimeout(() => {
        closeModal();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [modalIsOpen]);

  const confirmData = async () => {
    if (typeof window !== "undefined") {
      try {
        setLoading(true);
        setRedirecting(false);
        setErrorMessage(null);
        const response = await buyDataHandler(
          ctx,
          network,
          dataVol,
          phoneNumber
        );
        // console.log("res", response);
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
          // const buyAgain = window.confirm("Do you wish to buy again ?");
          // if (buyAgain) {
          //   router.push("/user/buyDataS");
          // } else {
          //   router.push("/user/dashboard");
          // }
        }
        setLoading(false);
        setRedirecting(false);
      } catch (error) {
        // console.log(error);
        setErrorMessage(`client or server error ${error}`);
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
    <div className="bg-slate-700 h-100 md:h-100 xl:h-100">
      <BuyData
        beneficiary={beneficiary}
        clearPhoneClick={clearPhoneClick}
        handlePhoneClick={handlePhoneClick}
        amountPlaceHolder={amountPlaceHolder}
        loading={loading}
        errorMessage={errorMessage}
        errorGSMessage={errorGSMessage}
        amount={amount}
        amounts={amounts}
        handleNetworkAndInputValidation={handleNetworkAndInputValidation}
        handleDataVolAndInputValidation={handleDataVolAndInputValidation}
        handlePhoneNumberAndInputValidation={
          handlePhoneNumberAndInputValidation
        }
        submit={submit}
        confirmData={confirmData}
        networkData={networkData}
        network={network}
        dataVol={dataVol}
        dataVols={dataVols}
        phoneNumber={phoneNumber}
        modalIsOpen={modalIsOpen}
        allSelected={allSelected}
        openModal={openModal}
        closeModal={closeModal}
        onRequestClose={onRequestClose}
        name={name}
        package_name={package_name}
        error={error}
      />
    </div>
  );
}

export default BuyDataComp;
