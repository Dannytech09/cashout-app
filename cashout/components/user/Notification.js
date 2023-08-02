import { useState } from "react";
import { notification } from "@/pages/api/notification";
import Loader from "../utils/Loader";
import Image from "next/image";

export default function Notification() {
  const [bank, setBank] = useState("");
  const [narration, setNarration] = useState("");
  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      setSuccessMessage(false);
      const response = await notification(bank, amount, narration);
      console.log(response);
      if (response.code === "002") {
        setError(response.message);
      } else if (response.code === "009") {
        setError(response.message);
      } else if (response.error) {
        setError(response.error);
      } else if (response.code === "000") {
        setSuccessMessage(response.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-black h-screen">
      {loading && <Loader />}
      <div className="container">
        <h1 className="text-white text-xs text-center p-5">
          Payment Notification
        </h1>
        <form
          className="border border-blue-200 border-r-8 rounded-lg bg-yellow-300 p-10 m-5"
          onSubmit={handleFormSubmit}
        >
          {error && (
            <div className="p-3 m-3 text-xs mt-[-2ch] border border-red-700 bg-red-700">
              <p className="text-white text-center">{error}</p>
            </div>
          )}
          {successMessage && (
            <div className="p-3 m-3 text-xs mt-[-2ch] border border-green-700 bg-green-700">
              <p className="text-white text-center">{successMessage}</p>
            </div>
          )}
          <label className="text-red-400 mt-[2ch]">Bank</label>
          <select
            className="mt-[-5ch]"
            value={bank}
            onChange={(e) => {
              // console.log(e.target.value)
              setBank(e.target.value);
            }}
          >
            <option value="">Select Bank</option>
            <option value="Opay - 9066560771">Opay</option>
            <option value="Kuda - 1101725915">Kuda</option>
            <option value="GT - 0449785257">GTB</option>
            <option value="Zenith - 2209469444">Zenith Bank</option>
            <option value="Access - 1415440070">Access Bank</option>
          </select>
          <br />
          <label className="text-red-400 mt-[2ch]">Amount:</label>
          <input
            className="mt-[-5ch]"
            type="number"
            value={amount}
            onChange={(e) => {
              // console.log(e.target.value)
              setAmount(e.target.value);
            }}
          />
          <br />
          <label className="text-red-400 mt-[2ch] text-sm">Narration</label>
          <input
            className="mt-[-5ch]"
            type="text"
            value={narration}
            onChange={(e) => {
              // console.log(e.target.value)
              setNarration(e.target.value);
            }}
          />
          <br />
          <br />
          <div className="flex justify-center">
            <button
              className="hover:bg-blue-800 border rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        <style jsx>{`
          .container {
            max-width: 400px;
            margin: 0 auto;
            // background-color: black;
          }

          h1 {
            font-size: 24px;
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin-bottom: 10px;
          }

          input,
          select {
            width: 100%;
            padding: 5px;
            border: 1px solid #ccc;
          }

          button {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #0070f3;
            color: #fff;
            border: none;
            cursor: pointer;
          }
        `}</style>
      </div>
      <div className="flex justify-center">
        <Image src="/banks-logo.jpg" alt="logo" width="300" height="300" />
      </div>
    </div>
  );
}
