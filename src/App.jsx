
import './App.css'
import Landingpg from './Components/Landingpg'
import Otpverification from './Components/Otpverification'
import VisitorRegsiterationPg from './Components/VisitorRegsiterationPg'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

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
    }

  ])

  return (
    <>
    
     <RouterProvider router={router}/>
    </>
  )
}

export default App
