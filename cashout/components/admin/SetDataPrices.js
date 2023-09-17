import axios from "axios";
import { useState } from "react";
import classNames from "classnames";
import API_BASE_URL from "@/apiConfig";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import {
  aExpireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import Loader from "../utils/Loader";
import { adminAuthGuard } from "@/Utils/authGuard";
import { useRouter } from "next/router";

const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;

// self
function SetDataPricesComp(ctx) {
  const router = useRouter();
  const { token } = getUserIdAndToken(ctx);
  adminAuthGuard(ctx, router);

  const [network, setNetwork] = useState("");
  const [data, setData] = useState([{ name: "", amount: "" }]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.patch(
        `${ADMIN_BASE_URL}/price/update-price`,
        { network, data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response)
      if (response.statusText === "OK" || response.status === 200) {
        alert("Data updated successfully");
      }
    } catch (error) {
      // console.log(error);
      if (
        error.response.data.error === "Invalid token." ||
        error.response.data.error === "Token has been revoked or expired." ||
        error.response.data.error === "Forbidden!"
      ) {
        sessionStorage.clear();
        aExpireSessionAndRedirect(ctx, router);
        setRedirecting(true);
      } else if (error.response.data.error) {
        setErrorMessage(error.response.data.error);
        setSuccessMessage(null);
      } else {
        throw new Error(`An error occurred ${error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDataChange = (event, index) => {
    const newData = [...data];
    newData[index][event.target.name] = event.target.value.toUpperCase();
    if (event.target.name === "amount") {
      newData[index][event.target.name] = event.target.value.replace(/\D/, "");
    }
    setData(newData);
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
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="text-center border border-black-300 bg-black h-screen"
      >
        <div>
          <SidebarAdmin />
        </div>
        <div className="mb-4 max-w-screen-md flex-col w-screen text-center">
          <h1 className="m-5 p-2 border border-green-400 bg-green-400 text-white ">
            Update Data Prices - self
          </h1>
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
          <label htmlFor="network" className="block text-white font-bold mb-2">
            Network:
          </label>
          <select
            id="network"
            name="network"
            value={network}
            onChange={(event) => setNetwork(event.target.value)}
            className="appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select network</option>
            <option value="mtn-sme">MTN</option>
            <option value="glo-gifting">Glo</option>
            <option value="airtel-gifting">Airtel</option>
            <option value="9mobile-sme">9mobile sme</option>
            <option value="9mobile-gifting">9mobile gifting</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-white font-bold">
            Please input Data Vol and Amount:
          </label>
          {data.map((dataItem, index) => (
            <div key={index} className="flex p-2 m-2">
              <input
                type="text"
                name="name"
                value={dataItem.name}
                onChange={(event) => handleDataChange(event, index)}
                placeholder="Name (e.g. 1GB)"
                className={classNames(
                  "appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  {
                    "bg-red-100 border-red-500": !/^[0-9]+GB$/.test(
                      dataItem.name
                    ),
                  }
                )}
              />
              <input
                type="text"
                name="amount"
                value={dataItem.amount}
                onChange={(event) => handleDataChange(event, index)}
                placeholder="Amount (e.g. 3000)"
                className={classNames(
                  "appearance-none border rounded w-1/2 ml-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  {
                    "bg-red-100 border-red-500": !/^\d+$/.test(dataItem.amount),
                  }
                )}
              />
              <button
                type="button"
                onClick={() => handleRemoveData(index)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Del
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddData}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Data
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SetDataPricesComp;
