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
      } else if (response.data.success === true || response.status === 200) {
        const data = response?.data;
        const token = data?.token;
        const user = data?.user;
        let d = data?.noticeMe;

        setUserSession(JSON.stringify(response.data.user));
        setCookieAndRedirect(ctx, "token", token);
        const userJSON = JSON.stringify(user);
        setCookieAndRedirect(ctx, "u", userJSON);
        router.push("/user/dashboard");

        if (d !== null) {
          setTimeout(() => {
            alert(d);
          }, 3000);
        } else {
          return null;
        }
      }
    } catch (error) {
      // console.log("erroro", error);
      if (
        error instanceof TypeError ||
        error instanceof SyntaxError ||
        error?.code === -32603 ||
        error?.message === "Internal JSON-RPC error." || error?.response?.message === "Internal JSON-RPC error." ||
        error?.response?.data?.msg ===
          "Network error. Check and try again later." ||
        error?.response?.status === "ERR_NETWORK"
) {
        setMessage("Network Error. Please reconnect and try again.");
      }
      // if (error.message) {
      //   throw new Error(`An error occured ${error}`);
      // }
      setMessage("Server not responding. Please try again.");
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
