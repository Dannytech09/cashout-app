import { useEffect, useState } from "react";
import {
  getBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
  addBeneficiary,
} from "@/pages/api/user/beneficiary";

const Beneficiary = ({ctx, onPhoneClickClear, onPhoneClick}) => {
  const [message, setMessage] = useState(null);
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    _id: "",
    bName: "",
    phone: "",
    vol: "",
  });

  const handleEditClick = (index) => {
    setEditIndex(index);
    setFormData(data[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(value);
  };

  // Update beneficiary
  const handleSaveClick = async (data) => {
    const itemId = data?._id;
    const bName = formData?.bName;
    const phone = formData?.phone;
    const vol = formData?.vol;

    try {
      // console.log('data', data)
      const response = await updateBeneficiary(ctx, itemId, bName, phone, vol);
      if (response.success === true) {
        setEditIndex(null);
        // Update the specific item in the data array

        setData(response.data.details);
        setMessage(response.message);
      } else if (response.error) {
        setMessage(response.error);
      } else {
        setMessage("Failed to update beneficiary");
      }
    } catch (error) {
      if (error.message.includes("net::ERR_CONNECTION_REFUSED")) {
        setMessage("Network error. Please try again later");
      }
    }
  };

  // Delete beneficiary
  const handleDeleteClick = async (itemId) => {
    try {
      // console.log("id", itemId);
      const response = await deleteBeneficiary(ctx, itemId);
      if (response.success === true) {
        setMessage(response.message);
        setData(data.filter((item) => item._id !== itemId));
      } else if (response.error) {
        setMessage(response.error);
      } else {
       setMessage("Failed to delete beneficiary");
      }
    } catch (error) {
     setMessage("Error deleting beneficiary");
    }
  };

  // Add beneficiary
  const handleAddClick = async () => {
    const { bName, phone, vol } = formData;

    try {
      const response = await addBeneficiary(ctx, bName, phone, vol);
      // console.log("edit", response.data);
      if (response.success === true || response.status === 201) {
        setMessage(response.message);
        // setData([...data, formData]);
        setData(response.data.details);
        setFormData({ _id: "", bName: "", phone: "", vol: "" });
        setEditIndex(null);
      } else if (response.error) {
        setMessage(response.error);
      } else {
        setMessage("Failed to add beneficiary");
      }
    } catch (error) {
      setMessage("Error adding beneficiary");
    }
  };

  // Get beneficiaries
  useEffect(() => {
    async function fetchData() {
      const resp = await getBeneficiary(ctx);
      setData(resp.data?.details || []);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white w-screen p-3 text-sm sm:text-lg">
      {message && (
        <div className="text-center p-2 border-2 bg-black text-blue-500 text-sm max-w-80 mx-auto">
          <h6>{message}</h6>
        </div>
      )}

      <table className="w-full text-center">
        <thead>
          <tr>
            <th>S/N</th>
            <th>C.NAME</th>
            <th>C.PHONE</th>
            <th>VOL</th>
            <th>FXN</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5">No beneficiaries added yet.</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  {editIndex === index ? (
                    <input
                      className="w-3/4 text-center bg-red-600"
                      type="text"
                      name="bName"
                      value={formData.bName}
                      maxLength={10}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.bName
                  )}
                </td>
                <td onClick={() => onPhoneClick(item.phone)}>
                  {editIndex === index ? (
                    <input
                      className="w-3/4 text-center bg-red-600"
                      type="text"
                      name="phone"
                      value={formData.phone}
                      maxLength={11}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.phone
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      className="w-3/4 text-center bg-red-600"
                      type="text"
                      name="vol"
                      value={formData.vol}
                      maxLength={5}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.vol
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <>
                      <button
                        className="border-2 border-green-600 bg-green-600 hover:bg-green-500 hover:border-green-500 m-1 p-1"
                        onClick={() => handleSaveClick(item)}
                      >
                        Save
                      </button>
                      <button
                        className="border-2 border-gray-600 bg-gray-600 hover:bg-gray-500 hover:border-gray-500 m-1 p-1"
                        onClick={() => setEditIndex(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="border-2 border-red-600 bg-red-600 hover:bg-red-500 hover:border-red-500 m-1 p-1"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="border-2 border-red-600 bg-red-600 hover:bg-red-500 hover:border-red-500 m-1 p-1"
                        onClick={() => handleDeleteClick(item._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-4">
        <h3>Add Beneficiary</h3>
        <input
          type="text"
          name="bName"
          maxLength={10}
          value={formData.bName}
          onChange={handleInputChange}
          placeholder="Name"
          className="p-2 border-2 border-gray-300"
        />
        <input
          type="text"
          name="phone"
          maxLength={11}
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          autoComplete="off"
          className="p-2 border-2 border-gray-300"
        />
        <input
          type="text"
          name="vol"
          maxLength={5}
          value={formData.vol}
          onChange={handleInputChange}
          placeholder="Volume"
          className="p-2 border-2 border-gray-300"
        />
        <button
          className="border-2 border-green-600 bg-green-600 hover:bg-green-500 hover:border-green-500 m-1 p-1"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Beneficiary;
