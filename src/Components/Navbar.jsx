import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <div>
        <nav className='flex   gap-200 text-[var(--primary-color)] bg-[var(--bg-color)] p-2'>
        <p className='pl-[6%]'>VISITERA</p>
        <ul className='flex gap-20'>
          
          {/* //icons css */}
        <li className='flex'>Home <IoIosArrowDown className='pl-[6%] pt-[8%] h-5.5'/></li>
        <li className='flex'>Features <IoIosArrowDown className='pl-[6%] pt-[8%] h-5.5'/></li>
        <li className='flex'>Contact <IoIosArrowDown className='pl-[6%] pt-[8%] h-5.5'/></li>
        <li className='flex'>Register <IoIosArrowDown className='pl-[6%] pt-[8%] h-5.5'/></li>
      </ul>
      </nav>

      



     
    </div>
  )
}

export default Navbar
