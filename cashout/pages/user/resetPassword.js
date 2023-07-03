import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
const { useRouter } = require("next/router");
import API_BASE_URL from "@/apiConfig";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const { resetToken } = router.query;

  const submitHandler = () => {
    if (!password) {
      setError("Please enter a new password (minimum of 8 digits) !");
      return;
    }
    setError(null);
    axios
      .put(`${API_BASE_URL}/api/v1/auth/resetpassword/${resetToken}`, {
        password: password,
      })
      .then((response) => {
        // console.log("response >>> ", response);
        if(response.success === true || response.data.success === true) {
          alert("Password Reset Successfully")
          router.push("/login")
        }
      })
      .catch((error) => {
        if (
          error.response.data.status === 401 ||
          error.response.data.status === 400
        ) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong!");
          window.location.reload();
        }
      });
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-screen">
      <h1 className="sm:text-3xl mb-2 text-white font-sans text-3xl">
        RESET PASSWORD
      </h1>
      <p className="text-green-200">Please enter a new password</p>
      {error && (
        <div className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">
          {error}
        </div>
      )}
      <input
        type="text"
        value={password}
        onChange={getPassword}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter a New Password"
      />
      <button
        onClick={submitHandler}
        className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
        duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
           >
        <h2 className="relative z-30"> Reset Password</h2>
      </button>
      <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
        <Link href="/login">Back to Login !</Link>
      </div>
    </div>
  );
}

export default ResetPassword;