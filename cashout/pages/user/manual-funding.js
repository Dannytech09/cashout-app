import React from "react";
import Card from "@/components/utils/Card";
import Sidebar from "@/components/user/Sidebar";
import Notification from "@/components/user/Notification";

const ManualFunding = () => {
  return (
    <Card className="overflow-y-auto overflow-x-0 fixed inset-0 bg-black max-sm:flex-col text-center z-60 flex p-4 justify-between border-red-300">
      <div className="fixed left-0 top-0">
        <Sidebar />
      </div>
      {/* <div className="bg-black text-white h-screen w-screen "> */}
      <div className="p-2 sm:mt-[-20ch] lg:mt-0">
        <div className="text-center w-screen">
          <h3 className="text-white p-3">* Bank Deposit Option</h3>
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
          <p className="text-center mt-2 text-white">
            Account Name: Adebola Daniel Juwon
          </p>
          <ul className="text-center ">
            <div className="border-blue-400 sm:w-screen p-5 m-3 bg-blue-400 text-white">
              <li>Opay - 9066560771</li>
              <li>Kuda - 1101725915</li>
              <li>GTB - 0449785257</li>
              <li>Zenith Bank - 2209469444</li>
              <li>Access Bank - 1415440070</li>
            </div>
          </ul>
        </div>
        <div className="text-center text-xs">
          <p className="text-white">
            Please send us a notification through the below form after payment
            is made. If we verify that no payment was made before using this
            form below, it may lead to temporary suspension of the owner&apos;s
            account. Thanks.
          </p>
          <div>
            <Notification />
          </div>
        </div>
      </div>
    </Card>
  );
};
export default ManualFunding;
