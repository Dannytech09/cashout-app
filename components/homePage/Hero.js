import Link from 'next/link';
import HomeHeader from "@/components/homePage/Home-Header"
import Image from 'next/image';

const Hero = () => {
  return (
    <div>
      <div className='sm:z-80'>
      <HomeHeader/>
      </div>
    <div className="select-none flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover">
      <div>
      <Image className="opacity-80 lg:mt-[-20ch] xl:mt-[-10ch] md:mt-[20ch] sm:h-[50ch] sm:mt-[-10ch] w-screen bg-fixed bg-center bg-cover" src="/hero.jpg" alt="" srcSet="" />
      {/* Overlay */}
      <div className="absolute w-full h-[100ch] top-20 left-0 bottom-0 bg-black/70 sm:z-[2]" />
      </div>
      <div className="items-center text-center justify-center absolute top-1px left-0 bottom p-5 text-white z-[2]">
        <h2 className="text-4xl sm:text-xl text-white font-bold">Welcome to Cashout Plug</h2>
        <p className="py-5 px-5 text-xl sm:text-lg text-blue-300 text--900 font-extrabold">
          A technological platform that offers solutions to daily needs using the most
          efficient means and product availability at discounted prices without compromising quality.
        </p>
        <div className="flex mt-20 gap-4 text-center justify-center select-none">
        <div className="border  bg-cyan-700">
       <Link href="/login"><button className="py-3 px-3 font-sans bg-hover:red font-bold text-2xl text-white-700">Login</button></Link> 
        </div>
        <div className="border bg-cyan-700">
        <Link href="/register"><button className="py-3 px-3 font-sans bg-hover:red font-bold text-2xl text-white-700">Register</button></Link> 
        </div>
        </div>      
        
      </div>
    </div>
    </div>
    
  );
};

export default Hero;