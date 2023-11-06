import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  expireSessionAndRedirect } from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
import { authGuard } from "@/Utils/authGuard";
import WithdrawalBonus from "./userJsx/WithdrawalBonus";
import {
  bankwithdrawalBonusHandler,
  walletwithdrawalBonusHandler,
} from "@/pages/api/user/referral";

function WithdrawalBonusComp(ctx) {
  const router = useRouter();
  authGuard(ctx, router);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }, // formState
    watch,
  } = useForm({
    defaultValues: {
      withdrawal_method: "",
      amount: "",
      credit_bank: "",
      account_number: "",
    },
    // mode: "onchange"
  });

  const submitHandler = async ({
    ctr,
    withdrawal_method,
    amount,
    credit_bank,
    account_number,
  }) => {
    let response;

    try {
      setLoading(true);
      setRedirecting(null);
      if (withdrawal_method === "wallet") {
        response = await walletwithdrawalBonusHandler(
          ctr,
          withdrawal_method,
          amount
        );
      } else if(withdrawal_method === "bank") {
        response = await bankwithdrawalBonusHandler(
          ctx,
          withdrawal_method,
          amount,
          credit_bank,
          account_number
        );
      }
      if(response) {
      // console.log(response)
      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired." ||
        response.error === "Oops! Bad Request !"
      ) {
        removeUserSession();
        expireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (response.error) {
        setError(response.error);
      } else {
      alert(response.message);
      setError(null);
      setLoading(false);
      }
      }
    } catch (error) {
      throw new Error(`An error occured ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (redirecting) {
    return <div className="text-sm bg-blue-600">Redirecting to login...</div>;
  }

  return (
    <div>
      <WithdrawalBonus
        loading={loading}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        error={error}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default WithdrawalBonusComp;
