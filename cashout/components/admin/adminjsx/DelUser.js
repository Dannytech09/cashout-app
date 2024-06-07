import React from "react";
import Link from "next/link";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import Loader from "../../utils/Loader";

export default function DelUser({
  delUser,
  error,
  successMessage,
  loading,
  register,
  handleSubmit,
  errors,
  submitHandler,
}) {
  return (
    <div>
      {loading && <Loader />}
      <div className="flex absolute top-0">
        <SidebarAdmin />
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mt-20 select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-full"
      >
        <h1 className="sm:text-3xl mb-2 font-sans text-2xl">
          Delete Single User
        </h1>
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
        <input
          {...register("id", {
            required: "Please enter user's ID!",
            pattern: {
              value: /^[a-z0-9]+$/i,
              message: "Alphanumeric only",
            },
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="Please enter user's ID !"
          aria-invalid={errors.id ? "true" : "false"}
        />
        {errors.id && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.id?.message}
          </p>
        )}
        <button
          type="submit"
          className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
        >
          <h2 className="relative z-30"> Delete User</h2>
        </button>

        <div className="flex mt-1 gap-4 text-center justify-center select-none">
          <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
            <Link href="/admin-wonders/getAllUsers">Get All Users</Link>
          </div>
          <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
            <Link href="/admin-wonders/dashboard">Navigate to Admin Board</Link>
          </div>
        </div>
      </form>
      <br />
      <hr />
      {delUser ? (
        true
      ) : (
        <div className="text-center m-10 text-red-500">No User Deleted yet</div>
      )}

      {delUser && (
        <div className="text-center border-4 border-black bg-blue-300 text-red-600 p-5">
          {`User deleted successfully`}
        </div>
      )}
    </div>
  );
}
