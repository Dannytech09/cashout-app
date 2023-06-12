import axios from "axios";
import React, { useState } from "react";
import { setUserSession } from "../../Utils/Common";
import Link from "next/link";
import API_BASE_URL from "@/apiConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const submitHandler = () => {
    if (!email) {
      setError("Please enter your email address !");
      return;
    }
    setError(null);
    axios
      .post(`${API_BASE_URL}/api/v1/auth/forgotpassword`, {
        email: email,
      })
      .then((response) => {
        // console.log("response >>> ", response);
        setUserSession(response.data.token);
        window.location = "/user/resetPassword";
      })
      .catch((error) => {
        if (
          error.response.data.status === 401 ||
          error.response.data.status === 400
        ) {
          setError(error.response.data.message);
        } else {
          setError("Invalid Email Address!");
          return;
          // window.location.reload();
        }
      });
  };

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-screen">
      <h1 className="sm:text-3xl mb-2 text-white font-sans text-3xl">
        RECOVER PASSWORD
      </h1>
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
        className="relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900
      duration-300 w-full max-w-[39ch] border border-white border-solid uppercase py-2 px-2 text-white"
      >
        <h2 className="relative z-30"> Recover Password</h2>
      </button>
      <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
        <Link href="/login">Back to Login !</Link>
      </div>
    </div>
  );
}
