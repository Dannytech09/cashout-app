import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
import { buyEduGetHandler, buyEduHandler } from "@/pages/api/user/buyedupin";
import BuyEduPin from "./userJsx/BuyEduPin";

let name;
let pk;
let num;

function BuyEduPinComp(ctx) {
  const router = useRouter();
  // const user = getUser();
  // const id = user ? user.id : null;
  // const { token } = getUserIdAndToken(ctx);

  const [eduPin, setEduPin] = useState([]);
  const [amountPlaceHolder, setAmountPlaceHolder] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const [edu, setEdu] = useState("--Choose Edu Type--");
  const [vol, setVol] = useState("--number of pin--");
  const [amount, setAmount] = useState("");
  const [vols, setVols] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    async function fetchData(ctx) {
      try {
        setLoading(true);
        const response = await buyEduGetHandler();
        // console.log(response)
        setEduPin(response.eduPin);
        setLoading(false);
        if (
          response.error === "Invalid token." ||
          response.error === "Token has been revoked or expired." ||
          response.error === "Oops! Bad Request !"
        ) {
          removeUserSession();
          expireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        } else if (response.error) {
          alert(response.error);
          removeUserSession();
          expireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        }
      } catch (error) {
        throw new Error(`An error occurred ${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const changeNetwork = (e) => {
    const inputType = e.target.value;

    const selectedType = eduPin.find(
      (ctr) => ctr.type === inputType
    );
    if (selectedType) {
        setVols(selectedType.vol);

      setAmount("");
      setEdu(selectedType.type); 
    } else {
        setVols([]); 
      setAmount("");
      setEdu(""); 
    }
    name = selectedType.type;
    // console.log("Selected type array:", selectedType);
    // console.log("selected type value:", name);
  };

  // handle two onchange props
  const handleEduTypeAndInputValidation = (e) => {
    changeNetwork(e);
    handleInputField(e);
  };

  const changeVol = (e) => {
    const inputVol = e.target.value;
    setVol(inputVol);
    const selectedVol = vols.find(
      (ctr) => ctr.plan_code === inputVol
    );
    pk = selectedVol.plan_code;
    num = selectedVol.name;
    // console.log("vol", num)
    // console.log("pk", pk)
    if (selectedVol) {
      setAmounts(selectedVol);
      setAmountPlaceHolder(false);
    //   console.log("l", selectedName)
    }
    setAmount("");
};

  // handle two onchange props
  const handleEduVolAndInputValidation = (e) => {
    changeVol(e);
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
        const response = await buyEduHandler(
          ctx,
          name,
          pk,
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
          const buyAgain = window.confirm("Do you wish to buy again ?");
          if (buyAgain) {
            router.push("/user/buyEduPin");
          } else {
            router.push("/user/history");
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
        input.value === "--Choose Edu Type--"
      ) {
        allFormFilled = false;
      }
    });

    setAllSelected(allFormFilled);
  }

  return (
    <div className="bg-slate-500 h-full md:h-full xl:h-full">
      <BuyEduPin
        amountPlaceHolder={amountPlaceHolder}
        loading={loading}
        errorMessage={errorMessage}
        amount={amount}
        amounts={amounts}
        handleEduTypeAndInputValidation={handleEduTypeAndInputValidation}
        handleEduVolAndInputValidation={handleEduVolAndInputValidation}
        submit={submit}
        confirmData={confirmData}
        eduPin={eduPin}
        edu={edu}
        vol={vol}
        vols={vols}
        modalIsOpen={modalIsOpen}
        allSelected={allSelected}
        openModal={openModal}
        closeModal={closeModal}
        onRequestClose={onRequestClose}
        name={name}
        num={num}
        pk={pk}
      />
    </div>
  );
}

export default BuyEduPinComp;
