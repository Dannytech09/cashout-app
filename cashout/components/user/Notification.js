import { useState } from "react";
import { useRouter } from "next/router";
import { notification } from "@/pages/api/user/notification";
import { removeUserSession } from "@/Utils/Common";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { authGuard } from "@/Utils/authGuard";
import Notification from "./userJsx/Notification";

export default function NotificationComp(ctx) {
  const router = useRouter();
  authGuard();

  const [bank, setBank] = useState("");
  const [narration, setNarration] = useState("");
  const [amount, setAmount] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(false);
      setSuccessMessage(false);
      const response = await notification(ctx, bank, amount, narration);
      // console.log(response);
      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired."
      ) {
        removeUserSession();
        expireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (response.error) {
        setErrorMessage(response.error);
      } else if (response.code === "000") {
        setErrorMessage(null);
        setSuccessMessage(response.message);
      }
      setLoading(false);
      setRedirecting(false);
    } catch (error) {
      // console.log(error);
      throw new Error(`An error occurred ${error}`); // server error - nextjs
    } finally {
      setLoading(false);
      setRedirecting(false);
    }
  };

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  return (
    <div className="bg-black h-screen">
      <Notification
        bank={bank}
        setBank={setBank}
        narration={narration}
        setNarration={setNarration}
        amount={amount}
        setAmount={setAmount}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        loading={loading}
        setLoading={setLoading}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}
