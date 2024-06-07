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

const UserInfoFormNin = ({ isOpen, closeNinModal }) => {
  const router = useRouter();

  const [nin, setNin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handlePaste = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    setIsSubmitDisabled(nin.length !== 11)
  }, [nin])

  const submitUserInfo = async (e, ctx) => {
    e.preventDefault(); // if not added it can sometimes trigger an err

    const { userId, token } = getUserIdAndToken(ctx);
    try {
      setLoading(true);
      setMessage("");

      const data = { nin };
      const head = {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const resp = await axios.post(
        `${API_BASE_URL}/api/v1/nin-validation/${userId}`,
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
        Note: No charges for NIN verification
      </p>

      <form onSubmit={submitUserInfo}>
        <div className="text-sm">
          <div className="p-2">
            NIN: {""}
            <input
              className="border border-black rounded-md text-center text-xs p-2"
              placeholder="22123434343"
              type="number"
              onPaste={handlePaste}
              required
              maxLength={11}
              value={nin}
              onChange={(e) => setNin(e.target.value)}
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
            onClick={closeNinModal}
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

export default UserInfoFormNin;
