import Head from "next/head";
import Loader from "@/components/utils/Loader";
import Sidebar from "../Sidebar";
import { Logout } from "../Logout";
import Link from "next/link";
import React from "react";
// import Layout from "../../../components/user/Layout";

function Developer({
  copied,
  loading,
  error,
  handleSubmit,
  data,
  handleCopy,
  dataComponent,
  handleRowClick,
  openComponent,
  message,
  accessData,
  handleInputChange,
  handleAccess,
}) {
  return (
    <div className="h-screen">
      <Head>
        <title>Dev Page</title>
      </Head>
      {loading && <Loader />}
      <div className="flex justify-between">
        <div className="">
          <Sidebar />
        </div>
        <div className="mr-0 lg:mr-[-3ch] md:mr-[-3ch] sm:mr-[-3ch]">
          <Logout />
        </div>
      </div>
      <h1 className="text-center bg-yellow-500 p-2 w-60 mx-auto">
        Welcome to Dev&apos;s API
      </h1>
      {error && (
        <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600">
          {error}
        </p>
      )}
      {/* <Layout> */}
      <div className="p-1">
        <div className="flex flex-row justify-center">
          <p className="text-center text-sm p-1">
            Generate API KEY before we kick start. You can only see it once, so
            copy it before leaving this page
          </p>
          <button
            onClick={handleSubmit}
            className="text-center bg-blue-600 hover:bg-blue-500 text-white text-sm p-1 m-1 rounded-lg"
          >
            Generate
          </button>
        </div>
        {data && (
          <div className="text-sm space-y-2 p-4 border rounded-lg shadow-md bg-white max-w-md mx-auto">
            <div className="flex flex-col space-y-1">
              <span className="font-semibold">API KEY:</span>
              <div className="flex items-center gap-2">
                <input
                  className="w-full p-2 border rounded text-gray-700 bg-gray-100"
                  readOnly
                  type="text"
                  value={data.apiKey}
                />
                <button
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => handleCopy(data.apiKey, "apiKey")}
                >
                  📋
                </button>
              </div>
              {copied === "apiKey" && (
                <span className="text-green-500 text-xs">APIKEY Copied!</span>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <span className="font-semibold">User ID:</span>
              <div className="flex items-center gap-2">
                <input
                  className="w-full p-2 border rounded text-gray-700 bg-gray-100"
                  readOnly
                  type="text"
                  value={data.userId}
                />
                <button
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => handleCopy(data.userId, "userId")}
                >
                  📋
                </button>
              </div>
              {copied === "userId" && (
                <span className="text-green-500 text-xs">USERID Copied!</span>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:space-x-6 lg:items-center lg:justify-center">
          {/* Data, Coupon and edupin */}
          {/* Flex container */}
          <div className="">
            {dataComponent.length === 0 ? (
              <p>Loading...</p>
            ) : (
              <table className="mx-auto border">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-2">Some Parameters Needed</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {/* Render networkDataS */}
                    {dataComponent.networkDataS.map((ctr) => (
                      <React.Fragment key={ctr._id}>
                        <tr
                          className="text-center text-green-400 border cursor-pointer"
                          onClick={() => handleRowClick(ctr._id)}
                        >
                          <td>{ctr.variation_string.toUpperCase()}</td>
                        </tr>
                        {openComponent === ctr._id && (
                          <tr className="">
                            <td colSpan="1" className="pb-5">
                              <table className="w-full border-collapse border">
                                <thead>
                                  <tr className="bg-gray-700 text-white">
                                    {/* <th className="p-2">S/N</th> */}
                                    <th className="p-2 text-xs">Network</th>
                                    <th className="p-2 text-xs text-center">
                                      Plan Code
                                    </th>
                                    <th className="p-2 text-xs text-center">
                                      Package
                                    </th>
                                    <th className="p-2 text-xs text-center">
                                      {" "}
                                      &#8358; Partner
                                    </th>
                                    <th className="p-2 text-xs text-center">
                                      &#8358; Api
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ctr.dataVol.map((variation) => (
                                    <tr key={variation._id} className="border">
                                      {/* <td className="text-center">{index + 1}</td> */}
                                      <td className="p-2 text-xs text-center">
                                        {ctr.network}
                                      </td>
                                      <td className="p-2 text-xs text-center">
                                        {variation.plan_code}
                                      </td>
                                      <td className="p-2 text-xs text-center">
                                        {variation.name}
                                      </td>
                                      <td className="text-center text-xs">
                                        {variation.amountPartner}
                                      </td>
                                      <td className="text-center text-xs">
                                        {variation.amountApiUser}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </>

                  <>
                    {/* Render dataCoupon */}
                    {dataComponent.dataCoupon.map((ctr) => (
                      <React.Fragment key={ctr._id}>
                        <tr
                          className="text-center text-blue-400 border cursor-pointer"
                          onClick={() => handleRowClick(ctr._id)}
                        >
                          <td>{ctr.variation_string.toUpperCase()}</td>
                        </tr>
                        {openComponent === ctr._id && (
                          <tr>
                            <td colSpan="3">
                              <table className="w-full border-collapse border">
                                <thead>
                                  <tr className="bg-gray-700 text-white">
                                    <th className="p-2 text-xs">Network_Id</th>
                                    <th className="p-2 text-xs text-center">
                                      Plan Code
                                    </th>
                                    <th className="p-2 text-xs text-center">
                                      Package
                                    </th>
                                    <th className="p-2 text-xs text-center">
                                      {" "}
                                      &#8358; Partner
                                    </th>
                                    <th className="p-2 text-xs text-center">
                                      &#8358; Api
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ctr.dataVol.map((variation) => (
                                    <tr key={variation._id} className="border">
                                      {/* <td className="text-center">{index + 1}</td> */}
                                      <td className="p-2 text-xs text-center">
                                        {ctr.network}
                                      </td>
                                      <td className="p-2 text-xs text-center">
                                        {variation.plan_code}
                                      </td>
                                      <td className="p-2 text-xs text-center">
                                        {variation.name}
                                      </td>
                                      <td className="text-center text-xs">
                                        {variation.amountPartner}
                                      </td>
                                      <td className="text-center text-xs">
                                        {variation.amountApiUser}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </>

                  <>
                    {/* Render edupin */}
                    {dataComponent.eduPin.map((ctr) => (
                      <React.Fragment key={ctr._id}>
                        <tr
                          className="text-center text-yellow-400 border cursor-pointer"
                          onClick={() => handleRowClick(ctr._id)}
                        >
                          <td>{ctr.type.toUpperCase()}</td>
                        </tr>
                        {openComponent === ctr._id && (
                          <tr>
                            <td colSpan="3">
                              <table className="w-full border-collapse border">
                                <thead>
                                  <tr className="bg-gray-700 text-white">
                                    <th className="p-2 text-xs">Type</th>
                                    <th className="p-2 text-xs text-center">
                                      Plan Code
                                    </th>
                                    <th className="p-2 text-xs text-center">
                                      No. Of Pin
                                    </th>
                                    <th className="p-2 text-xs text-center">
                                      {" "}
                                      &#8358; Partner
                                    </th>
                                    <th className="p-2 text-xs text-center">
                                      &#8358; Api
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ctr.vol.map((variation) => (
                                    <tr key={variation._id} className="border">
                                      {/* <td className="text-center">{index + 1}</td> */}
                                      <td className="p-2 text-xs text-center">
                                        {ctr.type}
                                      </td>
                                      <td className="p-2 test-xs text-center">
                                        {variation.plan_code}
                                      </td>
                                      <td className="p-2 test-xs text-center">
                                        {variation.name}
                                      </td>
                                      <td className="text-center text-xs">
                                        {variation.amountPartner}
                                      </td>
                                      <td className="text-center text-xs">
                                        {variation.amountApiUser}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                </tbody>
              </table>
            )}
          </div>
          {/* Flex container */}
          <div>
            <form
              // onSubmit={handleAccess}
              className="max-w-lg mx-auto bg-white text-xs p-6 rounded-lg shadow-lg space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Request Access to Our API
              </h3>
              <p className="text-xs">
                Kindly make a request in order to have access to our api
                endpoints
              </p>
              {error && (
                <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-red-600 border bg-black">
                  {error}
                </p>
              )}
              {message && (
                <p className="text-[1.2ch] text-xs text-center m-3 p-3 mt-[-2ch] text-green-600 border bg-black">
                  {message}
                </p>
              )}

              {/* Live Domain */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Live Request Domain
                </label>
                <input
                  name="liveUrl"
                  value={accessData.liveUrl}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your live domain (e.g., https://yourapp.com)"
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                  maxLength={60}
                />
              </div>

              {/* Development Domain */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Development Request Domain
                </label>
                <input
                  name="devUrl"
                  value={accessData.devUrl}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your dev domain (e.g., http://localhost:3000)"
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                  maxLength={60}
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  What Are You Integrating?
                </label>
                <div className="space-y-2 mt-2">
                  {[
                    "Airtime",
                    "Data",
                    "Electricity Payment",
                    "Cable Subscription",
                    "Airtime to Cash",
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        name="products"
                        value={option}
                        onChange={handleInputChange}
                        type="checkbox"
                        checked={accessData.products.includes(option)}
                        className="rounded text-blue-600 focus:ring focus:ring-blue-300"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Website Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  How did you know about us?
                </label>
                <input
                  name="referral"
                  value={accessData.referral}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="e.g., through Bolaji, a friend"
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                  maxLength={60}
                />
              </div>

              {/* Additional Requests */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Information
                </label>
                <textarea
                  name="message"
                  value={accessData.message}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or API limits needed?"
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  rows="3"
                  maxLength={100}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleAccess}
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit Request
              </button>
            </form>
            <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
              <p className="font-semibold text-sm">Note:</p>
              <ul className="p-2 m-2 text-xs text-left space-y-1">
                <li>
                  Airtime, Cable Sub and Electricity Bill&apos;s payment{" "}
                  <span className="font-bold">DISCOUNT</span> is currently
                  <pre className="bg-gray-800 p-1 rounded text-green-400 inline-block ml-2">
                    {`1 percentage off the purchased amount`}
                  </pre>
                </li>
                <li>
                  Parameters needed for <span className="font-bold">Data</span>{" "}
                  are:
                  <pre className="bg-gray-800 p-1 rounded text-green-400 inline-block ml-2">
                    {`{ network, plan_code, mobile }`}
                  </pre>
                </li>
                <li>
                  Parameters needed for{" "}
                  <span className="font-bold">Coupon</span> are:
                  <pre className="bg-gray-800 p-1 rounded text-blue-400 inline-block ml-2">
                    {`{ network_id, plan_code, mobile }`}
                  </pre>
                </li>
                <li>
                  Parameters needed for{" "}
                  <span className="font-bold">Edu Pin</span> are:
                  <pre className="bg-gray-800 p-1 rounded text-yellow-400 inline-block ml-2">
                    {`{ type, plan_code }`}
                  </pre>
                </li>
              </ul>
            </div>

            <div className="mt-6 mx-auto">
              <Link
                className="text-blue-500 hover:underline font-medium text-center p-3 m-3 w-full border bg-black"
                href="https://documenter.getpostman.com/view/20955362/2sAYdZstR5"
                target="_blank"
              >
                API endpoint
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* </Layout> */}
    </div>
  );
}

export default Developer;
