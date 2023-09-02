export const getUser = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem("user"));
  }
};

export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

export const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", user);
};

export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
