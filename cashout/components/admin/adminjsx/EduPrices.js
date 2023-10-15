import React from "react";
import classNames from "classnames";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import Loader from "@/components/utils/Loader";

export default function EduPrices({
  accountType,
  eduType,
  data,
  errorMessage,
  successMessage,
  loading,
  handleSubmit,
  handleAccountTypeChange,
  handleTypeChange,
  handleDataChange,
  handleAddData,
  handleRemoveData,
}) {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="text-center border border-black-300 bg-blue-400 h-screen"
      >
        {loading && <Loader />}
        <div>
          <SidebarAdmin />
        </div>
        <div className="mb-4 max-w-screen-md flex-col w-screen text-center">
          <h1 className="m-5 p-2 border border-green-400 bg-green-400 text-white ">
            Update Edu Prices
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
          <label htmlFor="accountType" className="block text-white font-bold mb-2">
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
          <label
            // htmlFor="eduType"
            className="block text-white font-bold mb-2 mt-3"
          >
            Edu Type:
          </label>
          <select
            id="eduType"
            name="eduType"
            value={eduType}
            onChange={handleTypeChange}
            className="appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Type</option>
            <option value="waec">WAEC</option>
            <option value="neco">NECO</option>
            <option value="nabteb">NABTEB</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-white font-bold text-sm">
            Please input Vol (range: 1, 2, 3 & 5) and Amount:
          </label>
          {data.map((dataItem, index) => (
            <div key={index} className="flex p-2 m-2">
              <input
                type="number"
                name="name"
                value={dataItem.name}
                onChange={(event) => handleDataChange(event, index)}
                placeholder="Volume (e.g. 1)"
                className={classNames(
                  "appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
