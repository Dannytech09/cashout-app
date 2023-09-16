import { useState } from "react";
import { updateUserBalance } from "@/pages/api/admin/cd";
import Cd from "./adminjsx/Cd";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import { useRouter } from "next/router";
import { adminAuthGuard } from "@/Utils/authGuard";

export default function CdComp(ctx) {
  const router = useRouter();
    adminAuthGuard(ctx, router);

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [operation, setOperation] = useState("");
  const [purpose, setPurpose] = useState("Mannual funding");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      setSuccessMessage(false);
      setRedirecting(false);
      const response = await updateUserBalance(
        ctx,
        email,
        amount,
        operation,
        purpose
      );
      // console.log(response)
      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired." || response.error === "Forbidden!"
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
    return <div className="text-sm bg-red-600">Session expired redirecting to login...</div>;
  }

  return (
    <div className="bg-black h-screen">
      <Cd
        email={email}
        amount={amount}
        operation={operation}
        purpose={purpose}
        setEmail={setEmail}
        setAmount={setAmount}
        setOperation={setOperation}
        setPurpose={setPurpose}
        error={error}
        successMessage={successMessage}
        loading={loading}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}
