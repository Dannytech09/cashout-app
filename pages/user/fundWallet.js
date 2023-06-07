import React from "react";
import Layout from "../../components/user/Layout";
import withAuth from "../../hocs/withAuth";

const fundWallet = () => {
  return (
    <div className="bg-black text-white h-screen w-screen ">
      <div className="p-2 m2">
        <div className="text-center w-screen">
          <p className="text-lg border border-blue-400 bg-blue-400 ">
            Auto Funding by Transfer and Manual Funding
          </p>
        </div>
        <div className="mt-4 ">
          <p className="text-yellow-700 p-2 text-sm">
            <span className="text-blue-400"> Manual Funding:</span> Involves
            sending money to any of the below accounts and sending payment proof
            to us on whatsapp <span className="text-green-300">OR</span> using
            the notification link below just once. Upon sending us web
            notification, kindly exercise patience for confirmation of your
            money. You only get credited when we confirm payment.
          </p>
          <p className="text-yellow-700 p-2 text-sm">
            {" "}
            <span className="text-blue-400">Auto-Funding:</span> As the name
            implies, means auto credit of your wallet once the receiving bank
            gets value. It works like normal bank transfer so no need to panic.
            Kindly copy the account number on your dashboard, goto your mobile
            banking app or wallet and make payment to the account number{" "}
          </p>
          <p className="text-center mt-2 text-white">
            Account Name: Adebola Daniel Juwon
          </p>
          <ul className="text-center ">
            <div className="border-blue-400 w-screen p-5 m-3 bg-blue-400 text-white">
              <li>Opay - 9066560771</li>
              <li>Kuda - 1101725915</li>
              <li>GTB - 0449785257</li>
              <li>Zenith Bank - 2209469444</li>
              <li>Access Bank - 1415440070</li>
            </div>
          </ul>
        </div>
        <form>
          <div className="text-center text-xs">
            <p>
              Please send us a notification through the below form after payment
              is made. If we verify that no payment was made before using this
              form below, it may lead to temporary suspension of the owner's
              account. Thanks.
            </p>
            <p className="text-red-500 p-4 m4">form coming soon...</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(fundWallet);
