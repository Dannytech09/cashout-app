import { useState } from 'react';
import Link from 'next/link';
import MenuBar from '@/components/heroIcons/MenuBar';

export default function NavBar () {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
    <nav className="flex sm:z-[50] items-center justify-between fixed w-full bg-[#2E6268] py-6 px-6">
      <div className="flex items-center flex-shrink-0 text-slate-800 mr-6">
        <span className="font-semibold text-xl tracking-tight">Cashout Plug</span>
      </div>
      <div className="block lg:hidden">
        <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-slate-800 border-slate-800 hover:text-slate-900 hover:border-slate-900">
          <MenuBar className="w-6 h-6" />
        </button>
      </div>
      <div className={`w-full ${isMenuOpen ? "block" : "hidden"} sm:absolute sm:top-20 sm:right-0 sm:left-0 lg:relative lg:top-0 lg:w-auto lg:flex lg:items-center`}>
        <ul className="list-reset sm:z-50 lg:flex justify-center flex-1 text-center p-3 bg-emerald-200 border border-zinc-200">
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
            <Link href="/register">
              <h4 className="inline-block px-4 py-2 rounded font-bold text-slate-800 hover:text-slate-900">Sign Up</h4>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

{/* <div className='flex fixed top-0 w-full h-10 bg-cyan-900'>
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
    </div> */}
