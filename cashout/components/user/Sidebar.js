import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import CollapseBtn from "../heroIcons/CollapseBtn";
import HomeIcon from "../heroIcons/HomeIcon";
import DataIcon from "../heroIcons/DataIcon";
import AirtimeIcon from "../heroIcons/AirtimeIcon";
import FundWalletIcon from "../heroIcons/FundWalletIcon";
import Airtime2Cash from "../heroIcons/Airtime2Cash";
import LogoutIcon from "../heroIcons/LogoutIcon";
import ProfileIcon from "../heroIcons/ProfileIcon";
import { useRouter } from "next/router";
import Link from "next/link";
import UserPlusIcon from "../heroIcons/UserPlusIcon";
import LockPassIcon from "../heroIcons/LockPassIcon";
import { LogoutHandler } from "@/pages/api/user/logout";
import { expireSessionAndRedirect } from "@/Utils/authCookies";
import { removeUserSession } from "@/Utils/Common";
import { Logout } from "./Logout";
import Avatar from "../heroIcons/Avatar";
import { useSelector } from "react-redux";
import EduPinIcon from "../heroIcons/Edu";
import LightElectIcon from "../heroIcons/LightElectIcon";
import TvCabIcon from "../heroIcons/TvCabIcon";

// Using array for nav items
const menuItems = [
  { id: 1, label: "Dashboard", icon: HomeIcon, link: "/user/dashboard" },
  { id: 2, label: "Buy Data", icon: DataIcon, link: "/user/buyDataS" },
  // { id: 3, label: "Buy Data 2", icon: DataIcon, link: "/user/buyData" },
  { id: 4, label: "Buy Airtime", icon: AirtimeIcon, link: "/user/buyAirtime" },
  {
    id: 5,
    label: "Fund Wallet",
    icon: FundWalletIcon,
    link: "/user/fundWallet",
  },
  {
    id: 89,
    label: "Trnx History",
    icon: Airtime2Cash,
    link: "/user/history",
  },
  {
    id: 6,
    label: "Cable Sub",
    icon: TvCabIcon,
    link: "/user/tvSub",
  },
  {
    id: 7,
    label: "Elect Bill",
    icon: LightElectIcon,
    link: "/user/electBill",
  },
  {
    id: 71,
    label: "Edu Pin",
    icon: EduPinIcon,
    link: "/user/buyEduPin",
  },
  {
    id: 711,
    label: "Referral",
    icon: UserPlusIcon,
    subLinks: [
      {
        id: 721,
        label: "Referral Info",
        icon: UserPlusIcon,
        subLink: "/user/referral",
      },
      {
        id: 722,
        label: "Withdraw Bonus",
        icon: Airtime2Cash,
        subLink: "/user/withdrawalBonus",
      },
    ],
  },
  {
    id: 8,
    label: "Airtime to Cash",
    icon: Airtime2Cash,
    link: "/user/airtime-cash",
  },
  {
    id: 9,
    label: "Query Trnx",
    icon: Airtime2Cash,
    link: "/user/queryTranx",
  },
  {
    id: 10,
    label: "Profile",
    icon: ProfileIcon,
    link: "/user/profile",
  },
  {
    id: 11,
    label: "Update Profile",
    icon: UserPlusIcon,
    link: "/user/updateDetails",
  },
  {
    id: 12,
    label: "Change Password",
    icon: LockPassIcon,
    link: "/user/updatePassword",
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.user);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start loading when the route change starts
    const handleStart = () => setLoading(true);

    // Stop loading when the route change completes
    const handleComplete = () => setLoading(false);

    // Attach event listeners for route change start and complete
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Cleanup the event listeners when the component unmounts
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleToggle = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  const wrapperClasses = classNames(
    "z-30 h-[100ch] text-slate-200 px-4 pt-3 flex flex-col", // absolute
    {
      ["hidden"]: !toggle,
      ["bg-gray-900"]: toggle,
      // ["w-15 bg-secondary"]: toggle,
      // ["fixed top-0 left-0 w-64 h-full bg-gray-900 text-gray-100 overflow-y-auto transition-transform transform -translate-x-full"]: toggle,
    }
  );

  const logoutHandler = async (ctx) => {
    try {
      const response = await LogoutHandler();
      if (response.error) {
        const message = response.error;
        alert(message);
      } else if (response.success === true) {
        sessionStorage.removeItem("buttonClicked");
        removeUserSession();
        expireSessionAndRedirect(ctx, router);
      }
    } catch (error) {
      // console.log(error);
      throw new Error(`An error occured ${error}`);
    }
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
      "flex items-center bg-black py-4 px-3 h-full cursor-pointer hover:bg-blue-200 rounded w-full overflow-hidden whitespace-nowrap",
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
    <div className="">
      {loading && (
        <div className="fixed inset-0 z-50 flex justify-center bg-opacity-50 bg-gray-900">
          {/* Overlay to prevent clicks */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Loading indicator at the top center */}
          <div className="relative top-2 text-white">
            Please wait...
          </div>
        </div>
      )}

      <div className="flex fixed w-full z-40 justify-between border-red-800  h-10 custom-dark-gray">
        <div className="ml-2 mt-2" onClick={handleSideBarToggle}>
          <CollapseBtn />
        </div>
        <div className="">
          <Logout />
        </div>
      </div>
      <div
        className={`${wrapperClasses}`}
        style={{ transition: "width 300ms cubic-beizer(0.2, 0, 0, 1) 9s" }}
      >
        <div>
          <div className="flex flex-col mt-5">
            {/* Avatar Container */}
            <div className="flex items-center justify-between relative ml-1">
              <div className="flex items-center pl-1 gap-1 w-auto h-auto">
                <div className="w-[5ch]">
                  <Avatar />
                </div>
                <div className="flex flex-col place-items-center">
                  <div className="max-w-[12ch] px-2 py-1 overflow-hidden">
                    {user && <div>{user.firstName}</div>}
                    {user && (
                      <div>
                        {"\u20A6"} {user.bal}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SideBar Content container */}
            <div className="flex flex-col w-full items-start mt-2">
              {menuItems.map(({ icon: Icon, ...menu }) => {
                const classes = getNavItemClasses(menu);
                return (
                  <div key={menu.id} className={classes}>
                    {menu.subLinks ? ( // does menu item has subLinks
                      <div>
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleToggle(menu.id); // Toggle the submenu
                          }}
                        >
                          <div
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
                            <div className="space-x-10">
                              <span
                                className={classNames(
                                  "text-md font-medium text-text-light"
                                )}
                              >
                                {menu.label}
                              </span>
                              {expandedId ? (
                                <span>↓</span>
                              ) : (
                                <span className="text-green-500">⋙</span>
                              )}
                            </div>
                          </div>
                        </Link>
                        {menu.id === expandedId && menu.subLinks && (
                          // Render subLinks when the submenu is expanded
                          <div className=" text-green-500 ml-5 p-5 mb-[-2ch]">
                            <ul className="space-y-2">
                              {menu.subLinks.map(
                                ({ icon: SubIcon, ...subLink }) => (
                                  <li
                                    key={subLink.id}
                                    className="hover:bg-blue-300"
                                  >
                                    <Link
                                      href={subLink.subLink}
                                      className="flex"
                                    >
                                      <span
                                        className="fill-blue-900 stroke-blue-600"
                                        style={{ width: "2.5rem" }}
                                      >
                                        <SubIcon />
                                      </span>
                                      <p>{subLink.label}</p>
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      // If no subLinks, render a clickable link to navigate to another page
                      <Link href={menu.link}>
                        <div>
                          <div
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
                          </div>
                        </div>
                      </Link>
                    )}
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
              "flex items-center hover:bg-blue-200 py-4 px-3 cursor-pointer bg-black  rounded w-full overflow-hidden whitespace-nowrap"
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
          <button
            className={
              "flex items-center hover:bg-blue-200 py-4 px-3 cursor-pointer bg-black  rounded w-full overflow-hidden whitespace-nowrap"
            }
          >
            {toggle && (
              <h5
                className={classNames(
                  "flex gap-5 mx-auto text-md font-medium text-text-light fill-blue-900 stroke-blue-600"
                )}
              >
                Version 2.0.1
              </h5>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// import React, { useState, useRef } from 'react';
// import CollapseBtn from '../heroIcons/CollapseBtn';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const mainContentRef = useRef(null);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleMainContentClick = () => {
//     setIsOpen(!isOpen); // Toggle the sidebar state
//   };

//   return (
//     <>
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-custom-deep-green ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } transition-transform duration-300 ease-in-out overflow-y-auto`}
//       >
//         <div className="p-4">
//           {/* Sidebar content */}
//           <h2 className="text-white text-lg font-semibold mb-4">Sidebar</h2>
//           <ul className="space-y-2">
//             <li>
//               <a href="/home" className="text-white hover:text-gray-300">
//                 Dashboard
//               </a>
//             </li>
//             <li>
//               <a href="/buyData" className="text-white hover:text-gray-300">
//                 Buy Data Bundle
//               </a>
//             </li>
//             {/* Add other sidebar links here */}
//           </ul>
//         </div>
//       </div>
//       <div
//         onClick={toggleSidebar}
//         className={`fixed top-0 left-0 h-full w-full bg-opacity-50 z-10 ${isOpen ? 'block' : 'hidden'}`}
//       ></div>
//       <button
//         className={`fixed top-0 left-0 h-10 w-10 bg-red-500 text-white z-20 transition-transform duration-300 ease-in-out ${
//           isOpen ? 'rotate-0' : 'rotate-180'
//         } bg-opacity-75`}
//         onClick={toggleSidebar}
//       >
//         <CollapseBtn />
//       </button>
//       <div
//         ref={mainContentRef}
//         onClick={handleMainContentClick}
//         className="relative z-0"
//       >
//         {/* Main layout content goes here
//         <p>
//           This is your main layout content. Click on empty areas to open and close the sidebar.
//         </p> */}
//       </div>
//     </>
//   );
// };

// export default Sidebar;
