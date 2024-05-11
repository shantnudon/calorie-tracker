'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";

const NavM = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll',()=> window.scrollY >= 100? setSticky(true): setSticky(false))
  }, [])

  return (
    <nav className={`${sticky? "nav-dark": " "} flex justify-evenly font-bold text-[#009959]`}>
    {/* <img src="../../assets/hero.png" alt="logo" width={"200px"} /> */}
    <span className="logo flex-bas" style={{fontSize: '50px', textShadow:""}}>Calorie Traker</span>
    
      <div className='flex gap-5 my-5 '>
      <FaUserCircle className='text-5xl' />
      </div>
</nav>
  );
};

export default NavM;
