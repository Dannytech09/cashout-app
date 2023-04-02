import { useState } from "react";
import User from "../../components/admin/User";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getToken } from "../../Utils/Common";
import axios from "axios";
import withAuth from "../../hocs/withAuth";

function Upgrade() {
  const [user, setUser] = useState();

  const API_URL = "http://localhost:4000/api/v1/users/";

  const {
    register,
    handleSubmit,
    formState: { errors }, // formState
  } = useForm({
    defaultValues: {
      id: "",
      accountType: "",
    },
    // mode: "onchange"
  });

  const submitHandler = ({ id, accountType }) => {
    {
      const url = `${API_URL}${id}`;
      axios
        .put(
          url,
          { accountType },
          {
            headers: {
              Authorization: "Bearer " + getToken(),
              "Content-Type": "application/json; charset=utf8",
            },
          }
        )
        .then((res) => {
          if (res.data.data === null) {
            alert("Invalid User ID");
          }
          alert("User Upgraded Successfully !");
          setUser(res.data.data);
        })
        .catch((error) => {
          if (
            error.response?.status === 401 ||
            error.response?.status === 500
          ) {
            alert("Not Authorised to access this resource or Server Error");
          } else if (error.response?.status === 400) {
            alert("Bad Request");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mt-4 select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-full"
      >
        <h1 className="sm:text-3xl mb-2 font-sans text-2xl">Upgrade User</h1>
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
        <select
          {...register("accountType", {
            required: "  Please select a value!",
          })}
          className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
          aria-invalid={errors.accountType ? "true" : "false"}
        >
          <option
          //   value={corporate}
          >
            corporate
          </option>
          <option
          //   value={partner}
          >
            partner
          </option>
        </select>
        {errors.accountType && (
          <p
            className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]"
            role="alert"
          >
            {errors.accountType?.message}
          </p>
        )}
        <button
          type="submit"
          className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
        >
          <h2 className="relative z-30"> Upgrade User</h2>
        </button>

        <div className="flex mt-1 gap-4 text-center justify-center select-none">
          <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
            <Link href="/admin/getAllUsers">Check All Users</Link>
          </div>
          <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
            <Link href="/admin/dashboard">Navigate to Admin Board</Link>
          </div>
        </div>
      </form>

      <br />
      <hr />
      {user ? (
        true
      ) : (
        <div className="text-center m-10 text-red-500">Awaiting Upgrade...</div>
      )}

      <User user={user} />
    </div>
  );
}

export default withAuth(Upgrade)