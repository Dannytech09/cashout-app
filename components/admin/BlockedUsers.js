import { useState, useEffect } from "react";
import authHeader from "../../services/auth-Header";
import API_BASE_URL from "@/apiConfig";

export default function BlockedUsers() {

    const [totalBlocked, setTotalBlocked] = useState();

    useEffect(() => {
        async function TotalUsersBlocked() {
           const res = await fetch(`${API_BASE_URL}/api/v1/users`, {headers: authHeader()})
           const data = await res.json();

           const blocked = data?.data?.map((user) => (user.blocked))
           const totalAllBlocked = blocked.reduce((acc, curr) => acc + curr, 0)
           setTotalBlocked(totalAllBlocked)
        }
        TotalUsersBlocked();
    }, [totalBlocked])

  return (
    <div className='text-red-500 ml-2 pt-1'>{totalBlocked}</div>
  )
}
