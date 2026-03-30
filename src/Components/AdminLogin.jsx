import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
//first pg p jake pg ka /... bnao fir navigate ka use krke us /   ko lgao jaha lgana ho
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  //use navigate ko store kr navigate mai
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const Adminemail = "admin22117@gmail.com";
    localStorage.setItem("Adminemail", Adminemail);

    const Adminpassword = "123";
    localStorage.setItem("Adminpassword", Adminpassword);

    if (password == Adminpassword && Email == Adminemail) {
      navigate("/Admindashboard");
    } else if (Email != Adminemail && password == Adminpassword) {
      alert("Your email is incorrect");
    } else if (Email == Adminemail && password != Adminpassword) {
      alert("Your password is incorrect");
    } else if (Email != Adminemail && password != Adminpassword) {
      alert("Your email and password is incorrect");
    }
  }

  return (
    <div>
      <Navbar />
       
      {/* horizonatlly and vertically center hjaega */} 
      <div className="place-items-center ">
        
        <form
          className="flex flex-col items-start w-[50%] my-20 shadow-lg px-[5%] py-[3%]"
          onSubmit={handleSubmit}
          action="submit"
        >
          <h1 className="mb-10 text-[180%] font-bold pt-5">Admin Login Page</h1>
          
          <label className="text-lg text-left mb-1" htmlFor="">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-[100%] mb-5 p-2 border rounded"
            required
          />

          <label className="text-lg text-left mb-1" htmlFor="">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="w-[100%] mb-5 p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="bg-[var(--bg-color)] w-40 p-2 rounded hover:bg-[var(--hover-color)] text-[var(--primary-color)] mb-3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
