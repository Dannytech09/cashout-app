import React, { useState, useEffect } from 'react';
import authHeader from "../../services/auth-Header";
import API_BASE_URL from "@/apiConfig";
import { useRouter } from 'next/router';


function TotalBalance() {
  const router = useRouter();
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTotalBalance() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/users`, {
          headers: authHeader(),
        });
        const data = await res.json();
        setLoading(false);

        if (data && data.data) {
          const balances = data.data.map((user) =>
            parseFloat(user.balance.$numberDecimal)
          );
          const total = balances.reduce((acc, curr) => acc + curr, 0);
          setTotalBalance(total);
        }
      } catch (error) {
        // console.log(error.response.data.error);
         if (
          error.response.data.error === "Invalid token." ||
          error.response.data.error === "Token expired."
        ) {
          sessionStorage.clear();
          router.push("/admin-wonders/login");
        } 
      }
      setLoading(false);
    }

    fetchTotalBalance();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-green-400 ml-2 pt-1">
        &#8358; {totalBalance.toFixed(2)}
      </h1>
    </div>
  );
}

export default TotalBalance;


// Another way of calling api
// fetch('/api/v1/users')
//   .then((response) => response.json())
//   .then((data) => {
//     const balances = data.map((user) => parseFloat(user.balance.$numberDecimal));
//     const total = balances.reduce((acc, curr) => acc + curr, 0);
//     // Do something with the total balance
//   })
//   .catch((error) => {
//     console.error('Error fetching data:', error);
//   });
