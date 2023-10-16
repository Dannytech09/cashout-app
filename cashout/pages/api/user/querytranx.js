import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import { getUserIdAndToken } from "@/Utils/authCookies";
import { getUser } from "@/Utils/Common";

const BASE_URL = `${API_BASE_URL}/queryTransactions`;
// const user = getUser();
//  const id = user ? user.id : null;

export async function queryTranxHandler(ctx, inputValue ) {
    const { token, userId } = getUserIdAndToken(ctx);
  
      try {
          const response = await axios.post(
            `${BASE_URL}/${userId}`,
            {request_id: inputValue},
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