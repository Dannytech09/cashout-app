import React from "react";
import Loader from "@/components/utils/Loader";

export default function WithdrawalBonus({
  loading,
  register,
  handleSubmit,
  errors,
  watch,
  error,
  submitHandler,
}) {
  return (
    <div>
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mt-4 select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-full"
      >
        <h1 className="sm:text-3xl mb-2 mt-5 font-sans text-2xl">
          Withdraw Bonus
        </h1>
        {error && (
          <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600">
            {error}
          </p>
        )}

        <select
          {...register("withdrawal_method", {
            required: "Please select withdrawal method",
          })}
          autoComplete="on"
          className="duration-300 border-2 border-solid border-black focus:border-cyan-300 outline-none font-sans py-3 px-3 w-full max-w-[45ch] text-slate-900"
          aria-invalid={errors.withdrawal_method ? "true" : "false"}
        >
          <option className="text-center bg-gray-500" value="">
            ---Select withdrawal type---
          </option>
          <option value="wallet">wallet</option>
          <option value="bank">bank</option>
        </select>
        {errors.withdrawal_method && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.withdrawal_method?.message}
          </p>
        )}

        <input
          type="number"
          {...register("amount", {
            required: "Please enter amount !",
            min: {
              value: 500,
              message: "Minimum of 500 naira",
            },
            max: {
              value: 5000,
              message: "Maximum of 5000 naira",
            },
          })}
          className="duration-300 border-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[42ch] text-slate-900"
          placeholder="Amount to withdraw"
          aria-invalid={errors.amount ? "true" : "false"}
        />
        {errors.amount && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.amount?.message}
          </p>
        )}
        {watch("withdrawal_method") === "bank" && (
          <div className="flex flex-col w-full max-w-[45ch] items-center gap-4">
            <select
              {...register("credit_bank", {
                required: "Please select from available banks",
              })}
              autoComplete="on"
              className="duration-300 border-2 border-solid border-black focus:border-cyan-300 outline-none font-sans py-3 px-3 w-full max-w-[45ch] text-slate-900"
              aria-invalid={errors.credit_bank ? "true" : "false"}
            >
              <option className="text-center bg-gray-500" value="">
                ---Select Bank---
              </option>
              <option value="Opay">Opay</option>
              <option value="Kuda">Kuda</option>
              <option value="GT">GTB</option>
              <option value="Zenith">Zenith</option>
              <option value="Access">Access</option>
            </select>
            {errors.credit_bank && (
              <p
                className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
                role="alert"
              >
                {errors.credit_bank?.message}
              </p>
            )}

            <input
              type="number"
              {...register("account_number", {
                required: "Please enter account number",
                minLength: {
                  value: 10,
                  message: "Minimum of 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Max of 10 digits",
                },
              })}
              className="duration-300 border-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[42ch] text-slate-900"
              placeholder="Account number !"
              aria-invalid={errors.account_number ? "true" : "false"}
            />
            {errors.account_number && (
              <p
                className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
                role="alert"
              >
                {errors.account_number?.message}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
        >
          <h2 className="relative z-30"> Withdraw</h2>
        </button>
      </form>

      <br />
      <hr />
    </div>
  );
}
