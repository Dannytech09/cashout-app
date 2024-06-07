import { useState } from "react";
import { adminAuthGuard } from "@/Utils/authGuard";
import { useRouter } from "next/router";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import { SetEduPricesHandler } from "@/pages/api/admin/eduPrices";
import EduPrices from "./adminjsx/EduPrices";

// SS
export default function UpdateEduPrices(ctx) {
  const router = useRouter();
  adminAuthGuard(ctx, router);

  const [accountType, setAccountType] = useState("");
  const [eduType, setEduType] = useState("");
  const [data, setData] = useState([{ name: "", amount: "" }]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await SetEduPricesHandler(
        ctx,
        accountType,
        eduType,
        data
      );

    //   console.log(response)
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

  const handleTypeChange = (e) => {
    const inputValue = e.target.value;
    setEduType(inputValue);
    // console.log(e.target.value);
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
      <EduPrices
        accountType={accountType}
        eduType={eduType}
        data={data}
        errorMessage={errorMessage}
        successMessage={successMessage}
        loading={loading}
        redirecting={redirecting}
        handleSubmit={handleSubmit}
        handleAccountTypeChange={handleAccountTypeChange}
        handleTypeChange={handleTypeChange}
        handleDataChange={handleDataChange}
        handleAddData={handleAddData}
        handleRemoveData={handleRemoveData}
      />
    </div>
  );
}
