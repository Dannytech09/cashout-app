import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { useRouter } from "next/router";
import UpdateDetails from "./userJsx/UpdateDetails";
import {
  expireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
import { authGuard } from "@/Utils/authGuard";

const BASE_URL = `${API_BASE_URL}/api/v1/auth/update-details`;

function UpdateUserComp(ctx) {
  const router = useRouter();
  authGuard(ctx, router);
  const { token } = getUserIdAndToken(ctx);

  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }, // formState
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    // mode: "onchange"
  });

  const submitHandler = async ({ firstName, lastName, phoneNumber }) => {
    try {
      setLoading(true);
      setRedirecting(null);
      const response = await axios.put(
        BASE_URL,
        {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf8",
          },
        }
      );
      //   console.log(response.data.data)
      if (response.data.data === null) {
        alert("Invalid User ID");
      }
      alert("User Updated Successfully !");
      setUser(response.data.data);
      setLoading(false);
    } catch (error) {
      if (
        error.response.data.error === "Invalid token." ||
        error.response.data.error === "Token has been revoked or expired." ||
        error.response.data.error === "Oops! Bad Request !"
      ) {
        removeUserSession();
        expireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong !");
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
      <UpdateDetails
        user={user}
        loading={loading}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        error={error}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default UpdateUserComp;
