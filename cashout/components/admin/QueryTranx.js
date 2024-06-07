import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import API_BASE_URL from "@/apiConfig";
import AllPurchases from "@/components/admin/GetAllHistory";
import {
  aExpireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import Loader from "../utils/Loader";
import { useRouter } from "next/router";
import { adminAuthGuard } from "@/Utils/authGuard";

const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;

function QueryTranxComp(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);
  const { token } = getUserIdAndToken(ctx);

  const [singleUserPurchases, setSingleUserPurchases] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }, // formState
  } = useForm({
    defaultValues: {
      identifier: "",
    },
  });

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const { identifier } = data;
      const payload = {};

      if (identifier.includes("@")) {
        payload.email = identifier;
      } else {
        payload.userId = identifier;
      }
      const response = await axios.post(
        `${ADMIN_BASE_URL}/purchases/getSingleUserPurchases`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === "000") {
        setSuccessMessage(response.data.message);
        setError(null);
        setSingleUserPurchases(response.data.data);
      } else {
        setSingleUserPurchases([]);
      }
    } catch (error) {
      //   console.error(error);
      if (
        error.response.data.error === "Invalid token." ||
        error.response.data.error === "Token has been revoked or expired." ||
        error.response.data.error === "Forbidden!"
      ) {
        sessionStorage.clear();
        aExpireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (error.response.data.error) {
        setError(error.response.data.error);
        setSuccessMessage(null);
      } else {
        throw new Error(`An error occurred ${error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="fixed top-0">
        <SidebarAdmin />
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mt-20 select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-full"
      >
        <h1 className="sm:text-3xl mb-2 font-sans text-2xl">
          Query Transaction - ID or Email
        </h1>
        {error && (
          <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600">
            {error}
          </p>
        )}
        {successMessage && (
          <div className="p-3 m-3 text-xs mt-[-2ch] border border-green-700 bg-green-700">
            <p className="text-white text-center">{successMessage}</p>
          </div>
        )}
        <input
          {...register("identifier", {
            required: "Please enter user's ID or email!",
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="Please enter user's ID or email!"
          aria-invalid={errors.identifier ? "true" : "false"}
        />
        {errors.identifier && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.identifier?.message}
          </p>
        )}
        <button
          type="submit"
          className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
        >
          <h2 className="relative z-30"> Query Transaction</h2>
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
      {/* <br /> */}
      <hr />

      {singleUserPurchases.length === 0 ? (
        <div className="text-center text-red-500">Awaiting Query..</div>
      ) : (
        <AllPurchases allPurchases={singleUserPurchases} />
      )}
    </div>
  );
}

export default QueryTranxComp;
