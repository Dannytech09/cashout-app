import React from 'react'

export default function HomeHeader () {
  return (
    <div className='flex fixed top-0 w-full h-10 bg-cyan-900'>
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
    </div>
  )
}
