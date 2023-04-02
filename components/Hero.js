import React from "react";
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="select-none flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover">
      <img className="opacity-50 h-screen w-screen bg-fixed bg-center bg-cover" src="/hero.jpg" alt="" srcSet="" />
      {/* Overlay */}
      <div className="absolute top-0 left-0 bottom-0 bg-black/70 z-[2]" />
      <div className="items-center text-center justify-center absolute top-1px left-0 bottom p-5 text-white z-[2]">
        <h2 className="text-4xl text-white  font-bold">Welcome to Cashout App</h2>
        <p className="py-5 px-5 text-xl text-blue-300 text--900 font-extrabold">
          A technological platform that offers solutions to daily needs using the most
          efficient means and product availability at discounted prices without compromising quality.
        </p>
        <div className="flex mt-20 gap-4 text-center justify-center select-none">
        <div className="border  bg-cyan-700">
       <Link href="http://localhost:3000/login"><button className="py-3 px-3 font-sans bg-hover:red font-bold text-2xl text-white-700">Login</button></Link> 
        </div>
        <div className="border bg-cyan-700">
        <Link href="http://localhost:3000/register"><button className="py-3 px-3 font-sans bg-hover:red font-bold text-2xl text-white-700">Register</button></Link> 
        </div>
        </div>      
        
      </div>
    </div>
    
  );
};

export default Hero;
