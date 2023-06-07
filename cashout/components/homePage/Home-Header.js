import { useState, useEffect } from "react";
import Link from "next/link";
import MenuBar from "@/components/heroIcons/MenuBar";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className="bg-[#2E6268] py-6 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center flex-shrink-0 text-slate-800 mr-6">
            <span className="font-semibold text-xl tracking-tight">
              Cashout Plug
            </span>
          </div>
          <div
            className={`flex items-center space-x-4 ${
              isSmallScreen ? "hidden" : "block"
            }`}
          >
            <Link href="/">
              <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">
                Home
              </h4>
            </Link>
            <Link href="/contact">
              <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">
                Contact
              </h4>
            </Link>
            <Link href="/login">
              <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">
                Login
              </h4>
            </Link>
            <Link href="/register">
              <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">
                Sign Up
              </h4>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 border rounded text-slate-800 border-slate-800 hover:text-slate-900 hover:border-slate-900"
            >
              <MenuBar className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && isSmallScreen && (
        <div className="bg-emerald-200 border-b border-zinc-200 lg:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link href="/">
                <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">
                  Home
                </h4>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">
                  Contact
                </h4>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <h4
                  className="inline-block px-4 py-2 rounded font
          bold text-slate-800 hover:text-slate-900"
                >
                  Login
                </h4>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">
                  Sign Up
                </h4>
              </Link>
            </li>
          </ul>
        </div>
      )}
      {isMenuOpen && isSmallScreen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleMenuClose}
        ></div>
      )}

<style jsx>{`
        .menu-container {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .menu-container.open {
          max-height: 200px; /* Adjust the height as needed */
        }

        .menu-items {
          /* Your menu items styles */
        }

        .menu-item {
          /* Your menu item styles */
        }

        .toggle-button {
          /* Your toggle button styles */
        }
      `}</style>
    </div>
  );
}

{
  /* <div className='flex fixed top-0 w-full h-10 bg-cyan-900'>
        <h1 className='text-white ml-5 mt-1 font-bold text-slate-10'>CASHOUT APP</h1>
        <div className='ml-20'>
            <ul  className='flex justify-end gap-5 mt-3 text-white font-mono font-extrabold'>
                <li><a href="#">Home</a> </li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Services</a></li> 
                <li><a href="#">FAQS</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Login</a></li>
                <li><a href="#">Register</a></li>
            </ul>
        </div>
    </div> */
}
