import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "../../styles/TvSub.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import authHeader from "../../services/auth-Header";
import Sidebar from "@/components/user/Sidebar";
import SmileIcon from "@/components/heroIcons/SmileIcon";
import ConfirmTvModal from "../../components/utils/ConfirmTvModal";
import API_BASE_URL from "@/apiConfig";
import Loader from "@/components/utils/Loader";
// import Footer from "../../components/user/Footer";

const BASE_URL = `${API_BASE_URL}/tvSub`;

export default function TvSub() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [insufficientBal, setInsufficientBal] = useState(false);
  const [unauthorised, setUnauthorised] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [invalidIuc, setInvalidIuc] = useState(false);
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
        const response = await fetch(BASE_URL);
        const jsonData = await response.json();
        setData(jsonData.content);
        // console.log(jsonData.content)
      } catch (error) {
        throw new Error("An error occurred.");
      }
    }
    fetchData();
  }, []);

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
    setIucNumber(inputValue);
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
        setInsufficientBal(false);
        setUnauthorised(false);
        const response = await axios.post(
          `${BASE_URL}/verify-iuc`,
          {
            serviceID: selectedService,
            billersCode: iucNumber,
            variation_code: variationCode,
          },
          {
            headers: authHeader(),
          }
        );
        if (response.data.code === "000") {
          setRenderName(response.data.data.content.Customer_Name);
          setRenderDueDate(response.data.data.content.Due_Date);
          setPurchaseBtn(true);
          setLoading(false);
          //   console.log(response);
          //   alert(response.data.message);
          //   router.reload();
        }
      } catch (error) {
        if (error.response?.data?.error) {
          setUnauthorised(true);
        } else if (error.response.data.code === "006") {
          setInsufficientBal(true);
        } else if (error.response.data.code === "003") {
          setInvalidIuc(true);
          // console.log(error.response.data);
        } else if (error.response.data.code === "005") {
          setApiError(true);
        } else {
          alert("Something went wrong !");
        }
        // console.log(error);
        // setLoading(false);
      }
    }
    setLoading(false);
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
      const user = JSON.parse(sessionStorage.getItem("user"));
      const id = user._id;

      try {
        setLoading(true);
        setInsufficientBal(false);
        setUnauthorised(false);
        const response = await axios.post(
          `${BASE_URL}/pay/${id}`,
          {
            serviceID: selectedService,
            billersCode: iucNumber,
            variation_code: selectedVariation,
          },
          {
            headers: authHeader(),
          }
        );
        if (response.data.code === "000") {
          // console.log(response);
          alert(response.data.Record.message);
          setLoading(false);
          router.reload();
        }
      } catch (error) {
        if (error.response?.data?.error) {
          setUnauthorised(true);
        } else if (error.response?.data?.code === "006") {
          setInsufficientBal(true);
        } else if (error.response?.data?.code === "005") {
          setApiError(true);
        } else {
          alert("Something went wrong !");
        }
        // console.log(error);
        // setLoading(false);
      }

      closeModal();
    }
  };

  return (
    <div className="bg-slate-500 h-screen md:h-screen xl:h-screen">
      {loading && <Loader />}
      <div>
        <Sidebar />
      </div>
      <form
        className={`${styles.form} bg-slate-500 h-full md:h-screen xl:h-screen`}
        onSubmit={handleFormSubmit}
      >
        <div className="p-10 flex flex-col">
          <div className="mx-auto">
            <h3 className="text-black text-center text-xl p-5">
              Cable Subscription
            </h3>
            <div>
              {insufficientBal && (
                <div
                  className={`${styles.errorMessage} item-center justify-center flex gap-2`}
                >
                  Fund your wallet now boss !
                  <span className="fill-blue-800 stroke-yellow-600">
                    <SmileIcon />
                  </span>
                </div>
              )}
              {unauthorised && (
                <div className={styles.errorMessage}>
                  Not authorized to access this route! Please get yourself
                  authenticated.
                </div>
              )}
              {apiError && (
                <div className={`${styles.errorMessage} text-center`}>
                  {" "}
                  Server Error !
                </div>
              )}
              {invalidIuc && (
                <div className={`${styles.errorMessage} text-center`}>
                  {" "}
                  Invalid IUC number. Please re-check number and try again !
                </div>
              )}
            </div>
            <div className="flex flex-col mx-auto ">
              <div className="ml-5">
                <label htmlFor="service-select">Select Service:</label>
              </div>
              <div className="mx-auto">
                {" "}
                <select
                  className={`${styles.formControl} input-field`}
                  id="service-select"
                  value={selectedService}
                  onChange={handleServiceChange}
                >
                  <option value="">Select a service</option>
                  {getServiceOptions()}
                </select>
              </div>

              <div className="ml-5">
                <label htmlFor="variation-select">Select Variation:</label>
              </div>
              <div className="mx-auto">
                <select
                  className={`${styles.formControl} input-field`}
                  id="variation-select"
                  value={selectedVariation}
                  onChange={handleVariationChange}
                >
                  <option value="">Select a variation</option>
                  {getVariationOptions()}
                </select>
              </div>
              <div className="ml-5">
                <label className="text-sm" htmlFor="">
                  IUC Number:
                </label>
              </div>
              <div className="mx-auto">
                <input
                  placeholder="IUC NUMBER"
                  className={`${styles.formControl} text-red-400 text-sm input-field`}
                  value={iucNumber}
                  onChange={handleIucNumber}
                />
              </div>
              <div className="flex flex-col mx-auto">
                {" "}
                {/* Added "items-center" class to center align the content */}
                {renderName && (
                  <div className="flex flex-col">
                    {" "}
                    {/* Added "items-center" class to center align the content */}
                    <label className="block text-sm" htmlFor="">
                      Customer&apos;s Name:
                    </label>{" "}
                    {/* Added "mb-2" class to add some margin-bottom */}
                    <input
                      className={`${styles.formControl} text-red-400 input-field`}
                      value={renderName}
                      readOnly
                    />
                  </div>
                )}
              </div>
              <div className="flex mx-auto flex-col">
                {" "}
                {/* Added "items-center" class to center align the content */}
                {renderDueDate && (
                  <div className="flex flex-col">
                    {" "}
                    {/* Added "items-center" class to center align the content */}
                    <label className="block text-sm" htmlFor="">
                      Due Date:
                    </label>{" "}
                    {/* Added "mb-2" class to add some margin-bottom */}
                    <input
                      className={`${styles.formControl} text-red-400 input-field`}
                      value={renderDueDate}
                      readOnly
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={`${styles.submitDashboardBtn} `}>
              <div
                className={`${styles.btn} border border-white bg-white text-center hover:cursor-pointer`}
              >
                {purchaseBtn ? (
                  <button onClick={submit} disabled={!allSelected}>
                    Purchase Tv Sub
                  </button>
                ) : (
                  <button
                    disabled={!allSelected}
                    style={{
                      opacity: allSelected ? "1" : "0.5",
                      cursor: allSelected ? "pointer" : "not-allowed",
                    }}
                  >
                    {loading ? <p>Loading...</p> : "Verify IUC Number"}
                  </button>
                )}
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
      <ConfirmTvModal
        //    selectedService={selectedService}
        selectedVariation={selectedVariation}
        iucNumber={iucNumber}
        modalIsOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={confirmData}
      />
    </div>
  );
}
