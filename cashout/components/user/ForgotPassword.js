import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import API_BASE_URL from "@/apiConfig";
import Loader from "../../components/utils/Loader";
// const { useRouter } = require("next/router");

export default function ForgotPasswordComp() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!validateEmail(email)) {
      setError("Invalid Email");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/forgotpassword`,
        {
          email: email,
        }
      );

      if (response.data.data) {
        alert("Reset Password Link Successfully sent to your Mail");
      }
    } catch (error) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
  };

  const getEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Check the validity of the email as the user types
    if (!validateEmail(inputEmail)) {
      setError("Invalid email address. Please enter a valid email.");
    } else {
      setError(null); // Clear any previous error messages
    }
  };

  return (
    <div className="select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-screen">
      {loading && <Loader />}
      <h1 className="sm:text-2xl font-sans text-2xl">RECOVER YOUR PASSWORD</h1>
      <p className="text-center p-3">
        Click on Recover Password Button then goto your mail and copy/click on
        the reset password link to change your password
      </p>
      {error && (
        <div className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">
          {error}
        </div>
      )}
      <input
        type="text"
        value={email}
        onChange={getEmail}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Email Address"
      />
      <button
        onClick={submitHandler}
        className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
        duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
      >
        <h2 className="relative z-30"> Recover Password</h2>
      </button>
      <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
        <Link href="/login">Back to Login !</Link>
      </div>
    </div>
  );
}
