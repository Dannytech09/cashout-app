import { useState } from "react";
import Loader from "@/components/utils/Loader";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import { useRouter } from "next/router";
import { adminAuthGuard } from "@/Utils/authGuard";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import { LockDataHandler } from "@/pages/api/admin/lockData";

// A
const LockDataComp = (ctx) => {
  const router = useRouter();
  adminAuthGuard(ctx, router);

  const [variation_string, setVariation_string] = useState("MTN-SME");
  const [visibility, setVisibility] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleVisibilityUpdate = async (ctx) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      setRedirecting(false);
      const response = await LockDataHandler(ctx, visibility, variation_string);
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
      }
    } catch (error) {
      // console.error(error);
      if (error) {
        throw new Error(`An error occurred ${error}`);
      } else {
        setErrorMessage("Something went wrong !");
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
    <div className="bg-gray-100 h-screen p-8">
      {loading && <Loader />}
      <div className="fixed top-0 left-0">
        <SidebarAdmin />
      </div>
      <h1 className="text-center m-5 p-5">Lock and On Data Services - A</h1>
      {errorMessage && (
        <div className="p-3 m-3 text-xs mt-[-2ch] border border-red-700 bg-red-700">
          <p className="text-white text-center">{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="p-3 m-3 text-xs mt-[-2ch] border border-green-700 bg-green-700">
          <p className="text-white text-center">{successMessage}</p>
        </div>
      )}
      <div className="justify-center text-center">
        <div>
          <select
            className="bg-white border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={variation_string}
            onChange={(e) => setVariation_string(e.target.value)}
          >
            <option value="MTN-SME">MTN-SME</option>
            <option value="MTN-DS">MTN-DS</option>
            <option value="MTN-CG">MTN-CG</option>
            <option value="GLO-CG">GLO-CG</option>
            <option value="AIRTEL-CG">AIRTEL-CG</option>
            <option value="9MOBILE-CG">9MOBILE-CG</option>
          </select>
        </div>
        <div>
          <select
            className="bg-white border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value === "true")}
          >
            <option value="false">LOCK</option>
            <option value="true">ON</option>
          </select>
        </div>
      </div>
      <div className="text-center ">
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2"
          onClick={handleVisibilityUpdate}
        >
          Lock/On Data
        </button>
      </div>
    </div>
  );
};

export default LockDataComp;
