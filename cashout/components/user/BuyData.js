import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BuyData from "./userJsx/BuyData";
import { buyDataGetHandler, buyDataHandler } from "@/pages/api/user/buydata";
import {
  expireSessionAndRedirect
} from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
// import { useSelector } from "react-redux";

function BuyDataComp(ctx) {
  const router = useRouter();
  // const userId = getUser();
  // const { token } = getUserIdAndToken(ctx);
  //   const { userId } = getUserIdAndToken(ctx);

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
    // if (!userId || !token) {
    //   removeUserSession();
    //   expireSessionAndRedirect(ctx, router);
    // }
    async function fetchData() {
      try {
        setLoading(true);
        const response = await buyDataGetHandler();
        // console.log(response);
        setNetworkData(response.networkData);
        setLoading(false);
      } catch (error) {
        // console.log("err", error)
        alert(error.response.error);
      } finally {
        setLoading(false);
      }
    }

      fetchData();
  }, []);

  //   if this  is enabled it can cause: Rendered more hooks than during the previous ...
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
        const response = await buyDataHandler(
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
            router.push("/user/buyData");
          } else {
            router.push("/user/dashboard");
          }
        }
        setLoading(false);
        setRedirecting(false);
      } catch (error) {
        // console.log(error);
        if (error) {
          throw new Error(`An error occurred ${error}`); // handle error from the above try block (server Error - nextjs)
        }
      } finally {
        setRedirecting(false);
        setLoading(false);
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
    <div className="bg-slate-500 h-screen md:h-screen xl:h-screen">
      <BuyData
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
        error={error}
      />
    </div>
  );
}

export default BuyDataComp;
