import React from 'react'
import { MdOutlinePendingActions } from "react-icons/md";
import Adminnavbar from './Adminnavbar';
import { RiGroupFill } from "react-icons/ri";


const Admindashboard = () => {


    

  return (
    <div>


      <Adminnavbar/>


        <h1 className='text-[200%] my-2 ml-[5%] font-bold'>Dashboard</h1>
        {/* //cards */}

      <div className="card flex gap-20 mx-[5%] ">

        {/* //jo bhi user plan krega visit uski request idhr cnt hgi */}
              <div className='bg-[var(--bg-color)] p-[3%] w-[25%] rounded flex'>
                   < MdOutlinePendingActions className='text-[400%] mr-2'/>
                    <div className='mt-0.5'>
                    <h1 className='flex text-[120%] '>Pending Request</h1>
                    <p>Number</p>
                    </div>
              </div>
        


                 <div className='bg-[var(--bg-color)] p-[3%] w-[25%] rounded flex'>
                   < RiGroupFill className='text-[400%] mr-2'/>
                    <div className='mt-1 ml-2'>
                    <h1 className='flex text-[120%]'>Total No of Visits</h1>
                    <p>Number</p>
                    </div>
              </div>

      </div>

       <h1 className='text-[150%] font-bold mt-[3%] ml-[5%]'> VISITORS </h1>
      <div className="place-items-center mx-[5%] my-[2%]  w-[90%] border-2 border-black p-[20%]">
        
      </div>
    </div>
  )
}

export default Admindashboard
