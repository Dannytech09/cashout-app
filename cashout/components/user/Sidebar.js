import React, { useMemo, useState, useRef } from "react";
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
import withAuth from "../../hocs/withAuth";
import UserPlusIcon from "../heroIcons/UserPlusIcon";
import LockPassIcon from "../heroIcons/LockPassIcon";

// Using array for nav items
const menuItems = [
  { id: 1, label: "Dashboard", icon: HomeIcon, link: "/user/dashboard" },
  { id: 2, label: "Buy Data", icon: DataIcon, link: "/user/buyData" },
  { id: 3, label: "Buy Airtime", icon: AirtimeIcon, link: "/user/buyAirtime" },
  {
    id: 4,
    label: "Fund Wallet",
    icon: FundWalletIcon,
    link: "/user/fundWallet",
  },
  {
    id: 5,
    label: "Cable Sub",
    icon: FundWalletIcon,
    link: "/user/tvSub",
  },
  {
    id: 6,
    label: "Elect Bill",
    icon: FundWalletIcon,
    link: "/user/electBill",
  },
  {
    id: 7,
    label: "Airtime to Cash",
    icon: Airtime2Cash,
    link: "/user/airtime-cash",
  },
  {
    id: 8,
    label: "Transaction History",
    icon: Airtime2Cash,
    link: "/user/history",
  },
  {
    id: 9,
    label: "Profile",
    icon: ProfileIcon,
    link: "/user/profile",
  },
  {
    id: 10,
    label: "Update Profile",
    icon: UserPlusIcon,
    link: "/user/updateDetails",
  },
  {
    id: 11,
    label: "Change Password",
    icon: LockPassIcon,
    link: "/user/updatePassword",
  },
];

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  const wrapperClasses = classNames(
    "z-30 h-screen text-slate-800 mt-10 px-4 pt-3 flex absolute flex-col",
    {
      ["hidden"]: !toggle,
      ["bg-gray-200"]: toggle,
      // ["w-15 bg-secondary"]: toggle,
      // ["fixed top-0 left-0 w-64 h-full bg-gray-900 text-gray-100 overflow-y-auto transition-transform transform -translate-x-full"]: toggle,
    }
  );

const logoutHandler = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("buttonClicked");
  }
  await AuthService.logout();
  router.push("/login");
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
      "flex items-center py-4 px-3 h-full cursor-pointer hover:bg-blue-200 rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: menu.id,
      }
    );
  };

  // useEffect(() => {
  //   // Add event listener to the document object
  //   document.addEventListener('mousedown', handleClickOutside);

  //   // Remove event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // function handleClickOutside(event) {
  //   if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
  //     onClickOutside && onClickOutside();
  //     // Clicked outside the side navigation bar, close it
  //     // Implement your close side navigation bar logic here
  //   }
  // }

  return (
    <>
      <div
        className="flex absolute z-50 border-red-2 p-2 h-10 w-10 bg-red-500"
        onClick={handleSideBarToggle}
      >
        <div>
          <CollapseBtn />
        </div>
      </div>
      <div
        className={wrapperClasses}
        style={{ transition: "width 300ms cubic-beizer(0.2, 0, 0, 1) 9s" }}
      >
        <div>
          <div className="flex flex-col">
            {/* Logo Container */}
            <div className="flex item-center justify-between relative">
              <div className="flex items-center pl-1 gap-4 w-auto h-auto ">
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
                        <div
                          className="fill-blue-900 stroke-blue-600"
                          style={{ width: "2.5rem" }}
                        >
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
              "flex items-center hover:bg-blue-200 py-4 px-3 cursor-pointer bg-gray-200  rounded w-full overflow-hidden whitespace-nowrap"
            }
          >
            
            {toggle && (
              <h5
                className={classNames(
                  "flex gap-5 text-md font-medium text-text-light fill-blue-900 stroke-blue-600"
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
      </div>
    </>
  );
};

export default withAuth(Sidebar);
