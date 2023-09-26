import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
import UpdatePassword from "./userJsx/UpdatePassword";
import { authGuard } from "@/Utils/authGuard";

const BASE_URL = `${API_BASE_URL}/api/v1/auth/update-password`;

function UpdateUserPasswordComp(ctx) {
  const router = useRouter();
  authGuard(ctx, router);
  const { token } = getUserIdAndToken(ctx);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }, // formState
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    // mode: "onchange"
  });

  const submitHandler = async ({ currentPassword, newPassword }) => {
    try {
      setLoading(true);
      setRedirecting(null);
      const res = await axios.put(
        BASE_URL,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf8",
          },
        }
      );
      if (res.data.data === null) {
        alert("Invalid User ID");
      }
      alert("Password Updated Successfully !");
      router.push("/user/dashboard");
    } catch (error) {
      if (
        error.response.data.error === "Invalid token." ||
        error.response.data.error === "Token expired." ||
        error.response.data.error === "Oops! Bad Request !"
      ) {
        sessionStorage.clear();
        router.push("/login");
      } else if (error.response.data.error) {
        setError(error.response.data.error);
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
      <UpdatePassword
        error={error}
        loading={loading}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default UpdateUserPasswordComp;
