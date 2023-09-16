import React from "react";
import { useRouter } from "next/router";
import LogoutIcon from "@/components/heroIcons/LogoutIcon";
import { ThemeProvider } from "next-themes";
import Theme from "@/components/homePage/Theme";
import { LogoutHandler } from "@/pages/api/user/logout";
import { aExpireSessionAndRedirect, } from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";

export const Alogout = ({ ctx }) => {
  const router = useRouter();

  const aLogoutHandler = async () => {
    try {
      const response = await LogoutHandler();
      if (response.error) {
        const message = response.error;
        alert(message);
      } else if (response.success === true) {
        localStorage.removeItem("buttonClicked");
        removeUserSession();
        aExpireSessionAndRedirect(ctx, router);
      }
    } catch (error) {
      if (error) {
        throw new Error(`An error occured ${error}`);
      }
    }
  };

  return (
    <div className="flex mr-0">
      <div className=" border-slate-200 bg-white hover:bg-blue-500">
        <ThemeProvider>
          <Theme />
        </ThemeProvider>
      </div>
      <div
        onClick={aLogoutHandler}
        className="mr-2 w-[4ch] text-xs bg-red-300 hover:cursor hover:text-blue-500 text-green-300"
      >
        <LogoutIcon />
      </div>
    </div>
  );
};
