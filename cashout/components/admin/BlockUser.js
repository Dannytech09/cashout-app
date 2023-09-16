import { useState } from "react";
import { useForm } from "react-hook-form";
import { aExpireSessionAndRedirect } from "../../Utils/authCookies";
import { BlockUserHandler } from "@/pages/api/admin/blockuser";
import { useRouter } from "next/router";
import { adminAuthGuard } from "@/Utils/authGuard";
import BlockUser from "./adminjsx/BlockUser";

function BlockUserComp(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);

  const [user, setUser] = useState("");
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
      blocked: "",
    },
    // mode: "onchange"
  });

  const submitHandler = async ({ ctx, id, blocked }) => {
    try {
      setLoading(true);
      const response = await BlockUserHandler(ctx, id, blocked);
      //   console.log(response);
      if (response.data === null) {
        alert("Invalid User ID");
      } else if (
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
        setUser(response.data);
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
      <BlockUser
        user={user}
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

export default BlockUserComp;
