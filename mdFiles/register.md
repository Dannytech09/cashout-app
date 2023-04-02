import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import { setUserSession } from "../Utils/Common";
import Router from "next/router";

const formInitialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  username: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formDetails, setFormDetails] = useState(formInitialState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();

    // if (formInitialState) {
    //   setError(true)
    //   setError("Please enter the appropriate field");
    //   return
    // }

    setError(null);
    setLoading(true);
    await axios
      .post(
        "https://cashout-app.herokuapp.com/api/v1/auth/register",
        formDetails
      )
      // setFormDetails(formInitialState)
      .then((response) => {
        if (response?.data.token) console.log("response >>> ", response);
        setLoading(false);
        setError(false);
        setSuccessMessage("Welcome");
        setUserSession(response.data.token, response.data.user);
        Router.push("/Dashboard");
      })
      .catch((error) => {
        if (error.message.status === 401 || error.message.status === 400) {
          setError("User Already Exist!");
        } else {
          setError("Something Went Wrong!");
        }
      });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  return (
    <div className="select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-screen">
      <h1 className="sm:text-3xl mb-2 text-white font-sans text-3xl">
        REGISTER
      </h1>
      {successMessage && (
        <div className="text-center w-full max-w-[39ch] border border-solid border-green-400 text-green-900 py-2">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">
          {error}
        </div>
      )}
      {/* <select id="accountType" onChange={getAccountType}>
        <option value={corporate}>Corporate</option>
        <option value={partner}>Partner</option>
      </select> */}
      <input
        type="text"
        name="firstName"
        onChange={changeHandler}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Your First Name"
      />
      <input
        type="text"
        name="lastName"
        onChange={changeHandler}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Your Last Name"
      />
      <input
        type="text"
        name="phoneNumber"
        onChange={changeHandler}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter PhoneNumber"
      />
      <input
        type="text"
        name="username"
        onChange={changeHandler}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Username"
      />
      <input
        type="text"
        name="email"
        onChange={changeHandler}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter a Valid Email Address"
      />
      <input
        name="password"
        autoComplete="off"
        onChange={changeHandler}
        type="text"
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Password"
      />
      <button
        value={loading ? "Loading..." : "register"}
        // disabled={val == false}
        onClick={submitHandler}
        className="relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900
      duration-300 w-full max-w-[39ch] border border-white border-solid uppercase py-2 px-2 text-white"
      >
        <h2 className="relative z-30"> Sign Up</h2>
      </button>
      <div className="flex mt-1 gap-4 text-center justify-center select-none">
        <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
          <Link href="/login">Already Have an Account ?</Link>
        </div>
        <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
          <Link href="/">Navigate to Home ?</Link>
        </div>
      </div>
    </div>
  );
}
