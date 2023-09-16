import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Register from "./userJsx/Register";
import { registerHandler } from "@/pages/api/user/register";

export default function SignUpComp(ctx) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }, // formState
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      username: "",
      email: "",
      password: "",
    },
    // mode: "onchange"
  });

  const router = useRouter();

  const submitHandler = async (data) => {
    try {
      setErrorMessage(null);
      setLoading(true);
      setSuccessMessage(null);
      const { firstName, lastName, phoneNumber, username, email, password } =
        data;

      const r = await registerHandler(
        firstName,
        lastName,
        phoneNumber,
        username,
        email,
        password
      );
      //   console.log("com", r);
      if (r.data.error) {
        setErrorMessage(r.data.error);
      } else if (r.status === 201) {
        setSuccessMessage(
          "Account Created Successfullly! Redirecting... in 5 seconds"
        );
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }
    } catch (error) {
      //   console.log(error);
      if (error) {
        throw new Error(`An error occurred ${error}`);
      } else {
        setErrorMessage("Something went wrong !");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Register
        errorMessage={errorMessage}
        successMessage={successMessage}
        loading={loading}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        submitHandler={submitHandler}
      />
    </>
  );
}
