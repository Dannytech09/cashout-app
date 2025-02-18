import React, { useEffect, useState } from "react";
import { tvSubPricesHandler, tvSubUpdatePricesHandler } from "@/pages/api/admin/tvSubPrices"
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import { useRouter } from "next/router";

export default function TvSubPrices(ctx) {
    const router = useRouter();
  const [id, setId] = useState(null); // State for tvSub data
  const [data, setData] = useState([]); // State for tvSub data
  const [openServiceID, setOpenServiceID] = useState(null); // State for the open service
  const [formData, setFormData] = useState({}); // State for editable form data
  const [message, setMessage] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    setMessage(null);
    const fetchData = async () => {
      try {
        const response = await tvSubPricesHandler(ctx); // Adjust function as needed
        if (
            response.error === "Invalid token." ||
            response.error === "Token has been revoked or expired." ||
            response.error === "Forbidden!"
          ) {
            sessionStorage.clear();
            aExpireSessionAndRedirect(ctx, router);
          } else if (response.error) {
            setMessage(response.error);
          } else {
        setMessage(response.message);
        setData(response.data.tvSub || []);
        setId(response?.data?._id || null);
        }
      } catch (error) {
        // console.log("errore", error)
        throw new Error(`An error occurred ${error}`);
       }
    };

    fetchData();
  }, []);

  // Handle row click to toggle visibility
  const handleRowClick = (serviceID) => {
    setOpenServiceID(openServiceID === serviceID ? null : serviceID);
  };

  //   // Handle input changes
  const handleInputChange = (e, index, field) => {
    const updatedFormData = { ...formData };
  
    // Find the current service by `openServiceID`
    const service = data.find((item) => item.serviceID === openServiceID);
  
    if (!service) {
    //   console.error("Service not found for openServiceID:", openServiceID);
      alert("Service not found for openServiceID:", openServiceID);
      return;
    }
  
    // Initialize the current service's variations if not already in `formData`
    if (!updatedFormData[openServiceID]) {
      updatedFormData[openServiceID] = [...service.varations];
    }
  
    // Update the field value for the specific variation
    updatedFormData[openServiceID][index][field] = e.target.value;
  
    // Auto-update the 'name' field if 'variation_amount' is updated
    if (field === "variation_amount") {
      let amount = e.target.value.replace(/\D/g, "");
  
      // Format the amount to include commas
      const formattedAmount = Number(amount.replace(/,/g, "")).toLocaleString();
  
      // Extract the current name
      const currentName = updatedFormData[openServiceID][index]["name"];
  
      // Regex to match ' N' followed by numbers
      const regex = /\sN\d{1,3}(?:,\d{3})*/;
  
      let updatedName;
      if (regex.test(currentName)) {
        updatedName = currentName.replace(regex, ` N${formattedAmount}`);
      } else {
        updatedName = `${currentName.trim()} N${formattedAmount}`;
      }
  
      // Update the name with the formatted amount
      updatedFormData[openServiceID][index]["name"] = updatedName;
  
      // Maintain consistency in `variation_amount`
    //   updatedFormData[openServiceID][index]["variation_amount"] = formattedAmount;
    }
  
    // Update state
    setFormData({ [openServiceID]: updatedFormData[openServiceID] }); // Clear other services
  };
  

  // Submit updated data
  const handleSubmit = async (ctx) => {
    if (!formData[openServiceID]) return;

    const sanitisedVariations = formData[openServiceID].map(({ _id, ...rest}) => rest);
    // console.log("sanitisedVariations", sanitisedVariations)


    const payload = {
        serviceID: openServiceID,
        varations: sanitisedVariations
      };
      
    try { 
      const response = await tvSubUpdatePricesHandler(ctx, id, payload)

      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired." ||
        response.error === "Forbidden!"
      ) {
        sessionStorage.clear();
        aExpireSessionAndRedirect(ctx, router);
      } else if (response.error) {
        setMessage(response.error);
        alert(response.error)
      } else {
        alert("Update successful!");
        setMessage(response.message)
      }
    } catch (error) {
    //   console.error("Error updating:", error);
      alert("An error occurred while updating.");
    }
  };

  // Render component
  return (
    <div className="bg-gray-900 text-slate-500 h-screen text-center overflow-x-hidden p-3">
      <h2 className="bg-slate-100 text-blue-600">Data Subscription Details</h2>
      { message ? (
      <div className="mt-2 p-3">
      <p className="text-green-400 bg-white p-1 text-sm">
        {message} ✔
      </p>
      </div>
      ) : ""
      }
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="h-screen">
        <table className="mx-auto">
          <thead>
            <tr>
              <th>Service</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((service) => (
              <React.Fragment key={service.serviceID}>
                {/* Main row */}
                <tr className="text-center text-yellow-300 border w-4" onClick={() => handleRowClick(service.serviceID)} style={{ cursor: "pointer" }}>
                  <td>{service.serviceID.toUpperCase()}</td>
                </tr>
                {/* Expandable rows */}
                {openServiceID === service.serviceID && (
                  <tr className="">
                    <td>
                      <table className="">
                        <thead>
                          <tr>
                            <th>S/N</th>
                            <th>Package</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody className="text-[1.2ch]">
                          {service.varations.map((variation, index) => (
                            <tr className="" key={index}>
                                <td className="">
                                    {index + 1}
                                </td>
                              <td className="w-screen p-2">
                                <input
                                className="w-40 text-black"
                                  type="text"
                                  value={
                                    formData[service.serviceID]?.[index]?.name || variation.name
                                  }
                                  onChange={(e) => handleInputChange(e, index, "name")}
                                />
                              </td>
                              <td className="w-2">
                                <input
                                className="w-12 text-center text-black"
                                  type="text"
                                  value={
                                    formData[service.serviceID]?.[index]?.variation_amount ||
                                    variation.variation_amount
                                  }
                                  onChange={(e) => handleInputChange(e, index, "variation_amount")}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button className="p-3 m-2 border rounded-lg hover:bg-gray-800 bg-black text-slate-300" onClick={handleSubmit}>Save Changes</button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
       </table>
        </div>
      )}
    </div>
  );
}

                // 1 //
//   // Handle row click to toggle visibility
//   const handleRowClick = (serviceID) => {
//     setOpenServiceID(openServiceID === serviceID ? null : serviceID);
//   };

//   const handleInputChange = (e, index, field) => {
//     const updatedFormData = { ...formData };
//     if (!updatedFormData[openServiceID]) {
//       updatedFormData[openServiceID] = [...data.find((item) => item.serviceID === openServiceID).varations];
//     }
//     updatedFormData[openServiceID][index][field] = e.target.value;
//     setFormData(updatedFormData);
//   };

            // 2 //
//   // Handle input changes
//   const handleInputChange = (e, index, field) => {
//     const updatedFormData = { ...formData };
  
//     // Find the current service by `openServiceID`
//     const service = data.find((item) => item.serviceID === openServiceID);
  
//     if (!service) {
//       console.error("Service not found for openServiceID:", openServiceID);
//       return;
//     }
  
//     // Initialize the current service's variations if not already in `formData`
//     if (!updatedFormData[openServiceID]) {
//       updatedFormData[openServiceID] = [...service.varations];
//     }
  
//     // Update the field value for the specific variation
//     updatedFormData[openServiceID][index][field] = e.target.value;
  
//     // Auto-update the 'name' field if 'variation_amount' is updated
//     if (field === "variation_amount") {
//       let amount = e.target.value.replace(/\D/g, "");
  
//       // Format the amount to include commas
//       const formattedAmount = Number(amount.replace(/,/g, "")).toLocaleString();
  
//       // Extract the current name
//       const currentName = updatedFormData[openServiceID][index]["name"];
  
//       // Regex to match ' N' followed by numbers
//       const regex = /\sN\d{1,3}(?:,\d{3})*/;
  
//       let updatedName;
//       if (regex.test(currentName)) {
//         updatedName = currentName.replace(regex, ` N${formattedAmount}`);
//       } else {
//         updatedName = `${currentName.trim()} N${formattedAmount}`;
//       }
  
//       // Update the name with the formatted amount
//       updatedFormData[openServiceID][index]["name"] = updatedName;
  
//       // Maintain consistency in `variation_amount`
//       updatedFormData[openServiceID][index]["variation_amount"] = formattedAmount;
//     }
  
//     // Update state
//     setFormData({ [openServiceID]: updatedFormData[openServiceID] }); // Clear other services
//   };


        // 3 //
        
// const handleInputChange = (e, index, field) => {
//     // Clone the formData state
//     const updatedFormData = { ...formData };
  
//     // Find the service with the current openServiceID
//     const service = data.find((item) => item.serviceID === openServiceID);
  
//     if (!service) {
//         alert("Service not found for openServiceID:", openServiceID)
//     //   console.error("Service not found for openServiceID:", openServiceID);
//       return;
//     }
  
//     // Initialize formData for the current service if it doesn't exist
//     if (!updatedFormData[openServiceID]) {
//       updatedFormData[openServiceID] = [...service.varations];
//     }
  
//     // Use map to update the specific field for the given index
//     updatedFormData[openServiceID] = updatedFormData[openServiceID].map((variation, i) => {
//       if (i === index) {
//         // Update the specified field
//         const updatedVariation = { ...variation, [field]: e.target.value };
  
//         // Handle auto-updating 'name' when 'variation_amount' changes
//         if (field === "variation_amount") {
//           let amount = e.target.value.replace(/\D/g, ""); // Keep only numbers
  
//           // Format the amount with commas (e.g., 2000 -> 2,000)
//           const formattedAmount = Number(amount).toLocaleString();
  
//           // Regex to check for 'N' followed by digits
//           const regex = /\sN\d{1,3}(?:,\d{3})*/;
  
//           // Update the name with the formatted amount
//           let updatedName;
//           if (regex.test(updatedVariation.name)) {
//             updatedName = updatedVariation.name.replace(regex, ` N${formattedAmount}`);
//           } else {
//             updatedName = `${updatedVariation.name.trim()} N${formattedAmount}`;
//           }
  
//           updatedVariation.name = updatedName;
//         //   updatedVariation.variation_amount = formattedAmount;
//         }
  
//         return updatedVariation; // Return the updated variation
//       }
  
//       return variation; // Return unmodified variations
//     });
    
//     // Update the formData state
//     setFormData(updatedFormData);
//   };