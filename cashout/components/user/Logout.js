import React from "react";
import { useRouter } from "next/router";
import AuthService from "@/services/auth.Service";
import LogoutIcon from "../heroIcons/LogoutIcon";
import { ThemeProvider } from "next-themes";
import Theme from "../homePage/Theme";

export default function Logout() {
  const router = useRouter();

  const logoutHandler = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("buttonClicked");
    }
    await AuthService.logout();
    router.push("/login");
  };

  return (
    <div className="flex">
      <div className="mr-0 border-slate-200 bg-white hover:bg-blue-500">
      <ThemeProvider>
        <Theme/>
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
}
