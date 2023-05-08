import axios from "axios";
import React, { useState } from "react";
import { setUserSession } from "./Utils/Common";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter()

  const submitHandler = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please enter email and password !");
      return;
    }
    setError(null);
    setLoading(true);
    axios
      .post("https://cashout-app.herokuapp.com/api/v1/auth/login", {
        email: email,
        password: password,
      })
      .then(response => {
        console.log("response >>> ", response);
        setLoading(false);
        if (response.data.token) {
          setUserSession(response.data.token, response.data.user);
          window.location("/Dashboard")
          // router.push("/Dashboard")
          // setUserSession("user", JSON.stringify(response.data))
        } else {
          window.location.href("/login")
        }
        // setUserSession(response.data.token)
      })
      .catch(error => {
        if (
          error.response?.status === 401 ||
          error.response?.status === 400
        ) {
          setError(error.response.status);
          console.log(error);
        } else {
          setError("Something went wrong!");
          // window.location.reload();
        }
        // if(error.response?.data.error ===  "Invalid credentials") {
        //   console.log(error)
        //   setError(`Invalid Credentials - Error ${error.response.status}`);
        //   //  window.location.reload();

        // } else {
        //       setError("Something went wrong!")
        //       window.location.reload();
        //   }
      });
  };

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-screen">
      <h1 className="sm:text-3xl mb-2 text-white font-sans text-3xl">LOGIN</h1>
      {error && (
        <div className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">
          {error}
        </div>
      )}
      <input
        type="text"
        value={email}
        onChange={getEmail}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Email Address"
      />
      <input
        value={password}
        onChange={getPassword}
        type="text"
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Password"
      />
      <button
        value={loading ? "Loading..." : "Login"}
        disabled={loading}
        onClick={submitHandler}
        className="relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900
      duration-300 w-full max-w-[39ch] border border-white border-solid uppercase py-2 px-2 text-white"
      >
        <h2 className="relative z-30"> Submit</h2>
      </button>
      <div className="flex mt-1 gap-4 text-center justify-center select-none">
        <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
          <Link href="/forgotPassword">Forgot Password ?</Link>
        </div>
        <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
          <Link href="/register">Don't have an Account ?</Link>
        </div>
      </div>
    </div>
  );
}



 const submitHandler = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/auth/login", {
        email,
        password,
      });
  
      if (response?.data?.token) {
        // set the token cookie with a max age of 30 days
        setCookie(null, "token", response.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
  
        // set the user cookie with a max age of 30 days
        setCookie(null, "user", JSON.stringify(response.data.user), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
  
        // redirect to dashboard
        router.push("/user/dashboard");
      } else {
        // invalid credentials
        return {
          props: {
            message: "Invalid email or password",
          },
        };
      }
    } catch (error) {
      // server error
      console.error(error);
      return {
        props: {
          message: "Something went wrong, please try again later",
        },
      };
    }
  };





   const submitHandler = ({ email, password }) => {
    if (typeof window !== "undefined") {

      if (email && password) {
        AuthService.signInAdmin(email, password)
          .then((response) => {
            if (response?.data.token && response?.data?.user.isAdmin === true) {
            router.push("/admin/dashboard");
            } else {
              router.push("/admin/login");
            }
          })
          .catch((error) => {
            if (
              error.response?.status === 401 ||
              error.response?.status === 500
            ) {
              alert("Invalid Email and Password !");
              router.reload("/login");
            } else {
              alert("Something went Wrong! If problem persist please check your network..");
            }
          });
      }
    }
  };
      
  //       // set the token cookie with a max age of 30 days
  //       setCookie(null, "token", response.data.token, {
  //         maxAge: 30 * 24 * 60 * 60,
  //         path: "/",
  //       });

  //       // set the user cookie with a max age of 30 days
  //       setCookie(null, "user", JSON.stringify(response.data.user), {
  //         maxAge: 30 * 24 * 60 * 60,
  //         path: "/",
  //       });

  //       // redirect to dashboard
  //       router.push("/admin/dashboard");
  //     } else {
  //       // invalid credentials
  //       return {
  //         props: {
  //           message: "Invalid email or password",
  //         },
  //       };
  //     }
  //   } catch (error) {
  //     // server error
  //     console.error(error);
  //     return {
  //       props: {
  //         message: "Something went wrong, please try again later",
  //       },
  //     };
  //   }
  // };

  
//   const submitHandler = async ({ email, password }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/v1/auth/login",
//         {
//           email,
//           password,
//         }
//       );
//       if (response?.data?.token) {
//         AuthService.signIn(email, password);
//         // set the token cookie with a max age of 30 days
//         setCookie(null, "token", response.data.token, {
//           maxAge: 30 * 24 * 60 * 60,
//           path: "/",
//         });
//         // set the user cookie with a max age of 30 days
//         setCookie(null, "user", JSON.stringify(response.data.user), {
//           maxAge: 30 * 24 * 60 * 60,
//           path: "/",
//         });
//         setLoading(true)
//         // redirect to dashboard
//         router.push("/user/dashboard");
//         setLoading(false)
//       } else {
//         // invalid credentials
//         return {
//           props: {
//             message: "Invalid email or password",
//           },
//         };
//       }
//     } catch (error) {
//       // server error
//       console.error(error);
//       return {
//         props: {
//           message: "Something went wrong, please try again later",
//         },
//       };
//     }
//     setLoading(false)
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   } else if (message) {
//     return <p>{message}</p>;
//   } else {
//     return <p>Content loaded successfully.</p>;
//   }
// }