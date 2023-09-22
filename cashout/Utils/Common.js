// export const getUser = () => {
//   if (typeof window !== "undefined") {
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     const userId = user ? user.id : null;
//     return userId;
//   }
// };

export const getUser = () => {
  if (typeof window !== "undefined") {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      // console.log(user)
      return user;
    } catch (error) {
      // throw new Error(`An error occurred, please send this error to our tech support ${error}`)
      return null;
    }
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
