import React from "react";
import Sidebar from "@/components/user/Sidebar";
import Loader from "@/components/utils/Loader";

export default function UpdatePassword({
  error,
  loading,
  register,
  handleSubmit,
  errors,
  submitHandler,
}) {
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
        <h1 className="sm:text-3xl mb-2 font-sans text-2xl">Change Password</h1>
        {error && (
          <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600">
            {error}
          </p>
        )}

        <p className="text-center">
          Dear user, kindly change your password if you feel your account has
          been compromised
        </p>

        <input
          {...register("currentPassword", {
            required: "Please enter old password !",
            minLength: {
              value: 6,
              message:
                "Old Password can not be less than 8 letters/numbers/characters",
            },
            pattern: {
              value: /^\S+$/,
              message: "Spacing not allowed !",
            },
          })}
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="Old Password"
          aria-invalid={errors.currentPassword ? "true" : "false"}
        />
        {errors.currentPassword && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.currentPassword?.message}
          </p>
        )}

        <input
          {...register("newPassword", {
            required: "Enter New Password !",
            minLength: {
              value: 8,
              message: "Minimum of 8 password combination",
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]+$/,
              message:
                "Password must contain at least one letter, one digit, and one special character (e.g., Johndoe2#)",
            },
          })}
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="New Password"
          aria-invalid={errors.newPassword ? "true" : "false"}
        />
        {errors.newPassword && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.newPassword?.message}
          </p>
        )}
        <button
          type="submit"
          className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
        >
          <h2 className="relative z-30"> Change Password</h2>
        </button>
      </form>
      <br />
      <hr />
    </div>
  );
}
