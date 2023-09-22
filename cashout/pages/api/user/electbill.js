import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/electBill`;
const user = getUser();
 const id = user ? user.id : null;

export async function verifyElectBillHandler(ctx, selectedService, selectedType, meterNumber) {
    const { token } = getUserIdAndToken(ctx);
    try {
        const response = await axios.post(`${BASE_URL}/verify`, 
        { serviceID: selectedService, type: selectedType, billersCode: meterNumber },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response)
       return response.data
      } catch (error) {
        // console.log(error)
        return error.response.data;
      }
}

export async function buyElectBillHandler(ctx, selectedService, meterNumber, selectedType, amount) {
  const { token } = getUserIdAndToken(ctx);

    try {
        const response = await axios.post(
          `${BASE_URL}/pay/${id}`,
          { serviceID: selectedService, billersCode: meterNumber, variation_code: selectedType, amount: amount, },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data)
        return response.data;
      } catch (error) {
        // console.log(error.response.data)
         return error.response.data;
      }
}