
import './App.css'
import Landingpg from './Components/Landingpg'
import Otpverification from './Components/Otpverification'
import VisitorRegsiterationPg from './Components/VisitorRegsiterationPg'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AdminLogin from './Components/AdminLogin'
import Admindashboard from './Components/Admindashboard'
import Adminprofile from './Components/Adminprofile'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landingpg/>
    },
    {
      path: "/Visitor",
      element: <VisitorRegsiterationPg/>
    },
    {
      path: "/Home",
      element: <Landingpg/>
    },
    {
      path: "/otp",
      element: <Otpverification/>
    },
      {
      path: "/AdminLogin",
      element: <AdminLogin/>
    },
    {
      path: "/Admindashboard",
      element: <Admindashboard/>
    },
    {
      path: "/Adminprofile",
      element: <Adminprofile/>
    }

  ])

  return (
    <>
    
     <RouterProvider router={router}/>
    </>
  )
}

export default App
