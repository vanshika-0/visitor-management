import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>

      
        <nav className='flex   gap-200 text-[var(--primary-color)] bg-[var(--bg-color)] p-2'>
        <p className='pl-[6%]'>VISITERA</p>
        <ul className='flex gap-20'>
          
          {/* //icons css */}
        <NavLink to="/Home"><li className='flex'>Home</li></NavLink>
        <li className='flex'>Features </li>
        <li className='flex'>Contact </li>
        <li className='flex'>Register </li>
      </ul>
      </nav>

      



     
    </div>
  )
}

export default Navbar
