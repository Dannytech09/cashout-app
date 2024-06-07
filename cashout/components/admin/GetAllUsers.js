import React, { useState, useEffect } from "react";
import Users from "@/components/admin/Users";
import HeadInPages from "@/components/admin/HeadInPages";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";
import { useRouter } from "next/router";
import axios from "axios";
import API_BASE_URL from "@/apiConfig";
import {
  aExpireSessionAndRedirect,
  getUserIdAndToken,
} from "@/Utils/authCookies";
import Loader from "../utils/Loader";
import { useQuery } from "react-query";

const BASE_URL = `${API_BASE_URL}/api/v1`;

function GetAllUsersComp(ctx) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [redirecting, setRedirecting] = useState(false);
  const [count, setCount] = useState(1);
  const [totalCount, setTotalCount] = useState("");

  const { data, isLoading, isError, error } = useQuery(
    ["users", page],
    async () => {
      const { token } = getUserIdAndToken(ctx);

      try {
        const response = await axios.get(`${BASE_URL}/users?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.code === "000") {
          // console.log(response.data)
          setTotalCount(response.data.totalPages);
          return response.data;
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        if (
          error.response.data.error === "Invalid token." ||
          error.response.data.error === "Token has been revoked or expired." ||
          error.response.data.error === "Forbidden!"
        ) {
          sessionStorage.clear();
          aExpireSessionAndRedirect(ctx, router);
          setRedirecting(true);
        } else if (error.response.data.error) {
          throw new Error(error.response.data.error);
        }
        throw new Error(`An error occurred while fetching data. ${error}`);
      }
    },
    {
      staleTime: 60000,
    }
  );

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setCount(count - 1);
      setTotalCount(data.totalPages);
    }
  };

  const handleNextPage = () => {
    if (data && data.pagination.next) {
      setPage(page + 1);
      setCount(count + 1);
      setTotalCount(data.totalPages);
    }
  };

  const users = data ? data.data : [];

  // const refreshData = async () => {
  //   await queryClient.invalidateQueries({
  //     "users": ["page"],
  //     refetchType: "none"
  //   });
  // }

  // useEffect(() => {
  //   refreshData();
  // }, [data, page])

  if (redirecting) {
    return (
      <div className="text-sm bg-red-600">
        Session expired redirecting to login...
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && <Loader />}
      <div className="fixed top-0 z-40">
        <SidebarAdmin />
      </div>
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-2xl">
          All Users
        </h1>
        <HeadInPages />
      </div>
      {isError && (
        <div className="p-3 m-3 text-xs mt-[-2ch] border border-red-700 bg-red-700">
          <p className="text-white text-center">{error.error}</p>
        </div>
      )}
      <Users users={users} />
      <div className="flex w-screen justify-center items-center gap-4 fixed bottom-0 text-sm text-pink-700">
        <button onClick={handlePreviousPage}>
          {" "}
          <span>&lt;&lt;&lt;</span> Previous
        </button>
        {count && (
          <p>
            {count} of {totalCount}
          </p>
        )}
        <button onClick={handleNextPage}>
          Next <span>&gt;&gt;&gt;</span>
        </button>
      </div>
    </div>
  );
}

export default GetAllUsersComp;

// const router = useRouter();
// const { token } = getUserIdAndToken(ctx);

// const [users, setUsers] = useState([]);
// const [error, setError] = useState(null);
// const [loading, setLoading] = useState(false);
// const [redirecting, setRedirecting] = useState(false);

// useEffect(() => {
// const fetch = async () => {
//   try {
//     const response = await getAllUsers();
//     //   headers: {
//     //     Authorization: `Bearer ${token}`,
//     //   },
//     // });
//     if (response.data.code === "000") {
//       setUsers(response.data.data);
//     } else {
//       setUsers([]);
//     }
//   } catch (error) {
//     if (
//       error.response.data.error === "Invalid token." ||
//       error.response.data.error === "Token has been revoked or expired." ||
//       error.response.data.error === "Forbidden!"
//     ) {
//       sessionStorage.clear();
//       aExpireSessionAndRedirect(ctx, router);
//       setRedirecting(true);
//     } else if (error.response.data.error) {
//       setError(error.response.data.error);
//     }
//   } finally {
//     setLoading(false);
//   }
// };
//   fetch();
// }, [router, ctx, token]);
