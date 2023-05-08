import { useState } from 'react';
import Link from 'next/link';
import MenuBar from '@/components/heroIcons/MenuBar';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white py-6 px-6">
      <div className="flex items-center flex-shrink-0 text-slate-800 mr-6">
        <span className="font-semibold text-xl tracking-tight">My Website</span>
      </div>
      <div className="block lg:hidden">
        <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-slate-800 border-slate-800 hover:text-slate-900 hover:border-slate-900">
          <MenuBar className="w-6 h-6" />
        </button>
      </div>
      <div className={`w-full ${isMenuOpen ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto`}>
        <ul className="list-reset lg:flex justify-center flex-1 text-center bg-zinc-200 border border-zinc-200">
          <li className="mr-3">
            <Link href="/">
              <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">Home</h4>
            </Link>
          </li>
          <li className="mr-3">
            <Link href="/contact">
              <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">Contact</h4>
            </Link>
          </li>
          <li className="mr-3">
            <Link href="/login">
              <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">Login</h4>
            </Link>
          </li>
          <li className="mr-3">
            <Link href="/signup">
              <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">Sign Up</h4>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;




// import { useState } from 'react';
// import Link from 'next/link';
// import MenuBar from '@/components/heroIcons/MenuBar';
// import classNames from "classnames";
// import styles from "@/styles/NavBar.module.css"

// function Navigation() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const wrapperClasses = classNames(
//     " z-30 h-screen text-slate-800 mt-10 px-4 pt-3 relative top-30",
//     {
//       ["hidden"]: !isMenuOpen,
//       ["bg-gray-200"]: isMenuOpen,
//       // ["w-15 bg-secondary"]: toggle,
//       // ["fixed top-0 left-0 w-64 h-full bg-gray-900 text-gray-100 overflow-y-auto transition-transform transform -translate-x-full"]: toggle,
//     }
//   );

//   return (
//     <nav className="flex flex-row-reverse navbar">
//       <div className={styles.navbarBtnContainer}>
//       <button className={styles.navbarToggleBtn} onClick={toggleMenu}>
//         <span className={styles.navbarToggleIcon}><MenuBar/></span>
//       </button>
//       </div>
//       <div
//       className={wrapperClasses}
//     //   style={{ transition: "width 300ms cubic-beizer(0.2, 0, 0, 1) 9s" }}
//       >
//       <ul className={styles.navbarMenu}>
//         <li className={styles.navbarMenuItem}>
//           <Link href="/">
//             <h2 className={styles.navbarMenuLink}>Home</h2>
//           </Link>
//         </li>
//         <li className={styles.navbarMenuItem}>
//           <Link href="/contact">
//             <h2 className={styles.navbarMenuLink}>Contact</h2>
//           </Link>
//         </li>
//         <li className={styles.navbarMenuItem}>
//           <Link href="/login">
//             <h2 className={styles.navbarMenuLink}>Login</h2>
//           </Link>
//         </li>
//         <li className={styles.navbarMenuItem}>
//           <Link href="/signup">
//             <h2 className={styles.navbarMenuLink}>Sign Up</h2>
//           </Link>
//         </li>
//       </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navigation;
