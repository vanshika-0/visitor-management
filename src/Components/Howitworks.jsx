import React from 'react'
import Navbar from './Navbar';

const Howitworks = () => {
    const features = [
  {
    title: "1. Visitor Registers the Visit",
    desc: "Visitor fills out a simple form with basic details like name, contact, and purpose of visit."
  },
  {
    title: "2. Admin Approves Request",
    desc: "Admin reviews the visitor request and approves or rejects it for secure access."
  },
  {
    title: "3. Instant Pass Generation",
    desc: "A digital visitor pass with unique ID/QR is generated after approval."
  },
  {
    title: "4. Secure Entry Check-In",
    desc: "Visitor shows the pass at entry for quick and verified check-in."
  },
  {
    title: "5. Exit & Data Stored",
    desc: "Visitor checks out and all visit details are securely stored for tracking."
  }
];

  return (
        <>
    <Navbar/>
      
      <div className='my-10'>
      <h1 className='text-[200%] font-bold text-center'>Smart Visitor Management</h1>
      <p className='text-center'>Manage every visitor step from registration to exit with a secure and seamless system.</p>
      </div>


       <div className="p-6 mx-[10%] mt-[4%] grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((item, index) => (
        <div
          key={index}
          className="p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 bg-white"
        >
          <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
          <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default Howitworks