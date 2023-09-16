import React from 'react'
import Sidebar from "@/components/user/Sidebar";
import User from "@/components/user/User";
import Loader from "@/components/utils/Loader";

export default function UpdateDetails({ user, loading, register, handleSubmit, errors, error, submitHandler}) {
  return (
    <div>
         {loading && <Loader />}
      <div className="flex absolute mt-[-2ch]">
        <Sidebar />
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mt-4 select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-full"
      >
        <h1 className="sm:text-3xl mb-2 font-sans text-2xl">Update Profile</h1>
        {error && (
          <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600">
           {error}
          </p>
        )}

        <input
          {...register("firstName", {
            required: "Please enter your firstName !",
            minLength: {
              value: 3,
              message: "First Name can not be less than 3 letters",
            },
            maxLength: {
              value: 15,
              message: "First Name can not be greater than 15 letters",
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Only letters are allowed / No spacing !",
            },
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="User's First Name"
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.firstName?.message}
          </p>
        )}

        <input
          {...register("lastName", {
            required: "Please enter your lastName !",
            minLength: {
              value: 3,
              message: "Last Name can not be less than 3 letters",
            },
            maxLength: {
              value: 15,
              message: "Last Name can not be greater than 15 letters",
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Only letters are allowed / No spacing !",
            },
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="User's Last Name"
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.lastName?.message}
          </p>
        )}

        <input
          {...register("phoneNumber", {
            required: "Please enter your phoneNumber !",
            minLength: {
              value: 11,
              message: "Phone number can not be less than 11 digits",
            },
            maxLength: {
              value: 11,
              message: "Phone number can not be greater than 11 digits",
            },
            pattern: {
              value: /^[0-9\b]+$/,
              message: "Input valid phone number !",
            },
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="User's PhoneNumber"
          aria-invalid={errors.phoneNumber ? "true" : "false"}
        />
        {errors.phoneNumber && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.phoneNumber?.message}
          </p>
        )}
        <button
          type="submit"
          className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
        >
          <h2 className="relative z-30"> Update User</h2>
        </button>
      </form>

      <br />
      <hr />
      {user ? (
        true
      ) : (
        <div className="text-center m-10 text-red-500">
          Awaiting Profile Update
        </div>
      )}

      <User user={user} />
    </div>
  )
}
