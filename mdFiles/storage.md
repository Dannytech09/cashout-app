import axios from "axios"
// import { response } from "express";
import React, {useState } from "react";
import { redirect } from "react-router-dom";
import { setUserSession } from "./Utils/Common";

export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const submitHandler = () => {
        // if (!email || !password) {
        //     setError("Please enter email and password")
        //     return
        // }
        setError(null)
        setLoading(true)
        axios.post("https://cashout-app.herokuapp.com/api/v1/auth/login", {
            email: email,
            password: password
        }).then(response => {
            // console.log("response >>> ", response)
            setLoading(false)
            setUserSession(response.data.token, response.data.user)
           return redirect("/Dashboard")
        }).catch(error => {
            if(error.response.data.status === 401 || error.response.data.status === 400){
                setError(error.response.data.message);
            }
            else {
                setError("Something went wromg!")
            }
        })
       
    }

    const getEmail = (e) => {
        setEmail(e.target.value)
    }

    const getPassword = (e) => {
        setPassword(e.target.value)
    }

  return (

    <div className="select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-screen">
      <h1 className="sm:text-3xl mb-2 text-white font-sans text-3xl">LOGIN</h1>
      {error && <div className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">{error}</div>}
      <input 
        type="text"  value={email} onChange={getEmail}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Email Address"
      />
      <input value={password} onChange={getPassword}
        type="text"
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Password"
      />
      <button 
      value={loading ? "Loading..." : "Login" }
      disabled={loading}
      onClick={submitHandler} className="relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900
      duration-300 w-full max-w-[39ch] border border-white border-solid uppercase py-2 px-2 text-white">
        <h2 className="relative z-30"> Submit</h2>
      </button>
    </div>
  );
}


export default function Register() {
    const [formDetails, setFormDetails] = useState(formInitialState);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    if (!email || !password || !confirmPassword) {
      setError("Please enter email and password correctly");
      return;
    }
    if (!firstName || !lastName || !phoneNumber || !username) {
        setError("Please enter the appropriate field");
        return;
      }
    setError(null);
    setLoading(true);
    axios
      .post("https://cashout-app.herokuapp.com/api/v1/auth/register", {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        console.log("response >>> ", response);
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        window.location = "/Dashboard";
      })
      .catch((error) => {
        if (
          error.response.data.status === 401 ||
          error.response.data.status === 400
        ) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong!");
        }
      });
  };

  
const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  username: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formDetails, setFormDetails] = useState(initialState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  // const [val, setVal] = useState(true);

  const changeHandler = (e) => {
    // setFormDetails(e.target.value);
    const { name, value} = e.target;
    setFormDetails({...formDetails, [name]: value})
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    // if (!email || !password) {
    //   setError("Please enter email and password correctly");
    //   return;
    // }
    // if (!firstName || !lastName || !phoneNumber || !username) {
    //   setError("Please enter the appropriate field");
    //   return;
    // }
    setError(null);
    setLoading(true);
    await axios.post(
      "https://cashout-app.herokuapp.com/api/v1/auth/register",
      formDetails
    );
    setFormDetails('');
    setSuccessMessage("Hey dude! welcome onboard!")
    window.location = "/Dashboard"
  };



<!-- POST Request -->
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {createUser} from "../../services/user.service";
import { getToken, setUserSession } from "../../Utils/Common";
import axios from "axios";
import authHeader from "../../services/auth-Header";

// const instance = axios.create({
//   withCredentials: true,
  
// });
// // instance.get('/todos')

export default function CreateUser() {

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
      // confirmPassword: "",
    },
    // mode: "onchange"
  });

  const url = "https://cashout-app.onrender.com/api/v1/users";

  const submitHandler = ({
    firstName,
    lastName,
    phoneNumber,
    username,
    email,
    password,
  }) => {
    if (firstName || lastName || phoneNumber || username || email || password) {
      const payload = {
        method: "POST",
        body: ({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          username: username,
          email: email,
          password: password,
        }),
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      };
      axios
        .post(url, payload)
        .then((response) => {
          // setCreateUser(response)
          console.log(response.data);
          console.log(response);
        })
        .catch((error) => {
          if (
            error.response?.status === 401 ||
            error.response?.status === 500
          ) {
            alert("Not Authorised to access this resource");
            console.log(error);
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
      {/* {successMessage && (
        <div className="text-center w-full max-w-[39ch] border border-solid border-green-400 text-green-900 py-2">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">
          {error}
        </div>
      )} */}

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

      {/* <input
        {...register("password", {
          required: "Please confirm password !",
          minLength: {
            value: 6,
            message: "Minimum of 6 digits",
          },
        })}
        autoComplete="off"
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please confirm password"
        aria-invalid={errors.password ? "true" : "false"}
      />
      {errors.password && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          {errors.password?.message}
        </p>
      )} */}

      <button
        // disabled={!formState.isValid}
        className="relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900
      duration-300 w-full max-w-[39ch] border border-white border-solid uppercase py-2 px-2 text-white"
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
