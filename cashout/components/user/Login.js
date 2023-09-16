import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { LoginHandler } from "@/pages/api/user/login";
import nookies from "nookies";
import { setCookieAndRedirect } from "@/Utils/authCookies";
import { setUserSession } from "@/Utils/Common";
import Login from "./userJsx/Login";

const LoginComp = (ctx) => {
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
// console.log(response)
      if (response.error) {
        const r = response.error;
        setMessage(r);
      } else if (response.statusText === "OK") {
        const token = response.data.token;
        const user = response.data.user;
        setCookieAndRedirect(ctx, "token", token);
        setUserSession(JSON.stringify(user));
        router.push("/user/dashboard");
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
      <Login
        show={show}
        loading={loading}
        message={message}
        isDisabled={isDisabled}
        showPassword={showPassword}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default LoginComp;
