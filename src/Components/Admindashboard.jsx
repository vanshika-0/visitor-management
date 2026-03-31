import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import React from 'react'
import { MdOutlinePendingActions } from "react-icons/md";
import Adminnavbar from './Adminnavbar';
import { RiGroupFill } from "react-icons/ri";


const Admindashboard = () => {

  const [visitors, setVisitors] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalVisits = visitors.length;
  const pendingRequests = visitors.filter(v => v.status === "pending").length;
  const [verifyId, setVerifyId] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/visitor/all")
      .then(res => res.json())
      .then(data => setVisitors(data))
      .catch(err => console.log(err));
  }, []);


  const filteredVisitors = visitors.filter(v => {
    if (filter === "all") return true;
    return (v.status || "pending") === filter;
  });

  const searchedVisitors = filteredVisitors.filter(v =>
    (v.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const sortedVisitors = [...searchedVisitors].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sort === "latest" ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(sortedVisitors.length / itemsPerPage);

  const paginatedVisitors = sortedVisitors.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5001/api/visitor/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      // update state instantly (live update)
      setVisitors(prev =>
        prev.map(v =>
          v._id === id ? { ...v, status } : v
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const verifyPass = async () => {
    if (!verifyId) return;

    try {
      const res = await fetch(`http://localhost:5001/api/visitor/verify/${verifyId}`);
      const data = await res.json();

      if (data.status === "valid") {
        if (data.visitor.status === "approved") {
          setVerifyResult({ type: "valid", visitor: data.visitor });
        } else {
          setVerifyResult({ type: "not-approved", visitor: data.visitor });
        }
      } else {
        setVerifyResult({ type: "invalid" });
      }
    } catch (err) {
      console.log(err);
      setVerifyResult({ type: "error" });
    }
  };

  if (!localStorage.getItem("isAdmin")) {
    return <Navigate to="/AdminLogin" replace />;
  }

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
                    <p>{pendingRequests}</p>
                    </div>
              </div>
        


                 <div className='bg-[var(--bg-color)] p-[3%] w-[25%] rounded flex'>
                   < RiGroupFill className='text-[400%] mr-2'/>
                    <div className='mt-1 ml-2'>
                    <h1 className='flex text-[120%]'>Total Visits</h1>
                    <p>{totalVisits}</p>
                    </div>
              </div>

      </div>

       <div className="flex justify-between items-center mt-[3%] mx-[5%]">
  <h1 className='text-[150%] font-bold'>VISITORS</h1>

  <div className="flex items-center gap-3">
    <input
      type="text"
      placeholder="Search by name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 w-[220px] rounded text-sm"
    />

    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border p-2 rounded text-sm bg-white"
    >
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="border p-2 rounded text-sm bg-white"
    >
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
    </select>
    <input
      type="text"
      placeholder="Enter Pass ID"
      value={verifyId}
      onChange={(e) => setVerifyId(e.target.value)}
      className="border p-2 w-[180px] rounded text-sm"
    />

    <button
      onClick={verifyPass}
      className="px-3 py-2 bg-blue-200 text-blue-800 rounded text-sm"
    >
      Verify
    </button>
  </div>
</div>
{verifyResult && (
  <div className={`mx-[5%] mt-2 p-3 rounded ${
    verifyResult.type === "valid"
      ? "bg-green-100 text-green-800"
      : verifyResult.type === "not-approved"
      ? "bg-yellow-100 text-yellow-800"
      : verifyResult.type === "invalid"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-600"
  }`}>
    {verifyResult.type === "valid" && (
      <div>
        <p><strong>VALID ENTRY</strong></p>
        <p>Name: {verifyResult.visitor.name}</p>
        <p>Status: {verifyResult.visitor.status}</p>
        <p>Email: {verifyResult.visitor.email}</p>
        <p>Phone: {verifyResult.visitor.phone}</p>
      </div>
    )}

    {verifyResult.type === "not-approved" && (
      <div>
        <p><strong>NOT APPROVED</strong></p>
        <p>Name: {verifyResult.visitor.name}</p>
        <p>Status: {verifyResult.visitor.status}</p>
      </div>
    )}

    {verifyResult.type === "invalid" && <p>INVALID PASS</p>}
  </div>
)}
      <div className="mx-[5%] my-[2%] w-[90%] border-2 border-black p-5 overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Pass ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">To Meet</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedVisitors.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No results found
                </td>
              </tr>
            )}
            {paginatedVisitors.map((v, i) => (
              <tr key={i} className="text-center">
                <td className="p-2 border">{v.passId}</td>
                <td className="p-2 border">{v.name || "-"}</td>
                <td className="p-2 border">{v.email || "-"}</td>
                <td className="p-2 border">{v.phone || "-"}</td>
                <td className="p-2 border">{v.toMeet || "-"}</td>
                <td className="p-2 border">{v.date || "-"}</td>
                <td className="p-2 border">
                  <span className={
                    (v.status === "approved" ? "bg-green-200 text-green-800" :
                     v.status === "rejected" ? "bg-red-200 text-red-800" :
                     "bg-yellow-200 text-yellow-800") + " px-2 py-1 rounded"
                  }>
                    {v.status || "pending"}
                  </span>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => {
                      setVerifyId(v.passId);
                      setTimeout(() => verifyPass(), 100);
                    }}
                    className="px-2 py-1 mr-2 rounded bg-blue-200 text-blue-800"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => updateStatus(v._id, "approved")}
                    disabled={v.status === "approved"}
                    className={`px-2 py-1 mr-2 rounded ${
                      v.status === "approved"
                        ? "bg-green-100 text-green-400 cursor-not-allowed"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(v._id, "rejected")}
                    disabled={v.status === "rejected"}
                    className={`px-2 py-1 rounded ${
                      v.status === "rejected"
                        ? "bg-red-100 text-red-400 cursor-not-allowed"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-2 py-1 text-sm">
            Page {page} of {totalPages || 1}
          </span>

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Admindashboard
