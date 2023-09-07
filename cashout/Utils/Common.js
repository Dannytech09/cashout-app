export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user ? user.id : null;
    return userId;
  }
};

export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

export const setUserSession = (user) => {
  sessionStorage.setItem("user", user);
};

export const removeUserSession = () => {
  sessionStorage.removeItem("user");
};
