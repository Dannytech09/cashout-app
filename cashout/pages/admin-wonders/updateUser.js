import { useState } from "react";
import User from "../../components/admin/User";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getToken } from "../../Utils/authCookies";
import axios from "axios";
import withAuth from "../../hocs/withAuth";
import API_BASE_URL from "@/apiConfig";
import SidebarAdmin from "@/components/admin/Sidebar-Admin";

function UpdateUser() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }, // formState
  } = useForm({
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      username: "",
      email: "",
      balance: "",
      blocked: "",
      accountType: "",
    },
    // mode: "onchange"
  });

  const url = `${API_BASE_URL}/api/v1/users`;

  const submitHandler = async ({
    id,
    firstName,
    lastName,
    phoneNumber,
    username,
  }) => {
    setLoading(true);
    try {
      if (typeof window !== undefined) {
        const response = await axios.put(
          `${url}/${id}`,
          {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            username: username,
          },
          {
            headers: {
              Authorization: "Bearer " + getToken(),
              "Content-Type": "application/json; charset=utf8",
            },
          }
        );
        // console.log(response);
        if (response.data.data === null) {
          alert("Invalid User ID");
        } else {
          alert("User Updated Successfully See Details Below!");
        }
        setUser(response.data.data);
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 500) {
        alert("Not Authorised to access this resource or Server Error");
      } else if (error.response?.status === 400) {
        alert("User already exist or Duplicate field entered");
      } else {
        alert("Network issue or Network issue or No User found");
        // console.log(error);
      }
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="fixed top-0">
        <SidebarAdmin />
      </div>
      {loading ? <p>Loading...</p> : null}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mt-4 select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-full"
      >
        <h1 className="sm:text-3xl mb-2 font-sans text-2xl">
          Update User&apos;s Details
        </h1>
        <input
          {...register("id", {
            required: "Please enter user's ID!",
            pattern: {
              value: /^[a-z0-9]+$/i,
              message: "Alphanumeric only",
            },
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="Please enter user's ID !"
          aria-invalid={errors.id ? "true" : "false"}
        />
        {errors.id && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.id?.message}
          </p>
        )}

        <input
          {...register("firstName", {
            required: "Please enter user's firstName !",
            minLength: {
              value: 3,
              message: "First Name can not be less than 3 letters",
            },
            maxLength: {
              value: 15,
              message: "First Name can not be greater than 15 letters",
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Only letters are allowed / No spacing !",
            },
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="User's First Name"
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.firstName?.message}
          </p>
        )}

        <input
          {...register("lastName", {
            required: "Please enter user's lastName !",
            minLength: {
              value: 3,
              message: "Last Name can not be less than 3 letters",
            },
            maxLength: {
              value: 15,
              message: "Last Name can not be greater than 15 letters",
            },
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Only letters are allowed / No spacing !",
            },
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="User's Last Name"
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.lastName?.message}
          </p>
        )}

        <input
          {...register("phoneNumber", {
            required: "Please enter user's phoneNumber !",
            minLength: {
              value: 11,
              message: "Phone number can not be less than 11 digits",
            },
            maxLength: {
              value: 11,
              message: "Phone number can not be greater than 11 digits",
            },
            pattern: {
              value: /^[0-9\b]+$/,
              message: "Input valid phone number !",
            },
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="User's PhoneNumber"
          aria-invalid={errors.phoneNumber ? "true" : "false"}
        />
        {errors.phoneNumber && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.phoneNumber?.message}
          </p>
        )}

        <input
          {...register("username", {
            required: "  Please enter user's username !",
            minLength: {
              value: 3,
              message: "username can not be less than 3 digits",
            },
            maxLength: {
              value: 10,
              message: "username can not be greater than 10 digits",
            },
          })}
          autoComplete="on"
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          placeholder="User's Username"
          aria-invalid={errors.username ? "true" : "false"}
        />
        {errors.username && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.username?.message}
          </p>
        )}
        <button
          type="submit"
          className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
        >
          <h2 className="relative z-30"> Update User</h2>
        </button>

        <div className="flex mt-1 gap-4 text-center justify-center select-none">
          <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
            <Link href="/admin-wonders/getAllUsers">Check All Users</Link>
          </div>
          <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
            <Link href="/admin-wonders/dashboard">Navigate to Admin Board</Link>
          </div>
        </div>
      </form>

      <br />
      <hr />
      {user ? (
        true
      ) : (
        <div className="text-center m-10 text-red-500">No User Updated Yet</div>
      )}

      <User user={user} />
    </div>
  );
}

export default withAuth(UpdateUser);
