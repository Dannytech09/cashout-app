import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteUserHandler } from "@/pages/api/admin/deluser";
import { adminAuthGuard } from "@/Utils/authGuard";
import { useRouter } from "next/router";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import DelUser from "./adminjsx/DelUser";

function DeleteUserComp(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);

  const [delUser, setDelUser] = useState();
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
      id: "",
    },
  });

  const submitHandler = async ({ id }) => {
    try {
      const response = await deleteUserHandler(ctx, id);
      //   console.log(response);
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
      } else {
        setSuccessMessage(response.message);
        setDelUser(response.data);
      }
    } catch (error) {
      // console.log(error);
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
      <DelUser
        delUser={delUser}
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

export default DeleteUserComp;
