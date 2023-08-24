import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import { useRouter } from "next/router";

export default function TotalUser() {
  const router = useRouter();
  const [users, setUsers] = useState();

  const fetch = async () => {
    await UserService.getAllUsers()
      .then((res) => {
        setUsers(res.data?.count);
      })
      .catch((error) => {
        // console.log(error)
        if (
          error.response.data.error === "Invalid token." ||
          error.response.data.error === "Token expired."
        ) {
          sessionStorage.clear();
          router.push("/admin-wonders/login");
        } else {
          return <p>{error}</p>;
        }
      });
  };

  useEffect(() => {
    fetch();
  });

  return <div className="text-green-400 ml-2 pt-1">{users}</div>;
}
