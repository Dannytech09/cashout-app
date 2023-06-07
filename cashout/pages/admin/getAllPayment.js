import UserService from "../../services/user.service";
import React, { useState, useEffect } from "react";
import AllPayment from "../../components/admin/GetAllPayment";
import withAuth from "../../hocs/withAuth";
import HeadInPages from "@/components/admin/HeadInPages";
// import Pagination from "../../components/utils/Pagination";

function GetAllPayment() {
  const [payment, setPayment] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(10);

  const fetch = async () => {
    await UserService.getPayment()
      .then((res) => {
        setPayment(res.data.data);
        console.log(res.data.data)
      })
      .catch((error) => {
        console.log(error)
        if (
          error.response.data.status === 401 ||
          error.response.data.status === 400
        ) {
          alert("No Payment found");
        }
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  //  // Get current posts
  //  const indexOfLastPost = currentPage * postsPerPage;
  //  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  //  // Change page
  //  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative">
      <div className="p-2 fixed top-0 w-full border border-solid border-slate-500 bg-slate-900">
        <h1 className="mt-2 text-center text-slate-200 font-extrabold text-2xl">
          All Payment
        </h1>
        <HeadInPages />
      </div>
      <AllPayment payment={payment} />
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

export default withAuth(GetAllPayment)