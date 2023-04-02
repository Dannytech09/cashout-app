import { useState, useEffect } from "react";
import authHeader from "../../services/auth-Header";

const API_URL = "http://localhost:4000/api/v1/users/"

export default function BlockedUsers() {

    const [totalBlocked, setTotalBlocked] = useState();

    useEffect(() => {
        async function TotalUsersBlocked() {
           const res = await fetch(API_URL, {headers: authHeader()})
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
