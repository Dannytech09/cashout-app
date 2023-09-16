import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/tvSub`;
const userId = getUser();

// get
export async function getTvSubHandler() {
    try {
        const response = await axios.get(`${BASE_URL}`);
        // console.log(response)
       return response.data;
      } catch (error) {
        // console.log(error)
        return error.response.data;
      }
}

export async function verifyTvSubHandler(ctx, selectedService, iucNumber, variationCode) {
    const { token } = getUserIdAndToken(ctx);
    try {
        const response = await axios.post(`${BASE_URL}/verify`, 
        { serviceID: selectedService, billersCode: iucNumber, variation_code: variationCode },
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


export async function buyTvSubHandler(ctx, selectedService, iucNumber, selectedVariation ) {
  const { token } = getUserIdAndToken(ctx);

    try {
        const response = await axios.post(
          `${BASE_URL}/pay/${userId}`,
          { serviceID: selectedService, billersCode: iucNumber, variation_code: selectedVariation, },
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