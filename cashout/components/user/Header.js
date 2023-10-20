import React, { useRef, useState } from "react";
import Greetings from "../utils/Greetings";
import styles from "../../styles/dashboard.module.css";
import SmileIcon from "../heroIcons/SmileIcon";
import Link from "next/link";
import MotionText from "./MotionText";
import Modal from "react-modal";
Modal.setAppElement("#__next");
// import { useRouter } from "next/router";

export default function Header({ user }) {
  const referrerLinkRef = useRef(null);
  const [showCopy, setShowCopy] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const copyToClipboard = () => {
    const textToCopy = referrerLinkRef.current.innerText;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setShowCopy("Copied");
          setTimeout(() => {
            setShowCopy(null);
          }, 1000);
        })
        .catch(() => {
          setShowCopy("Unable to copy");
        });
    }
  };

  const onConfirmUpgrade = async () => {
    return null;
  };

  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "50",
    },
  };

  return (
    <div className="justify-content-between">
      <div className={styles.headerCon}>
        <div className="flex flex-row justify-end"></div>
        <div className="flex justify-center text-center lg:mt-[2ch] mt-[2ch]">
          <h1 className="text-lg">
            <Greetings />
          </h1>
          <span className="fill-blue-900 stroke-blue-600">
            <SmileIcon />
          </span>
        </div>
        <br />

        {user && (
          <div className="text-center">
            <h2 className={styles.welBack}>Welcome Back {user.firstName}!</h2>
            <p className="mt-1 p-3 text-xs text-center ">
              Refer people to Wondersdata and earn 1,000 naira immediately the
              person upgrade his/her account to Partner&apos;s Account Type
            </p>
            <div className="flex justify-center space-x-1 text-[1ch]">
              <span className="text-slate-300">My Referral Link:</span>
              <p ref={referrerLinkRef} className="text-slate-100">
                {user.referralLink}
              </p>
              <span className="text-[.9ch]">{showCopy}</span>
              <button
                className="hover:text-green-500"
                onClick={copyToClipboard}
              >
                copy
              </button>
            </div>
            <div className="flex w-screen justify-center gap-5 mt-5">
              <div className="border ml-2 text-sm border-solid border-secondary p-2 rounded-2xl bg-secondary">
                <Link href={"/user/fundWallet"}>
                  <button className={styles.fundWallet}>Fund Wallet</button>
                </Link>
              </div>
              <div className="border mr-2 text-sm border-solid border-secondary p-2 rounded-2xl bg-secondary">
                <Link href={"/user/history"}>
                  <button className={styles.myTransact}>My Transactions</button>
                </Link>
              </div>
            </div>
            <div className="pt-3 mt-2 ">
              <p className="font-sans text-slate-100">
                {" "}
                Acct Type: <span className="uppercase">{user.accountType}</span>
                <span className="animate-bounce inline-block px-2 py-1 bg-green-500 text-blue-600 rounded-full text-sm">
                  ✔
                </span>
              </p>
            </div>
            {user.accountType === "corporate" && (
              <div>
                <button
                  disabled={true}
                  onClick={openModal}
                  className="text-[.8ch] font-bold tracking-wider border-1 p-1 bg-white" // hover:bg-yellow-400 hover:text-red-400
                >
                  Upgrade
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Example Modal"
                  style={customStyles}
                >
                  <div className="p-1">
                    <p className="text-center text-blue-700">
                      You will be charged {"\u20A6"} 2,000 for this upgrade to
                      Partner&apos;s Account Type
                    </p>
                    <div className="text-center mt-10 flex justify-around">
                      <button
                        className="text-green-600 font-bold"
                        onClick={onConfirmUpgrade}
                      >
                        Okay
                      </button>
                      <button
                        className="text-red-600 font-bold"
                        onClick={closeModal}
                      >
                        Not Interested
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        )}
      </div>
      <MotionText text="Educational Pin now available. Data balance checkers- MTN-SME - *312*4*3*3# or *461*4#, MTN-CG - *460*260# or *460*4*4#, Glo - *127*0#, Airtel - *140#, 9mobile SME - *917*9#, 9mobile gifting - *228#. Promo on affiliate or standalone website creation is on going. Grab the offer now ! " />{" "}
    </div>
  );
}
