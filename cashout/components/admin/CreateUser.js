import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { createUserHandler } from "@/pages/api/admin/createuser";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import { adminAuthGuard } from "@/Utils/authGuard";
import CreateUser from "./adminjsx/CreateUser";

function CreateUserComp(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

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

  const submitHandler = async ({
    ctx,
    firstName,
    lastName,
    phoneNumber,
    username,
    email,
    password,
  }) => {
    try {
      setLoading(true);
      const response = await createUserHandler(
        ctx,
        firstName,
        lastName,
        phoneNumber,
        username,
        email,
        password
      );
      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired." ||
        response.error === "Forbidden!"
      ) {
        sessionStorage.clear();
        aExpireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (response.error) {
        setError(response.error);
      } else if (response.code === "000") {
        setSuccessMessage(response.message);
      }
    } catch (error) {
      if (error) {
        throw new Error(`Something went wrong ${error}`);
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
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
      <CreateUser
        error={error}
        successMessage={successMessage}
        loading={loading}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default CreateUserComp;
