import nookies from "nookies";

// get
export function getUserIdAndToken(ctx) {
  const cookies = nookies.get(ctx);
  // console.log("c", JSON.stringify(cookies, null, 2))
  const userCookie = cookies.u ? cookies.u : null; // Get the cookie value as a string

  let userId = null;
  if (userCookie) {
    try {
      // Attempt to parse the JSON string
      const parsedUserCookie = JSON.parse(userCookie);
      userId = parsedUserCookie.id;
    } catch (error) {
      // Handle the JSON parsing error here
    throw new error("Error occured")
    }
  }
  const token = cookies.token;

  return { userId, token };
}

// del
export function expireSessionAndRedirect(ctx, router) {
  const pathsToDelete = ["/", "/user"];
  for (const path of pathsToDelete) {
    nookies.destroy(ctx, "token", { path });
  }
  const toDelete = ["/", "/user"];
  for (const path of toDelete) {
    nookies.destroy(ctx, "u", { path });
  }
  // alert("Session Expired.. Take me to auth page ! ");
  router.push("/login");
}

// set
export function setCookieAndRedirect(ctx, key, value) {
  nookies.set(ctx, key, value, {
    maxAge: 60 * 60 * 1000,
    path: '/',  // navigate to dash using client side nav,  // else the rest na story or use synchronous for the login
  });
}


// import {
//   setCookie as nookiesSetCookie,
//   destroyCookie as nookiesDestroyCookie,
//   parseCookies,
// } from "nookies";

// export const setCookie = (context, name, value, options = {}) => {
//   const updatedOptions = { path: "/user", ...options };

//   nookiesSetCookie(context, name, value, updatedOptions);
// };

// export const removeCookie = (name) => {
//   nookiesDestroyCookie(null, name, { path: "/" });
// };

// export const getCookie = (context, name) => {
//   const cookies = parseCookies(context);
//   return cookies[name] || null;
// };

