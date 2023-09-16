import { useState } from "react";
import { SetPricesHandler } from "@/pages/api/admin/setCouponPrices";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import { useRouter } from "next/router";
import { authGuard } from "@/Utils/authGuard";
import SetCouponPrices from "./adminjsx/SetCouponPrices";

// 1
export default function SetCouponPricesComp(ctx) {
  const router = useRouter();
  authGuard(ctx, router);

  const [accountType, setAccountType] = useState("");
  const [variation_string, setVariation_string] = useState("");
  const [data, setData] = useState([{ plan_code: "", name: "", amount: "" }]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      setRedirecting(false);
      const response = await SetPricesHandler(
        ctx,
        accountType,
        variation_string,
        data
      );
      // console.log(response.message);
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

  const handleAccountTypeChange = (e) => {
    const inputValue = e.target.value;
    setAccountType(inputValue);
    // console.log(inputValue);
  };

  const handleNetworkChange = (e) => {
    const inputValue = e.target.value;
    setVariation_string(inputValue);
    // console.log(inputValue);
  };

  const handleDataChange = (event, index) => {
    const newData = [...data];

    if (event.target.name === "amount") {
      // Handle amount field
      newData[index][event.target.name] = event.target.value.replace(/\D/g, "");
    } else {
      // Handle other fields
      newData[index][event.target.name] = event.target.value.toUpperCase();
    }

    setData(newData);
    // console.log(newData);
  };

  const handleAddData = () => {
    setData([...data, { plan_code: "", name: "", amount: "" }]);
  };

  const handleRemoveData = (index) => {
    setData(data.filter((_, i) => i !== index));
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
      <SetCouponPrices
        accountType={accountType}
        variation_string={variation_string}
        data={data}
        loading={loading}
        errorMessage={errorMessage}
        successMessage={successMessage}
        handleSubmit={handleSubmit}
        handleAccountTypeChange={handleAccountTypeChange}
        handleNetworkChange={handleNetworkChange}
        handleDataChange={handleDataChange}
        handleAddData={handleAddData}
        handleRemoveData={handleRemoveData}
      />
    </div>
  );
}
