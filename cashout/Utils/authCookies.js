import {
  setCookie as nookiesSetCookie,
  destroyCookie as nookiesDestroyCookie,
  parseCookies,
} from "nookies";

export const setCookie = (context, name, value, options = {}) => {
  const updatedOptions = { path: "/user", ...options };

  nookiesSetCookie(context, name, value, updatedOptions);
};

export const removeCookie = (name) => {
  nookiesDestroyCookie(null, name, { path: "/" });
};

export const getCookie = (context, name) => {
  const cookies = parseCookies(context);
  return cookies[name] || null;
};
