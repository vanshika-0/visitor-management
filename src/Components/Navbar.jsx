import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>

      
        <nav className='flex   gap-225 text-[var(--primary-color)] bg-[var(--bg-color)] p-2'>
        <p className='pl-[6%]'>VISITRA</p>
        <ul className='flex gap-20'>
          
          {/* //icons css */}
        
        <NavLink to="/Feature"><li className='flex'>Features </li></NavLink>
        <NavLink to="/Works"><li className='flex'>How it works </li></NavLink>
        
      </ul>
      </nav>

      



     
    </div>
  )
}

export default Navbar