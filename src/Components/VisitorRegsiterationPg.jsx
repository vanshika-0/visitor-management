import React, { useState } from 'react'
import Navbar from './Navbar';
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const VisitorRegsiterationPg = () => {
  const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Reason, setReason] = useState('');
    const [Visitdate, setVisitdate] = useState('');
    const [ToMeet, setMeet] = useState('');
    const [photo, setphoto] = useState('');
    const navigate = useNavigate();

  
    function handleName(e){

    setName(e.target.value);
    console.log(e.target.value);
    }
    function handleEmail(e){
      //phle values set kro
    setEmail(e.target.value);
    //ab email ko kisi bhi component m access kr skte hai,usko local storage pe store krdo
    localStorage.setItem("Email",e.target.value);
    }
    function handlePhone(e){

    setPhone(e.target.value);
    }
    function handleReason(e){

    setReason(e.target.value);
    }
    // function handleVisitdate(e){

    // setVisitdate(e.target.value);
    // }
    function handlemeet(e){

    setMeet(e.target.value);
    }
    function handlephoto(e){
      //url created of photo
      setphoto(URL.createObjectURL(e.target.files[0]));
    }
 
    function handleSubmit(e){
      e.preventDefault();
      console.log("glo");
      //timer val store krde
      const endTime=Date.now() + 10000;
      localStorage.setItem("endTime",endTime);

      ////////////////////////////////
      navigate("/otp");
    }
  return (
    
    <div>
      <Navbar/>
      <div className='place-items-center '>
      <form onSubmit={handleSubmit} className='flex flex-col items-start w-[50%] my-8' action="Submit">
        <h1 className='my-5 text-[180%] font-bold '>User Registeration Form</h1>
      <label className='text-lg text-left mb-1' htmlFor="">Name: </label>
      {/* agr icon ko input k andr dena h toh wrapper div */}
      <div className='relative w-full '>
        <IoMdPerson className='absolute text-sm mt-[1.5%] h-4 w-[35px]  ml-[95.3%]'/>
      
      <input type="text" 
      name='name'
      placeholder='Enter your Name'
      value={Name}
      onChange={handleName}
      className='w-[100%] mb-5 p-2 border rounded'
      required
       
      />
      </div>
      <label className='text-lg text-left mb-1' htmlFor="">Email:</label>
      <div className='relative w-full '>
      <MdEmail className='absolute text-sm mt-[1.5%] h-4 w-[35px]  ml-[95.3%]'/>
      <input type="email" 
      name='Email'
      placeholder='Enter your Email'
      value={Email}
      onChange={handleEmail}
      className='w-[100%]  mb-5 p-2 border rounded'
      required
      />
      </div>
      <label className='text-lg text-left mb-1' htmlFor="">Phone Number:</label>
      <div className='relative w-full '>
      <FaPhoneFlip  className='absolute text-sm mt-[1.5%] h-4 w-[35px]  ml-[95.3%]'/>
      <input type="tel" 
      name='Phone'
      placeholder='Enter your Phone'
      value={Phone}
      onChange={handlePhone}
      className='w-[100%] mb-5 p-2 border rounded'
      required
      />
      </div>
      <label className='text-lg text-left mb-1' htmlFor="">Reason:</label>
      <div className='relative w-full '>
      <IoIosArrowDown  className='absolute text-sm mt-[1.5%] h-4 w-[35px]  ml-[95.3%]'/>
      
      <select 
      name='reason'
      //for placeholder
      
      value={Reason}
      onChange={handleReason}
      className='w-[100%] mb-5 p-2 border rounded appearance-none'
      required
      >
      <option value="">Select Reason</option>
      <option value="meeting">Meeting</option>
      <option value="Interview">Interview</option>
      <option value="Delivery">Delivery</option>
      <option value="Maintenence">Maintenence</option>
      <option value="Visit">Visit</option>
      
      </select>
      </div>
    
      <label className='text-lg text-left mb-1' htmlFor="">Date:</label>
      <input type="date" 
      name='Date of Visit'
      placeholder='Date of Visit'
      value={Visitdate}
      onChange={(e) => setVisitdate(e.target.value)}
      className='w-[100%] mb-5 p-2 border rounded'
      required
      />
      <label className='text-lg text-left mb-1' htmlFor="">To Meet:</label>
      <div className='relative w-full '>
        <FaUserGroup className='absolute text-sm mt-[1.5%] h-4 w-[35px]  ml-[95.3%]'/>
      <input type="text" 
      name='ToMeet'
      placeholder='To Meet'
      value={ToMeet}
      onChange={handlemeet}
      className='w-[100%] mb-6 p-2 border rounded'
      required
      />
      </div>
      
      {photo &&(
        <img src={photo} alt="photo" className="w-[8%] h-32 object-cover rounded mb-3 mr-[44%]" />
      )}
      <label className='text-lg text-left mb-1' htmlFor="">Profile Photo:</label>
      <div className='relative w-full '>
        <IoMdPhotos className='absolute text-sm mt-[1.5%] h-4 w-[35px]  ml-[95.3%]'/>
      <input type="file" 
      accept='image/*'
      name='photo'
      
      //value nhi hta file mai
      onChange={handlephoto}
      className='w-[100%] mb-6 p-2 border rounded'
      required
      />
      </div>

      <button className='bg-[var(--bg-color)] w-40 p-2 rounded hover:bg-[var(--hover-color)] text-[var(--primary-color)] mb-3'>Submit</button>
      </form>
    </div>
    </div>
  )
}

export default VisitorRegsiterationPg
