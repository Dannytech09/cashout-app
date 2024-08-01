import React from "react";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import Loader from "@/components/utils/Loader";

export default function Notice({
  name,
  errorMessage,
  successMessage,
  dropDownMesssage,
  loading,
  handleSubmit,
  handleNameChange,
}) {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="text-center border border-black-300 bg-black "
      >
        {loading && <Loader />}
        <div>
          <SidebarAdmin />
        </div>
        <div className="mb-4 max-w-screen-md flex-col w-screen text-center">
          <h1 className="m-5 p-2 border border-green-400 bg-green-400 text-white ">
            Update Notification
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

          <label
            htmlFor="name"
            className="block text-white font-normal mb-2 mt-3"
          >
            Notification Message to Users:
          </label>
          <textarea
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            className="appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mb-15 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        {dropDownMesssage && (
          <div className="p-3 m-3 mt-5 text-xs border border-green-700 bg-green-700">
            <p className="text-white text-center">{dropDownMesssage}</p>
          </div>
        )}
      </form>
    </div>
  );
}
