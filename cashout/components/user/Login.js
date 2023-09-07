import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import Logo from "@/components/heroIcons/Logo";
import SubFooter from "@/components/user/Footer";
import { useRouter } from "next/router";
import { LoginHandler } from "@/pages/api/user/login";
import nookies from "nookies";
import { setCookieAndRedirect } from "@/Utils/authCookies";
import { setUserSession } from "@/Utils/Common";

const Login = (ctx) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const cookies = nookies.get(ctx);
  const token = cookies.token;

  useEffect(() => {
    if (token) {
      router.replace("/user/dashboard");
    }
  });

  // show password logic
  const showPassword = () => {
    setShow(!show);
  };

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

  const submitHandler = async ({ ctx, email, password }) => {
    setIsDisabled(true);
    setLoading(true);

    try {
      const response = await LoginHandler(email, password);

      if (response.error) {
        const r = response.error;
        setMessage(r);
      } else if (response.statusText === "OK") {
        const token = response.data.token;
        const user = response.data.user;
        setCookieAndRedirect(ctx, "token", token );
        setUserSession(JSON.stringify(user));
        router.push('/user/dashboard');
        // const userJSON = JSON.stringify(user);
        // setCookieAndRedirect(ctx, "u", userJSON);
      }
    } catch (error) {
      // console.log(error);
        throw new Error(`An error occured ${error}`);
    } finally {
      setIsDisabled(false);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <p className="mt-3 ml-3">Loading...</p> : null}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-screen"
      >
        <div className="flex gap-3 ">
          <p>
            <Logo />
          </p>
          <h1 className="sm:text-3xl mb-2 font-sans text-3xl">LOGIN</h1>
        </div>
        {errors.email?.message ? (
          <p className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">
            {errors.email?.message}
          </p>
        ) : message ? (
          <p className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">
            {message}
          </p>
        ) : null}

        <input
          type="text"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid Email or password !",
            },
          })}
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="Please Enter Email Address"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email?.type === "required" && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
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
          <p className="w-full max-w-[39ch] text-red-300 mt-[-2ch]">
            {errors.password?.message}
          </p>
        )}
        <button
          disabled={isDisabled}
          type="submit"
          className={`relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900`}
        >
          <h2 className="relative z-30"> Submit</h2>
        </button>
        <div className="flex mt-1 gap-4 text-center justify-center select-none">
          <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
            <Link href="/user/forgotPassword">Forgot Password ?</Link>
          </div>
          <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
            <Link href="/register">Don&apos;t have an Account ?</Link>
          </div>
        </div>
      </form>
      <SubFooter />
    </div>
  );
};

export default Login;
