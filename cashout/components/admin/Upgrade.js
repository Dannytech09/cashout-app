import { useState } from "react";
import User from "@/components/admin/User";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { aExpireSessionAndRedirect, getUserIdAndToken } from "@/Utils/authCookies";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import { useRouter } from "next/router";
import { adminAuthGuard } from "@/Utils/authGuard";
import Loader from "../utils/Loader";

function UpgradeComp(ctx) {
  const router = useRouter();
  const { token } = getUserIdAndToken(ctx);
  adminAuthGuard(ctx, router);

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }, // formState
  } = useForm({
    defaultValues: {
      email: "",
      accountType: "",
    },
    // mode: "onchange"
  });

  const submitHandler = ({ email, accountType }) => {
    setLoading(false);
    {
      const url = `${API_BASE_URL}/api/v1/users`;
      axios
        .put(
          url,
          { email, accountType },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json; charset=utf8",
            },
          }
        )
        .then((res) => {
          if (res.data.data === null) {
            alert("Invalid Email");
          }
          alert("User Upgraded Successfully !");
          setUser(res.data.data);
        })
        .catch((error) => {
          if (
            error.response.data.error === "Invalid token." ||
            error.response.data.error ===
              "Token has been revoked or expired." ||
            error.response.data.error === "Forbidden!"
          ) {
            sessionStorage.clear();
            aExpireSessionAndRedirect(ctx, router);
            setRedirecting(true);
          } else if (error.response.data.error) {
            setErrorMessage(error.response.data.error);
            setSuccessMessage(null);
          } else {
            throw new Error(`An error occurred ${error}`);
          }
          setLoading(false);
        });
    }
  };

  
  if (redirecting) {
    return (
      <div className="text-sm bg-red-600">
        Session expired redirecting to login...
      </div>
    );
  }

  return (
    <div>
        { loading && <Loader /> }
      <div className="fixed top-0">
        <SidebarAdmin />
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mt-4 select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-full"
      >
        <h1 className="sm:text-3xl mb-2 font-sans text-2xl">Upgrade User</h1>
        {errorMessage && (
          <div className="p-3 m-3 text-xs mt-[-2ch] border border-red-700 bg-red-700">
            <p className="text-white text-center">{errorMessage}</p>
          </div>
        )}
        {successMessage && (
          <div className="p-3 m-3 text-xs mt-[-2ch] border border-green-700 bg-green-700">
            <p className="text-white text-center">{successMessage}</p>
          </div>
        )}
        <input
          {...register("email", {
            required: "Please enter user's email !",
            // pattern: {
            //   value: /^[a-z0-9]+$/i,
            //   message: "Alphanumeric only",
            // },
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="Please enter user's email !"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.email?.message}
          </p>
        )}
        <select
          {...register("accountType", {
            required: "  Please select a value!",
          })}
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          aria-invalid={errors.accountType ? "true" : "false"}
        >
          <option
          //   value={corporate}
          >
            corporate
          </option>
          <option
          //   value={partner}
          >
            partner
          </option>
          <option
          //   value={partner}
          >
            apiUser
          </option>
        </select>
        {errors.accountType && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.accountType?.message}
          </p>
        )}
        <button
          type="submit"
          className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
        >
          <h2 className="relative z-30"> Upgrade User</h2>
        </button>

        <div className="flex mt-1 gap-4 text-center justify-center select-none">
          <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
            <Link href="/admin-wonders/getAllUsers">Check All Users</Link>
          </div>
          <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
            <Link href="/admin-wonders/dashboard">Navigate to Admin Board</Link>
          </div>
        </div>
      </form>

      <br />
      <hr />
      {user ? (
        true
      ) : (
        <div className="text-center m-10 text-red-500">Awaiting Upgrade...</div>
      )}

      <User user={user} />
    </div>
  );
}

export default UpgradeComp;
