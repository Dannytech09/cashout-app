import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Link from "next/link";
import axios from "axios";
import {
  expireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import { useRouter } from "next/router";
import API_BASE_URL from "@/apiConfig";
Modal.setAppElement("#__next");

// import { headers } from "@/next.config";

const UserInfoForm = ({ isOpen, closeBvnModal }) => {
  const router = useRouter();

  const [bvn, setBvn] = useState("");
  const [dob, setDob] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handlePaste = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    setIsSubmitDisabled(phoneNumber.length !== 11)
  }, [phoneNumber])

  const submitUserInfo = async (e, ctx) => {
    e.preventDefault(); // if not added it can sometimes trigger an err

    const { userId, token } = getUserIdAndToken(ctx);
    try {
      setLoading(true);
      setMessage("");
      const dateOfBirth = formatDOB(dob);

      const data = { bvn, dateOfBirth, otherNames, lastName, phoneNumber };
      const head = {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const resp = await axios.post(
        `${API_BASE_URL}/api/v1/bvn-validation/${userId}`,
        data,
        {
          headers: head,
        }
      );
      // console.log(data);
      if (resp.data.code === "000") {
        setMessage(resp.data.message);
        // console.log("submitted");
      }
    } catch (error) {
      if (
        error.response.error === "Invalid token." ||
        error.response.error === "Token has been revoked or expired." ||
        error.response.error === "Oops! Bad Request !"
        // error.response.data.error === "Not authorized to access this route.."
      ) {
        sessionStorage.removeItem("buttonClicked");
        sessionStorage.clear();
        expireSessionAndRedirect(ctx, router);
        router.push("/login");
      } else if (error) {
        setMessage(error.response.data.error);
        // console.log(error.response);
      }
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "85%",
      height: "90vh",
      overflow: "auto"
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "50",
    },
  };

  const formatDOB = (dobInput) => {
    const date = new Date(dobInput);

    // get day, mnth and yr
    const day = date.getDate().toString().padStart(2, 0);
    const month = date.toLocaleString("en-us", { month: "short" });
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  return (
    <Modal
      // ariaHideApp={false}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false} // Disable closing on overlay click
      contentLabel="User Info Form"
      style={customStyles}
    >
      <div className="select-none">
      <h2 className="text-center font-bold mb-3">ACCOUNT PROFILING</h2>
      <div className="text-xs">
        In accordance to CBN recently released statements which can be found{" "}
        <Link
          className="text-blue-400 hover:text-green-500"
          href={"https://eu.docs.wps.com/l/sIHysy5bIAf25ka0G?v=v2"}
          target="_blank"
        >
          here
        </Link>{" "}
        {""}
        about the creation of virtual accounts. BVN/NIN is now mandatory
      </div>
      <br />
      <p className="text-xs">
        Hence, kindly fill these details correctly to continue using all our
        services
      </p>
      <br />
      {message ? (
        <div className="text-center text-sm p-2 bg-black text-blue-600 border rounded-lg">
          <p>{message}</p>
        </div>
      ) : (
        ""
      )}
      <hr style={{ borderColor: "black" }} className="m-2" />
      <hr style={{ borderColor: "red" }} />
      <br />
      <p className="text-xs font-bold font-sans text-red-600">
        Note: Whether or not your info is correct you will be charged {"\u20A6"}
        15 for this service. To avoid being charged multiple times kindly fill
        all details correctly at once
      </p>

      <form onSubmit={submitUserInfo}>
        <div className="text-sm">
          <div className="p-2">
            BVN: {""}
            <input
              className="border border-black rounded-md text-center text-xs p-2"
              placeholder="12123434343"
              type="number"
              onPaste={handlePaste}
              required
              maxLength={11}
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
            />
          </div>
          <div className="p-2">
            Date of Birth: {""}
            <input
              className="border border-black rounded-md text-center text-xs p-2"
              type="date"
              onPaste={handlePaste}
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="p-2">
            Other Names: {""}
            <input
              className="border border-black rounded-md text-center text-xs p-2"
              placeholder="John Doe"
              type="text"
              onPaste={handlePaste}
              required
              maxLength={40}
              value={otherNames}
              onChange={(e) => setOtherNames(e.target.value)}
            />
          </div>
          <div className="p-2">
            Last Name: {""}
            <input
              className="border border-black rounded-md text-center text-xs p-2"
              placeholder="Adeleke"
              type="text"
              onPaste={handlePaste}
              required
              maxLength={40}
              value={lastName}
              onChange={(e) => {
                // console.log(e.target.value);
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="p-2">
            Phone No.: {""}
            <input
              className="border border-black rounded-md text-center text-xs p-2"
              placeholder="09099999999"
              type="number"
              onPaste={handlePaste}
              required
              maxLength={11}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <br />

        <div className="flex gap-2 justify-center">
          <button
          disabled={isSubmitDisabled}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-gray active:bg-gray-600 transition duration-300"
          >
            {loading ? "Validating..." : "Submit"}
          </button>

          <button
            onClick={closeBvnModal}
            className=" bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-gray active:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
    </Modal>
  );
};

export default UserInfoForm;
