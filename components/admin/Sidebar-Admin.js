import React, { useMemo, useState } from "react";
import classNames from "classnames";
import CollapseBtn from "../heroIcons/CollapseBtn";
import Logo from "../heroIcons/Logo";
import HomeIcon from "../heroIcons/HomeIcon";
import DataIcon from "../heroIcons/DataIcon";
import AirtimeIcon from "../heroIcons/AirtimeIcon";
import FundWalletIcon from "../heroIcons/FundWalletIcon";
import Airtime2Cash from "../heroIcons/Airtime2Cash";
import LogoutIcon from "../heroIcons/LogoutIcon";
import ProfileIcon from "../heroIcons/ProfileIcon";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthService from "../../services/auth.Service";

// Using array for nav items
const menuItems = [
  { id: 1, label: "Admin Board", icon: HomeIcon, link: "/admin/dashboard" },
  { id: 2, label: "Get All Users", icon: DataIcon, link: "/admin/getAllUsers" },
  {
    id: 3,
    label: "LookUp User",
    icon: ProfileIcon,
    link: "/admin/getSingleUser",
  },
  {
    id: 4,
    label: "Update User",
    icon: ProfileIcon,
    link: "/admin/updateUser",
  },
  { id: 5, label: "Block User", icon: AirtimeIcon, link: "/admin/blockUser" },
  {
    id: 6,
    label: "Create User",
    icon: FundWalletIcon,
    link: "/admin/createUser",
  },
  {
    id: 7,
    label: "Delete User",
    icon: Airtime2Cash,
    link: "/admin/delUser",
  },
  {
    id: 8,
    label: "Admin's Info",
    icon: ProfileIcon,
    link: "/admin/profile",
  },
  {
    id: 9,
    label: "Upgrade User",
    icon: FundWalletIcon,
    link: "/admin/upgrade",
  },
  {
    id: 10,
    label: "Data component",
    icon: FundWalletIcon,
    link: "/admin/dataComponent",
  },
];

const SidebarAdmin = () => {
  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  const wrapperClasses = classNames(
    "h-screen flex absolute mt-10 px-4 pt-3 flex flex-col z-30",
    {
      ["hidden"]: !toggle,
      [" bg-gray-200"]: toggle,
    }
  );

  const logoutHandler = () => {
    AuthService.logout();
    router.push("/admin/login");
  };

  const handleSideBarToggle = () => {
    setToggle(!toggle);
  };

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center py-4 px-3 h-full cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: menu.id,
      }
    );
  };

  return (
    <>
      <div
        className="flex fixed z-50 p-2 h-10 w-10 bg-blue-900"
        onClick={handleSideBarToggle}
      >
        <CollapseBtn />
      </div>
      <div
        className={wrapperClasses}
        style={{ transition: "width 300ms cubic-beizer(0.2, 0, 0, 1) 9s" }}
      >
        <div className="flex flex-col ">
          {/* Logo Container */}
          <div className="flex item-center justify-between relative">
            <div className="flex items-center pl-1 gap-4 ">
              <Logo />
              <span
                className={classNames("mt-1 text-sm font-medium text-text", {
                  hidden: !toggle,
                })}
              >
                Logo
              </span>
            </div>
          </div>

          {/* SideBar Content container */}
          <div className="flex flex-col w-full items-start mt-2">
            {menuItems.map(({ icon: Icon, ...menu }) => {
              const classes = getNavItemClasses(menu);
              return (
                <div key={menu.id} className={classes}>
                  <Link href={menu.link}>
                    <h5
                      className={classNames(
                        "text-md flex font-medium text-text-light"
                      )}
                    >
                      <div style={{ width: "2.5rem" }}>
                        <Icon />
                      </div>
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                      {/* {toggle && <Icon />} */}
                    </h5>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        {/* `${getNavItemClasses({})} px-4 py-3` */}

        {/* Logout Container */}
        <button
          onClick={logoutHandler}
          className={
            "flex items-center py-2 px-3 cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap"
          }
        >
          {toggle && (
            <h5
              className={classNames(
                "flex gap-5 text-md font-medium text-text-light"
              )}
            >
              <span>
                <LogoutIcon />
              </span>
              Logout
            </h5>
          )}
        </button>
      </div>
    </>
  );
};

export default SidebarAdmin;
