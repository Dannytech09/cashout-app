import React, { useState } from "react";
import { useRouter } from "next/router";
import LogoutIcon from "../heroIcons/LogoutIcon";
import { ThemeProvider } from "next-themes";
import Theme from "../homePage/Theme";
import { LogoutHandler } from "@/pages/api/user/logout";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";

export const Logout = ({ ctx }) => {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const response = await LogoutHandler();
      if (response.error) {
        const message = response.error;
        alert(message);
      } else if (response.success === true) {
        localStorage.removeItem("buttonClicked");
        removeUserSession();
        expireSessionAndRedirect(ctx, router);
      }
    } catch (error) {
      if (error) {
        throw new Error("An error occured", error);
      }
    }
  };

  return (
    <div className="flex">
      <div className="mr-0 border-slate-200 bg-white hover:bg-blue-500">
        <ThemeProvider>
          <Theme />
        </ThemeProvider>
      </div>
      <div
        onClick={logoutHandler}
        className="fixed-right sm:mr-6 md:mr-6 z-50 border-red-2 p-2 mr h-10 w-10 bg-red-500"
      >
        <LogoutIcon />
      </div>
    </div>
  );
};
