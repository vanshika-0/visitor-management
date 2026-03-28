import React from 'react'
import Navbar from './Navbar'
import { useState,useEffect } from 'react';

const Otpverification = () => {
  //variable hai jisme eamail ko val store h jo user n dali hai

  const [Timer, setTimer] = useState(null);


  //event hai
  const [input, setinput] = useState(false);
  const [inputVal, setinputVal] = useState();
  const [trigger, settrigger] = useState(0);
 

//curr timer show hra h pg reload pr bhi 
useEffect(() => {
  const savedEndTime = Number(localStorage.getItem("endTime"));
  let endTime;

  // agar localStorage me valid endTime hai aur future me hai
  if (savedEndTime && savedEndTime > Date.now()) {
    endTime = savedEndTime;
  } else {
    endTime = Date.now() + 10000; // default 10 sec timer
    localStorage.setItem("endTime", endTime);
  }

  const updateTimer = () => {
    const remainingTime = Math.floor((endTime - Date.now()) / 1000);
    setTimer(remainingTime > 0 ? remainingTime : 0);
  };

  updateTimer(); // immediately update timer to avoid flicker

  const interval = setInterval(updateTimer, 1000);

  return () => clearInterval(interval);
}, [trigger]);


  
  function handleVerify(){
    //  verify p click krne pe timer strt or email send hgi gmail pe 
    const newEndTime = Date.now() + 10000; // 60 sec
    localStorage.setItem("endTime", newEndTime);
    setTimer(10);
    settrigger(prev=>prev+1);  
  }

  return (
    <div>
        <Navbar/>
        <div className="container place-items-center mt-[8%] w-[30%]" style={{marginLeft:"37%", border:"2px solid black" ,padding:"20px",borderRadius:"10px"}} >
          <h1 className='text-[180%] font-bold '>OTP VERIFICATION </h1>
          {/* agr js k kisi bhi chij ko use krna h jsx mai toh use {} */}
          <div className='gap-7 mt-[1%] mb-[1%]'>
          <p className='text-[105%] pt-[1.9%] mb-[3%]'>Please enter the OTP(One-Time-Password)sent to your registered email/phone number to complete your verification.</p>

          
          {/* <button onClick={handleVerify} className='text-[105%] bg-[var(--bg-color)] w-20 p-2 rounded hover:bg-[var(--hover-color)] text-[var(--primary-color)] mb-3'>Verify</button> */}
          <div className='flex'>


          <input type="tel" onChange={(e)=>{
            setinputVal(e.target.value)
            setinput(true)
          }} value={inputVal}
          //phn p send hga toh name ki jrurt nhi h bec local storage p store nbhi hra--------
          placeholder='Enter OTP sent on your email'
          className='w-[60%]  ml-[18%] mb-3 p-2 border rounded'/>
         {input && inputVal.length>3?<button className='bg-[var(--bg-color)] w-20 ml-5 rounded hover:bg-[var(--hover-color)] text-[var(--primary-color)] mb-3'>Verify</button>:null}
          </div>
          </div>


          {Timer>0 && <p>Resend OTP in {Timer} seconds</p>}
          {Timer==0 &&(
            <>
            
            <button className='bg-[var(--bg-color)] w-70 ml-16  p-2 rounded hover:bg-[var(--hover-color)] text-[var(--primary-color)] mb-3' onClick={handleVerify}>Didn't got the code?Resend OTP</button></>
          )}
          
        </div>
    </div>
  )
}

export default Otpverification
