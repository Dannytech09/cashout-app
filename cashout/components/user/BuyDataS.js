import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { buyDataSHandler, buyDataSGetHandler } from "@/pages/api/user/buydatas";
import BuyDataS from "./userJsx/BuyDataS";
import {
  expireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import { getUser, removeUserSession } from "@/Utils/Common";

let name;

function BuyDataSComp(ctx) {
  const router = useRouter();
  const userId = getUser();
  const { token } = getUserIdAndToken(ctx);

  const [networkData, setNetworkData] = useState([]);
  const [amountPlaceHolder, setAmountPlaceHolder] = useState(true);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (!userId || !token) {
      removeUserSession();
      expireSessionAndRedirect(ctx, router);
    }

    async function fetchData() {
      try {
        setLoading(true);
        const response = await buyDataSGetHandler();
        // console.log(response);
        setNetworkData(response.networkDataS);
        setLoading(false);
      } catch (error) {
        // console.log("err", error)
        alert(error.response.error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchData();
    }
  }, [userId, router, ctx, token]);

  const changeNetwork = (e) => {
    const selectedVariationString = e.target.value;

    const selectedNetwork = networkData.find(
      (ctr) => ctr.variation_string === selectedVariationString
    );
    if (selectedNetwork) {
      setDataVols(selectedNetwork.dataVol);

      setPhoneNumber("");
      setAmount("");
      setNetwork(selectedNetwork.network); // Set the network based on the found network
    } else {
      setDataVols([]); // Clear the dataVols state when the network is not found (optional)
      setPhoneNumber("");
      setAmount("");
      setNetwork(""); // Set the network to an empty string when the variation_string is not found (optional)
    }
    name = selectedNetwork.variation_string;
    // console.log("Selected Network:", variation);
    // console.log("Data Vols:", dataVols);
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
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [modalIsOpen]);

  const confirmData = async () => {
    if (typeof window !== "undefined") {
      try {
        setLoading(true);
        setRedirecting(false);
        setErrorMessage(null);
        const response = await buyDataSHandler(
          ctx,
          network,
          dataVol,
          phoneNumber
        );
        // console.log("res", response);
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
          setErrorMessage(null);
          alert(response.message);
          //   router.reload();
          const buyAgain = window.confirm("Do you wish to buy again ?");
          if (buyAgain) {
            router.push("/user/buyDataS");
          } else {
            router.push("/user/dashboard");
          }
        }
        setLoading(false);
        setRedirecting(false);
      } catch (error) {
        // console.log(error);
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
      <BuyDataS
        amountPlaceHolder={amountPlaceHolder}
        loading={loading}
        errorMessage={errorMessage}
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
        error={error}
      />
    </div>
  );
}

export default BuyDataSComp;
