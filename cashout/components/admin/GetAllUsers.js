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
// import Pagination from "../../components/utils/Pagination";

const BASE_URL = `${API_BASE_URL}`;

function GetAllUsersComp(ctx) {
  const router = useRouter();
  const { token } = getUserIdAndToken(ctx);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(10);

  useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.code === "000") {
        setUsers(response.data.data);
      } else {
        setUsers([]);
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
        setError(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };
    fetch();
  }, [router, ctx, token]);

  if (redirecting) {
    return (
      <div className="text-sm bg-red-600">
        Session expired redirecting to login...
      </div>
    );
  }

  //  // Get current posts
  //  const indexOfLastPost = currentPage * postsPerPage;
  //  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  //  // Change page
  //  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative">
      {loading && <Loader />}
      <div className="fixed top-0 z-40">
        <SidebarAdmin />
      </div>
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-2xl">
          All Users
        </h1>
        <HeadInPages />
      </div>
      {error && (
        <div className="p-3 m-3 text-xs mt-[-2ch] border border-red-700 bg-red-700">
          <p className="text-white text-center">{error}</p>
        </div>
      )}
      <Users users={users} />
      {/* <currentPost currentPosts={currentPosts} />
        <Pagination 
        postsPerPage={postsPerPage}
        totalPosts={users.length}
        paginate={paginate}
        currentPage={currentPage}
        /> */}
    </div>
  );
}

export default GetAllUsersComp;
