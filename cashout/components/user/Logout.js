import React from "react";
import { useRouter } from "next/router";
import AuthService from "@/services/auth.Service";
import LogoutIcon from "../heroIcons/LogoutIcon";
import Theme from "../homePage/Theme";
import { ThemeProvider } from "next-themes";

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
      {/* <div> */}
      <ThemeProvider defaultTheme="light" attribute="class">
        <Theme />
      </ThemeProvider>
      <div
        onClick={logoutHandler}
        className="fixed-right sm:mr-7 md:mr-7 z-50 border-red-2 p-2 mr-6 h-10 w-10 bg-red-500"
      >
        <LogoutIcon />
      </div>
    </div>
  );
}
