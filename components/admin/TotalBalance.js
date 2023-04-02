import { useState, useEffect } from 'react';
import authHeader from "../../services/auth-Header";

function TotalBalance() {
  const [totalBalance, setTotalBalance] = useState(0);


  const API_URL = "http://localhost:4000/api/v1/users/"

  useEffect(() => {
    async function fetchTotalBalance() {
      const res = await fetch(API_URL,  { headers: authHeader()});
      const data = await res.json();

      const balances = data.data.map((user) => parseFloat(user.balance.$numberDecimal));
      const total = balances.reduce((acc, curr) => acc + curr, 0);
      setTotalBalance(total);
    }

    fetchTotalBalance();
  }, [totalBalance]);

  return (
    <div>
      <h1 className='text-green-400 ml-2 pt-1'>&#8358; {totalBalance.toFixed(2)}</h1>
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

