import { useState } from "react";
import classNames from "classnames";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import Loader from "@/components/utils/Loader";
import { SetPricesHandler } from "@/pages/api/admin/setCouponPrices";

// 1
export default function SetCouponPrices() {
  const [accountType, setAccountType] = useState("");
  const [variation_string, setVariation_string] = useState("");
  const [data, setData] = useState([{ plan_code: "", name: "", amount: "" }]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await SetPricesHandler(accountType, variation_string, data);
      // console.log(response.message);
      if (response.success === true || response.status === 204) {
        alert("Data updated successfully");
      } else if (response.message) {
        alert(response.message);
      }
    } catch (error) {
      // console.log(error.response.message);
      if (error.response.message) {
        alert(error.response.message);
      }
    }
    setLoading(false);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="text-center border border-black-300 bg-black h-screen"
    >
      {loading && <Loader />}
      <div>
        <SidebarAdmin />
      </div>
      <div className="mb-4 max-w-screen-md flex-col w-screen text-center">
        <h1 className="m-5 p-2 border border-green-400 bg-green-400 text-white ">
          Update Coupon Prices - 1
        </h1>
        <label htmlFor="network" className="block text-white font-bold mb-2">
          Account Type:
        </label>
        <select
          id="accountType"
          name="accountType"
          value={accountType}
          onChange={handleAccountTypeChange}
          className="appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Account</option>
          <option value="apiUser">Api User</option>
          <option value="partner">Partner</option>
          <option value="corporate">Corporate</option>
        </select>
        <label htmlFor="network" className="block text-white font-bold mb-2">
          Network: e.g., MTN Direct Coupon(1 month)
        </label>
        <input
          id="variation_string"
          name="variation_string"
          value={variation_string}
          onChange={handleNetworkChange}
          className="appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold">
          Please input Data Coupon Vol and Amount:
        </label>
        {data.map((dataItem, index) => (
          <div key={index} className="flex p-2 m-2">
            <select
              type="text"
              name="plan_code"
              value={dataItem.plan_code}
              onChange={(event) => handleDataChange(event, index)}
              placeholder="Plan Code"
              className={classNames(
                "appearance-none border rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                {
                  "bg-red-100 border-red-500": !/^[0-9]+GB$/.test(
                    dataItem.plan_code
                  ),
                }
              )}
            >
              {" "}
              <option value="">Plan Code</option>
              <option value="151">750MB</option>
              <option value="152">1GB</option>
              <option value="154">1.5GB</option>
              <option value="156">2GB</option>
              <option value="153">3GB</option>{" "}
            </select>
            <br />
            <select
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
            >
              {" "}
              <option value="">Select network</option>
              <option value="750MB">750MB</option>
              <option value="1GB">1GB</option>
              <option value="1.5GB">1.5GB</option>
              <option value="2GB">2GB</option>
              <option value="3GB">3GB</option>{" "}
            </select>
            <input
              type="number"
              name="amount"
              value={dataItem.amount}
              onChange={(event) => handleDataChange(event, index)}
              placeholder="Amount (e.g. 3000)"
              className={classNames(
                "appearance-none border rounded w-1/2 ml-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                { "bg-red-100 border-red-500": !/^\d+$/.test(dataItem.amount) }
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
          Add Coupon
        </button>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
}