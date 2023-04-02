import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { getToken } from "../../Utils/Common";
import axios from "axios";
import withAuth from "../../hocs/withAuth";


function CreateUser() {
  const API_URL = "http://localhost:4000/api/v1/users/";

  const {
    register,
    handleSubmit,
    formState: { errors }, // formState
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      username: "",
      email: "",
      password: "",
    },
    // mode: "onchange"
  });

  const router = useRouter();

  const submitHandler = ({
    firstName,
    lastName,
    phoneNumber,
    username,
    email,
    password,
  }) => {
    {
      axios
        .post(
          API_URL,
          {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            username: username,
            email: email,
            password: password,
          },
          {
            headers: {
              Authorization: "Bearer " + getToken(),
              "Content-Type": "application/json; charset=utf8",
            },
          }
        )
        .then(() => {
          alert("User Created Successfully!");
          router.push("/admin/dashboard");
        })
        .catch((error) => {
          if (
            error.response?.status === 401 ||
            error.response?.status === 500
          ) {
            alert("Not Authorised to access this resource or Server Error");
          } else if (error.response?.status === 400) {
            alert("User Already Exist");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="mt-4 select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-full"
    >
      <h1 className="sm:text-3xl mb-2 font-sans text-2xl">Create New User</h1>

      <input
        {...register("firstName", {
          required: "Please enter firstName !",
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
        placeholder="Please Enter Your First Name"
        aria-invalid={errors.firstName ? "true" : "false"}
      />
      {errors.firstName && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          {errors.firstName?.message}
        </p>
      )}

      <input
        {...register("lastName", {
          required: "Please enter lastName !",
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
        placeholder="Please Enter Your Last Name"
        aria-invalid={errors.lastName ? "true" : "false"}
      />
      {errors.lastName && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          {errors.lastName?.message}
        </p>
      )}

      <input
        {...register("phoneNumber", {
          required: " Please enter phoneNumber !",
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
        placeholder="Please Enter PhoneNumber"
        aria-invalid={errors.phoneNumber ? "true" : "false"}
      />
      {errors.phoneNumber && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          {errors.phoneNumber?.message}
        </p>
      )}

      <input
        {...register("username", {
          required: "  Please enter username !",
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
        placeholder="Please Enter Username"
        aria-invalid={errors.username ? "true" : "false"}
      />
      {errors.username && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          {errors.username?.message}
        </p>
      )}

      <input
        {...register("email", {
          required: " Please enter email !",
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid Email!",
          },
          maxLength: {
            value: 50,
            message: "Email can not be more than 50 characters",
          },
        })}
        autoComplete="on"
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter a Valid Email Address"
        // aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          {errors.email?.message}
        </p>
      )}

      <input
        {...register("password", {
          required: "Please enter password !",
          minLength: {
            value: 6,
            message: "Minimum of 6 digits",
          },
        })}
        autoComplete="on"
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Password"
        aria-invalid={errors.password ? "true" : "false"}
      />
      {errors.password && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          {errors.password?.message}
        </p>
      )}

      <button
        type="submit"
        className="relative hover:after:translate-x-full after:absolute after:top-0 after:right-full after:bg-blue-600 after:z-10 after:w-full after:h-full overflow-hidden after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-sky-500 border-solid uppercase py-2 px-2 text-cyan-900"
      >
        <h2 className="relative z-30"> Create User</h2>
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
  );
}

export default withAuth(CreateUser)