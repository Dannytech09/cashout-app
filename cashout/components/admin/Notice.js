import { useState } from "react";
import { adminAuthGuard } from "@/Utils/authGuard";
import { useRouter } from "next/router";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import { NotificationHandler } from "@/pages/api/admin/notice";
import Notice from "./adminjsx/Notice";
import LockDataComp from "./LockData";

// SS
export default function NotificationComp(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);

  const [name, setName] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [dropDownMesssage, setDropDownMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await NotificationHandler(
        ctx,
       name
      );

      // console.log(response)
      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired." ||
        response.error === "Forbidden!"
      ) {
        sessionStorage.clear();
        aExpireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (response.error) {
        setErrorMessage(response.error);
        setSuccessMessage(null);
      } else {
        setSuccessMessage(response.message);
        setDropDownMessage(response.d)
        setErrorMessage(null);
      }
    } catch (error) {
      //   console.error(error);
      if (error) {
        throw new Error(`An error occurred ${error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    // console.log(inputValue);
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
    <div>
      <Notice
        name={name}
        errorMessage={errorMessage}
        successMessage={successMessage}
        dropDownMesssage={dropDownMesssage}
        loading={loading}
        redirecting={redirecting}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
      />
    </div>
    <div>
      <LockDataComp/>
    </div>

    </div>
  );
}
