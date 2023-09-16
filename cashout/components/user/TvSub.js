import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { authGuard } from "@/Utils/authGuard";
import { removeUserSession } from "@/Utils/Common";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import {
  buyTvSubHandler,
  getTvSubHandler,
  verifyTvSubHandler,
} from "@/pages/api/user/tvsub";
import TvSub from "./userJsx/TvSub";
// import Footer from "../../components/user/Footer";

function TvSubComp(ctx) {
  const router = useRouter();
  authGuard(ctx, router);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [renderName, setRenderName] = useState();
  const [renderDueDate, setRenderDueDate] = useState();
  const [purchaseBtn, setPurchaseBtn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedService, setSelectedService] = useState("");
  const [selectedVariation, setSelectedVariation] = useState("");
  const [iucNumber, setIucNumber] = useState("");
  const [data, setData] = useState([]);

  let variationCode;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTvSubHandler();
        // const jsonData = await response.json();
        if (
          response.error === "Invalid token." ||
          response.error === "Token has been revoked or expired."
        ) {
          removeUserSession();
          expireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        } else if (response.error) {
          setErrorMessage(response.error);
        } else {
          setData(response.content);
        }
      } catch (error) {
        // console.log(error);
        throw new Error(`An error occurred. ${error}`);
      }
    }
    fetchData();
  }, [ctx, router]);

  const handleServiceChange = (event) => {
    const serviceID = event.target.value;
    setSelectedService(serviceID);
    setSelectedVariation("");
    // console.log(serviceID);
  };

  const handleVariationChange = (event) => {
    variationCode = event.target.value;
    setSelectedVariation(variationCode);
    // console.log(variationCode);
  };

  // handle IUC NUMBER
  const handleIucNumber = (e) => {
    const inputValue = e.target.value;
    const iucNumber = inputValue.replace(/\D/g, "");
    setIucNumber(iucNumber);
    // console.log(inputValue);
  };

  const getServiceOptions = () => {
    return data.map((service) => (
      <option key={service.serviceID} value={service.serviceID}>
        {service.serviceID}
      </option>
    ));
  };

  const getVariationOptions = () => {
    const selectedServiceData = data.find(
      (service) => service.serviceID === selectedService
    );

    if (selectedServiceData) {
      return selectedServiceData.varations.map((variation) => (
        <option key={variation.variation_code} value={variation.variation_code}>
          {variation.name}
        </option>
        // console.log(selectedServiceData)
      ));
    }

    return null;
  };

  //   Verify IUC NUMBER
  const handleFormSubmit = async (event) => {
    if (typeof window !== "undefined") {
      event.preventDefault();

      try {
        // check 404 error
        setLoading(true);
        setRenderName(false);
        setRenderDueDate(false);
        const response = await verifyTvSubHandler(
          ctx,
          selectedService,
          iucNumber,
          variationCode
        );
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
          setRenderName(response.data.content.Customer_Name);
          setRenderDueDate(response.data.content.Due_Date);
          setPurchaseBtn(true);
          setLoading(false);
        } else {
          alert("Something went wrong !");
        }
      } catch (error) {
        // console.log(error);
        throw new Error(`An error occurred ${error}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormValidation = useCallback(() => {
    let allFormFilled = true;

    if (
      !selectedService ||
      !iucNumber ||
      selectedService === "Select a service"
    ) {
      allFormFilled = false;
    }

    setAllSelected(allFormFilled);
  }, [selectedService, iucNumber]);

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
        const response = await buyTvSubHandler(
          ctx,
          selectedService,
          iucNumber,
          selectedVariation
        );
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
          //   console.log(response);
          alert(response.Record.message);
          setLoading(false);
          router.reload();
        }
      } catch (error) {
        // console.log(error)
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
      <TvSub
        loading={loading}
        errorMessage={errorMessage}
        allSelected={allSelected}
        renderName={renderName}
        renderDueDate={renderDueDate}
        purchaseBtn={purchaseBtn}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedService={selectedService}
        selectedVariation={selectedVariation}
        iucNumber={iucNumber}
        handleServiceChange={handleServiceChange}
        handleVariationChange={handleVariationChange}
        handleIucNumber={handleIucNumber}
        getServiceOptions={getServiceOptions()}
        getVariationOptions={getVariationOptions}
        handleFormSubmit={handleFormSubmit}
        submit={submit}
        openModal={openModal}
        closeModal={closeModal}
        confirmData={confirmData}
      />
    </div>
  );
}

export default TvSubComp;
