import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Logo from "@/components/heroIcons/Logo";
import SubFooter from "@/components/user/Footer";
import { ALoginHandler } from "@/pages/api/admin/login";
import { FaRegEye } from "react-icons/fa";
import { setCookieAndRedirect } from "@/Utils/authCookies";
import { setUserSession } from "@/Utils/Common";

export default function LoginComp(ctx) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    // setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const showPassword = () => {
    setShow(!show);
  };

  const submitHandler = async ({ email, password }) => {
    setLoading(true);
    setErrorMessage(null);
    if (typeof window !== "undefined") {
      try {
        const response = await ALoginHandler(email, password);
        // console.log(response);
        if (response.error) {
          const r = response.error;
          setErrorMessage(r);
        } else if (response.success === true || response.status === 200) {
          const token = response.data.token;
          const user = response.data.user;
          setCookieAndRedirect(ctx, "token", token);
          setUserSession(JSON.stringify(user));
          router.push("/admin-wonders/dashboard");
        }
      } catch (error) {
        // console.log(error);
        if (error) {
          throw new Error(`An error occured ${error}`);
        } else {
          setErrorMessage("Something went wrong !");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {loading ? <p>Loading...</p> : null}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="select-none text-xs sm:text-sm justify-center md:text-sm lg:justify-center lg:text-sm flex flex-col gap-4 sm:gap-6 items-center h-screen"
      >
        <p>
          <Logo />
        </p>

        <h1
          className="sm
      <p></p>:text-3xl mb-2 font-sans text-3xl"
        >
          ADMIN LOGIN PAGE
        </h1>

        <p className="text-red-600">
          This Page is Restricted and only the Admin Have Access
        </p>
        {errorMessage && (
          <div className="p-3 m-3 text-xs mt-[1ch] border border-red-700 bg-red-700">
            <p className="text-white text-center">{errorMessage}</p>
          </div>
        )}
        {errors.email?.message && (
          <p className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">
            {errors.email?.message}
          </p>
        )}

        <input
          type="text"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid Email and password !",
            },
          })}
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="Please Enter Email Address"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email?.type === "required" && (
          <p
            className="w-full max-w-[39ch] text-red-600 mt-[-2ch]"
            role="alert"
          >
            Please enter a valid email address !
          </p>
        )}

        <div className="flex flex-row flex-items-center w-full justify-evenly">
          <input
            type={show ? "text" : "password"}
            {...register("password", {
              required: "Please enter a valid password !",
              minLength: {
                value: 6,
                message: "Minimum Length is 6",
              },
            })}
            className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
            placeholder="Please Enter Password"
            aria-invalid={errors.password ? "true" : "false"}
          />
          <span onClick={showPassword} className="mt-2 position absolute ml-60">
            <FaRegEye size={25} />
          </span>
        </div>
        {errors.password && (
          <p className="w-full max-w-[39ch] text-red-600 mt-[-2ch]">
            {errors.password?.message}
          </p>
        )}

        <button
          type="submit"
          className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
        >
          <h2 className="relative z-30"> Submit</h2>
        </button>
      </form>
      <SubFooter />
    </div>
  );
}
