import React from 'react'
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import Loader from "@/components/utils/Loader";

export default function Cd({ email, amount, operation, purpose, setEmail, setAmount, setOperation, setPurpose, error, successMessage, loading, handleFormSubmit}) {
  return (
    <div>
        {loading && <Loader/>}
      <SidebarAdmin />{" "}
      <div className="container">
        <h1 className="text-white text-xs text-center p-5">
          Debit/Credit User Balance
        </h1>
        <form
          className="border border-blue-200 border-r-8 rounded-lg bg-yellow-300 p-10 m-5"
          onSubmit={handleFormSubmit}
        >
          {error && (
            <div className="p-3 m-3 text-xs mt-[-2ch] border border-red-700 bg-red-700">
              <p className="text-white text-center">{error}</p>
            </div>
          )}
          {successMessage && (
            <div className="p-3 m-3 text-xs mt-[-2ch] border border-green-700 bg-green-700">
              <p className="text-white text-center">{successMessage}</p>
            </div>
          )}
          <label className="text-red-400 mt-2">Email:</label>
          <input
            className="mt-[-5ch]"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="text-red-400 mt-[2ch]">Amount:</label>
          <input
            className="mt-[-5ch]"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <label className="text-red-400 mt-[2ch]">Operation:</label>
          <select
            className="mt-[-5ch]"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="">Select operation</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
            <option value="reversal">Reversal</option>
          </select>
          <br />
          <label className="text-red-400 mt-[2ch] text-sm">
            Purpose: optional note for user. e.g: money reversed for this order
          </label>
          <input
            className="mt-[-5ch]"
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <br />
          <br />
          <div className="flex justify-center">
            <button
              className="hover:bg-blue-800 border rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        <style jsx>{`
          .container {
            max-width: 400px;
            margin: 0 auto;
            // background-color: black;
          }

          h1 {
            font-size: 24px;
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin-bottom: 10px;
          }

          input,
          select {
            width: 100%;
            padding: 5px;
            border: 1px solid #ccc;
          }

          button {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #0070f3;
            color: #fff;
            border: none;
            cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  )
}
