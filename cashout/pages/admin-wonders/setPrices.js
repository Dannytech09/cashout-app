import { useState } from "react";
import classNames from "classnames";
import API_BASE_URL from "@/apiConfig";
import { getToken } from "@/Utils/Common";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";

const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;

export default function PatchForm() {
  const [network, setNetwork] = useState("");
  const [data, setData] = useState([{ name: "", amount: "" }]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${ADMIN_BASE_URL}/update-price`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ network, data }),
    });

    if (response.ok) {
      alert("Data updated successfully");
    } else {
      const error = await response.json();
      alert(`Error updating data: ${error.message}`);
    }
  };

  const handleNetworkChange = (e) => {
    const inputValue = e.target.value;
    setNetwork(inputValue);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="text-center border border-black-300 bg-black h-screen"
    >
      <div>
        <SidebarAdmin />
      </div>
      <div className="mb-4 max-w-screen-md flex-col w-screen text-center">
        <h1 className="m-5 p-2 border border-green-400 bg-green-400 text-white ">
          Update Data Prices - A
        </h1>
        <label htmlFor="network" className="block text-white font-bold mb-2">
          Network:
        </label>
        <select
          id="network"
          name="network"
          value={network}
          onChange={handleNetworkChange}
          className="appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select network</option>
          <option value="MTN">MTN</option>
          <option value="GLO-CG">GLO-CG</option>
          <option value="AIRTEL-CG">AIRTEL-CG</option>
          <option value="9MOBILE-CG">9MOBILE-CG</option>
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
  );
}
