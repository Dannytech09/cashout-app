import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";

export default function TotalUser() {

    const [users, setUsers] = useState();

    const fetch = async () => {
      await UserService.getAllUsers()
        .then((res) => {
          setUsers(res.data?.count);
        })
        .catch((error) => {
          if (
            error.response.data.error === "Invalid token." ||
            error.response.data.error === "Token expired."
          ) {
            sessionStorage.clear();
            router.push("/admin-wonders/login");
          } else if(error) {
            return <p>{Error}: Data is undefined or missing</p>;
          }
        });
    };
  
    useEffect(() => {
      fetch();
    }, [users]);

  return (
    <div className="text-green-400 ml-2 pt-1">{users}</div>
  )
}
