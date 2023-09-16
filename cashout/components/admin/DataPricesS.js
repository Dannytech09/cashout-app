import { useState } from "react";
import { SetDataPricesHandler } from "@/pages/api/admin/dataPricesS";
import { adminAuthGuard } from "@/Utils/authGuard";
import { useRouter } from "next/router";
import DataPricesS from "./adminjsx/DataPricesS";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";

// SS
export default function UpdatePrices(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);

  const [accountType, setAccountType] = useState("");
  const [variation_string, setVariation_string] = useState("");
  const [data, setData] = useState([{ name: "", amount: "" }]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await SetDataPricesHandler(
        ctx,
        accountType,
        variation_string,
        data
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
    newData[index][event.target.name] = event.target.value.toUpperCase();
    if (event.target.name === "amount") {
      newData[index][event.target.name] = event.target.value.replace(/\D/, "");
    }
    setData(newData);
    // console.log(newData);
  };

  const handleAddData = () => {
    setData([...data, { name: "", amount: "" }]);
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
      <DataPricesS
        accountType={accountType}
        variation_string={variation_string}
        data={data}
        errorMessage={errorMessage}
        successMessage={successMessage}
        loading={loading}
        redirecting={redirecting}
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
